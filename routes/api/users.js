const Router = require('koa-router');
const router = new Router();

const User = require('../../models/User');
const crypt = require('../../utils/crypt');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

/**
 * @route POST api/users/register
 * @desc To handle new users registering
 * @access Public
 */
router.post('/register', async ctx => {
	// console.log(ctx.request.body);
	const findResult = await User.find({ email: ctx.request.body.email });
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

/**
 * @route POST api/users/login
 * @desc To handle returning users logging in
 * @access Public
 */
router.post('/login', async ctx => {
	const findResult = await User.find({ email: ctx.request.body.email });
	const user = findResult[0];
	const password = ctx.request.body.password;	

	// 判斷用戶是否存在
	if (findResult.length == 0) {
		ctx.status = 404;
		ctx.body = { email: 'User not exist.'}
	} else {
		// 驗證密碼
		const result = await bcrypt.compareSync(password, user.password);

		if (result) {
			const payload = {
				id: user.id,
				username: user.username,
				avatar: user.avatar };
			const token = jwt.sign(payload, "secret", { expiresIn: 3600 });

			ctx.status = 200;
			ctx.body = { success: true, token: "Bearer " + token };
		} else {
			ctx.status = 400;
			ctx.body = { password: "Wrong Password!" }
		}
	}
});

/**
 * @route POST api/user/currentUser
 * @desc
 * @access Private
 */
// router.post("/current",  )

/**
 * @route POST api/users/forgotPassword
 * @desc User Forgot Password
 * @access Public
 */

module.exports = router.routes();