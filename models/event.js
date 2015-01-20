'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Event = new Schema({
    name: String,
    location: String,
    description: String,
    created_at: {type: Date, default: Date.now},
    modified_at: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Event', Event);