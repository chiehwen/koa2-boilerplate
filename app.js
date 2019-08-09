const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new koa();
const router = new Router();
const RoutesIndex = require('./routes/api/index');

app.use(bodyParser());

const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 7001;
const MONGODB_HOST = process.env.MONGODB_HOST || "mongodb://127.0.0.1:27017/api-server"
mongoose.connect(MONGODB_HOST, { useCreateIndex: true, useNewUrlParser: true })
	.then(() => {
		console.log("MongoDB Connected...");
	})
	.catch(err => {
		console.log(err);
	})

// 設定路由
app.use(RoutesIndex.routes())
app.use(RoutesIndex.allowedMethods());

app.listen(port, (err) => {
	if (err)
		throw err;
	console.log('Server is listening on port', port);
})