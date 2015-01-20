'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	// The user account will have
	// username, password - from passport.js
	// the below fields - for profile & social graph
    name: String,
    email: String,
    social_graph: {
    	'facebook': '',
    	'google': ''
    },
    blurb: String,
	role: {type: Number, enum: [1,2,3]}, // 3 roles for now: 1 = root, 2 = admin, 3 = user
    modified_at: {type: Date, default: Date.now},
    created_at: {type: Date, default: Date.now}
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);