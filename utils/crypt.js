const crypto = require('crypto');

const crypt = {
	saltPassword(password) {
		const salt = crypto.randomBytes(128).toString('base64')
		const hash = crypto.pbkdf2Sync(password, 'salt', 100000, 512, 'sha512').toString('hex')
		return hash;
	}
};

module.exports = crypt;