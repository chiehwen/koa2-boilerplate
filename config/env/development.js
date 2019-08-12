'use strict';

// Do not put secrets into this configuration file. Use command line or environment variable.

const config = {
	SERVER: {
		PORT: process.env.SERVER_PORT
	},
	SESSION: {
		KEYS: process.env.SESSION_KEYS
	},
	MONGODB: {
		HOST: process.env.MONGODB_HOST,
	},
	REDIS: {
		HOST: process.env.REDIS_HOST,
		PORT: process.env.REDIS_PORT
	},
	logger: {
    level: debug,
    format: 'combined'
  }
}

module.exports = config;
