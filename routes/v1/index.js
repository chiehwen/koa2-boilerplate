const Router = require('koa-router');
const router = new Router();

const home = require('./home');
const users = require('./users');
const profile = require('./profile');

router.use('/', home);
router.use('/users', users);
router.use('/profile', profile);

module.exports = router.routes();