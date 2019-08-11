'use strict';

require('dotenv').config({ path: '.env.staging' });

module.exports = {
	MONGODB_HOST: "mongodb://127.0.0.1:27017/api-server"
}