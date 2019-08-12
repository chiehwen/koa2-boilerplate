const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const mongoose = require('mongoose');

const app = new koa();
const RoutesIndex = require('./routes/index');
const CONFIG = require('./config');
console.log(CONFIG)

app.use(bodyParser());

// const CONFIG = {
// 	key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
// 	/** (number || 'session') maxAge in ms (default is 1 days) */
// 	/** 'session' will result in a cookie that expires when session/browser is closed */
// 	/** Warning: If a session cookie is stolen, this cookie will never expire */
// 	maxAge: 86400000,
// 	autoCommit: true, /** (boolean) automatically commit headers (default true) */
// 	overwrite: true, /** (boolean) can overwrite or not (default true) */
// 	httpOnly: true, /** (boolean) httpOnly or not (default true) */
// 	signed: true, /** (boolean) signed or not (default true) */
// 	rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
// 	renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };

// app.use(session(CONFIG, app));

// add the CSRF middleware
app.use(new CSRF({
	invalidTokenMessage: 'Invalid CSRF token',
	invalidTokenStatusCode: 403,
	excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
	disableQuery: false
}));

const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

const logger = require('koa-logger')


mongoose.connect(CONFIG.MONGODB.HOST, { useCreateIndex: true, useNewUrlParser: true })
	.then(() => {
		console.log("MongoDB Connected...");
	})
	.catch(err => {
		console.log(err);
	})

// 設定路由
app.use(RoutesIndex.routes())
app.use(RoutesIndex.allowedMethods());

app.listen(CONFIG.SERVER.PORT, (err) => {
	if (err)
		throw err;
	console.log('Server is listening on port', CONFIG.SERVER.PORT);
})
