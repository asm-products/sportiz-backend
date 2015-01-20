'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    name: String,
    email: String,
    created_at: {type: Date, default: Date.now}
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);