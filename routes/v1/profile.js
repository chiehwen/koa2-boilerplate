const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

const Profile = require('../../models/Profile');

/**
 * @route POST v1/getProfile
 * @desc
 * @access Private
 */
router.post(
	'/getProfile',
	passport.authenticate('jwt', { session: false }),
	async ctx => {
        // console.log(ctx.state.user);
		const profile = await Profile.find({
            user: ctx.state.user.id
        }).populate('user', ['username', 'avatar']);
        // console.log(profile);

        if (profile.length > 0) {
            ctx.status = 200;
            ctx.body = profile;
        } else {
            ctx.status = 404;
            ctx.body = { noprofile: "該用戶還沒有相關的個人訊息" };
            return;
        }
	}
);

/**
 * @route POST v1/addProfile
 * @desc
 * @access Private
 */
router.post(
	'/addProfile',
	passport.authenticate('jwt', { session: false }),
	async ctx => {
        const profileFields = {};
        profileFields = ctx.state.user.id;

        if (typeof ctx.request.body.skills !== 'undefined') {
            profileFields.skills = ctx.request.body.skills.split(',');
        }

        const profile = await Profile.find({ user: ctx.state.user.id });
        if (profile.length > 0) {
            const profileUpdate = await Profile.findOneAndUpdate(
                { user: ctx.state.user.id },
                { $set: profileFields },
                { new : true }
            );
            ctx.body = profileUpdate;
        } else {
            await new Profile(profileFields).save().then(profile => {
                ctx.status = 200;
                ctx.body = profile;
            });
        }
	}
);

module.exports = router.routes();