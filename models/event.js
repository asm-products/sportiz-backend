'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Event = new Schema({
    name: String,
    description: String,
    sport: String,
    place: {
    	name: String,
        coords: {
            longitude: { type: Number },
            latitude: { type: Number }
        },
        address: {type: String, default: '', unique: true, trim: true},
        landmarks: [{type: String, default: '', trim: true}],
        city : {type: String, default: '', trim: true},
    },    
    when: Date,
    organizer: {type: Schema.ObjectId, ref: 'User'},
    players: {
    	'yes': [{type: Schema.ObjectId, ref: 'User'}],
    	'no': [{type: Schema.ObjectId, ref: 'User'}],
    	'maybe': [{type: Schema.ObjectId, ref: 'User'}],
    	'none': [{type: Schema.ObjectId, ref: 'User'}]
    },
    subscribers: [{type: Schema.ObjectId, ref: 'User'}],
    score: String,
    comments: [{
    	comment: String,
    	commented_on: Date,
    	by: {type: Schema.ObjectId, ref: 'User'}
    }],
    created_at: {type: Date, default: Date.now},
    modified_at: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Event', Event);