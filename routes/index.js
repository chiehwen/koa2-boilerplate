const Router = require('koa-router');
const router = new Router();

const apiv1 = require('./v1/index');
const apiv2 = require('./v2/index');

router.use('/v1', apiv1);
router.use('/v2', apiv2);

module.exports = router;