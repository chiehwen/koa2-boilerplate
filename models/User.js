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

module.exports = User = mongoose.model("users", UserSchema);