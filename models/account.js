'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    name: String,
    email: String,
    created_at: {type: Date, default: Date.now}
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);