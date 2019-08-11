const Router = require('koa-router');
const router = new Router();

const home = require('./home');

router.use('/', home);

module.exports = router.routes();