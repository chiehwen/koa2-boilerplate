const Router = require('koa-router');
const router = new Router();

const home = require('./home');
const users = require('./users');

router.use('/api/', home);
router.use('/api/users', users);

module.exports = router;