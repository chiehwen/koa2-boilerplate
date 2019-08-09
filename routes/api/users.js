const Router = require('koa-router');
const router = new Router();

const User = require('../../models/User');
var crypt = require('../../utils/crypt');
const gravatar = require('gravatar');

/**
 * @route POST api/users/register
 * @desc User Register
 * @access Public
 */
router.post('/register', async ctx => {
	// console.log(ctx.request.body);
	const findResult = await User.find({email: ctx.request.body.email})
	// console.log(findResult);

	// 檢查 Email 是否已存在
	if (findResult.length > 0) {
		ctx.status = 500;
		ctx.body = { email: 'Email 已被註冊' }
	} else {
		const avatar = gravatar.url(ctx.request.body.email, {s: '200', r: 'pg', d: 'mm'});
		const newUser = new User({
			username: ctx.request.body.username,
			email: ctx.request.body.email,
			avatar,
			password: crypt.saltPassword(ctx.request.body.password)
		});

		// // Using crypto library to salt password
		// await crypto.pbkdf2(newUser.password, 'salt', 100000, 512, 'sha512', (err, derivedKey) => {
		// 	console.log(derivedKey.toString('hex'));
		// 	if (err) throw err;
		// 	newUser.password = derivedKey.toString('hex');
		// });

		// // Using bcrypt.js library to salt password
		// await bcrypt.genSalt(10, (err, salt) => {
		// 	bcrypt.hash(newUser.password, salt, (err, hash) => {
		// 		// Store hash in your password DB.
		// 		console.log(hash);
		// 		if (err) throw err;
		// 		newUser.password = hash;
		// 	});
		// });

		// console.log(newUser);
		// 儲存到 MongoDB
		await newUser
		.save()
		.then( user => {
			ctx.body = user;
		})
		.catch( err => {
			console.log(err);
		});

		// 返回 JSON
		ctx.body = newUser;
	}
});

module.exports = router.routes();