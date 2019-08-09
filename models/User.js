const uuidv4 = require('uuid/v4');
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: {
		type: Buffer,
		default: function() {
			return mongoose.Types.Buffer(uuidv4()).toObject(4);
        },
		required: true
	},
	username: {
		type: String
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	age: {
		type: Number
	},
	mobile: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

// UserSchema.methods.saltPassword = async (password) => {
// 	// 使用 crypto.randomBytes 產生 256 byte 長度的隨機數作為 Salt
// 	const salt = await crypto.randomBytes(256).toString('hex')
// 	const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
// }

// UserSchema.methods.validPassword = async (password) => {
// 	const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
// 	return this.hash === hash;
// }

// UserSchema.methods.encryptPassword = async (password) => {
// 	const salt = await bcrypt.genSalt(10);
// 	const hash = bcrypt.hash(password, salt);
// 	return hash;
// };

// UserSchema.methods.comparePassword = async function(password) {
// 	return await bcrypt.compare(password, this.password);
// };

module.exports = User = mongoose.model("users", UserSchema);