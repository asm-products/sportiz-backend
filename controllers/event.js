'use strict';
var fs = require('fs'),
    _ = require('underscore'),
    mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.getAllEvents = function(req, res) {
    Event.find({}, function(err,events) {
        if (err || !events) {
            res.send(400, {
                'status': 'error',
                'message': 'Error getting events',
                'info': err
            });
        } else {
            res.send(200, {
                'status': 'success',
                'message': 'Successfully got events',
                'info': events
            });
        }
    }) 
};

module.exports.create = function(req, res) {
    var created_event = {};
    created_event = _.extend(created_event, req.body);
    var event = new Event(created_event);
    event.save(function(err) {
        if (err) {
            res.send(400, {
                'status': 'error',
                'message': 'Event creation error. Please fill all required fields',
                'info': JSON.stringify(err)
            });
        } else {
            res.send(200, {
                'status': 'success',
                'message': 'Saved event',
                'info': ''
            });
        }
    });
}
