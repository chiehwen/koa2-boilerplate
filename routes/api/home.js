const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx => {
	ctx.status = 200;
	ctx.body = { msg: 'API Server is running.'}
});

module.exports = router.routes();