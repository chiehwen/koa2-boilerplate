const Router = require('koa-router');
const router = new Router();

const home = require('./home');
const users = require('./users');

router.use('/', home);
router.use('/users', users);

module.exports = router.routes();