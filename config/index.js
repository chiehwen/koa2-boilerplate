const merge = require('lodash/merge');

// Load .env settings into process.env
// Will fail silently if no .env file present.
switch (process.env.NODE_ENV) {
	case 'development':
		require('dotenv').config({ path: '.env.local' });
		break;
	case 'staging':
		require('dotenv').config({ path: '.env.staging' });
		break;
	case 'production':
		require('dotenv').config({ path: '.env.prod' });
		break;
	default:
		throw new Error("Environment Not Recognized");
}

// Load our own defaults which will grab from process.env
const config = require('./env/defaults');

// Only try this if we're not on Production
if (process.env.NODE_ENV !== 'production') {
  // Load environment-specific settings
  let localConfig = {};

  try {
    // The environment file might not exist
		localConfig = require(`./env/${config.env}`);
    localConfig = localConfig || {};
  } catch(err) {
    localConfig = {};
  }

  // merge the config files
  // localConfig will override defaults
  merge({}, config, localConfig);
}

module.exports = config;
