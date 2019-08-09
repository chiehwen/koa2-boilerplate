// const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const crypt = {
	// saltPassword(password) {
	// 	// 使用 crypto.randomBytes 產生 256 byte 長度的隨機數作為 Salt
	// 	const salt = crypto.randomBytes(256).toString('hex')
	// 	const hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex');
	// 	return hash;
	// }
	saltPassword(password) {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	}
};

module.exports = crypt;