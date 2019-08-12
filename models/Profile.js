const uuidv4 = require('uuid/v4');
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: String,
        ref: "users",
        required: true
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String
    },
    github: {
        type: String
    },
    experience: [
        {
            current: {
                type: Boolean,
                default: true
            },
            title: { type: String },
            company: { type: String },
            location: { type: String },
            from: { type: String, required: true },
            to: { type: String },
            description: { type: String }
        }
    ],
    education: [
        {
            current: {
                type: Boolean,
                default: true
            },
            school: { type: String },
            degree: { type: String },
            field_of_study: { type: String },
            from: { type: String, required: true },
            to: { type: String },
            description: { type: String }
        }
    ],
    social: {
        facebook: { type: String },
        line: { type: String },
        wechat: { type: String }
    },
	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);