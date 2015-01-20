'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Event = new Schema({
    name: String,
    description: String,
    location: String,
    when: Date,
    created_by: {type: Schema.ObjectId, ref: 'Account'},
    created_at: {type: Date, default: Date.now},
    modified_at: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Event', Event);