'use strict';
var fs = require('fs'),
    _ = require('underscore'),
    mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.all = function(req, res) {
    Event.find({}, function(err, events) {
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

module.exports.get = function(req, res) {
    var id = req.params.event_id;
    Event.find({
        _id: id
    }, function(err, event) {
        if (err || !event) {
            res.send(400, {
                'status': 'error',
                'message': 'Error getting event ' + id,
                'info': err
            });
        } else {
            res.send(200, {
                'status': 'success',
                'message': 'Successfully got event',
                'info': event
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
                'info': event
            });
        }
    });
}

module.exports.update = function(req, res) {
    var updated_event = {};
    var to_be_updated = '';

    updated_event = _.extend(updated_event, req.body);
    to_be_updated = updated_event._id;
    delete updated_event._id;
    delete updated_event.__v;
    updated_event.modified_at = Date.now();
    Event.findOneAndUpdate({
            _id: to_be_updated
        }, {
            $set: updated_event
        }, {
            upsert: true
        },
        function(err, event) {
            if (err) {
                console.log(err);
                res.send(400, {
                    'status': 'error',
                    'message': 'Update has failed. ',
                    'info': JSON.stringify(err)
                });
            } else {

                res.send(200, {
                    'status': 'success',
                    'message': 'Successfully updated the event ' + updated_event._id,
                    'info': JSON.stringify(event)
                });
            }
        });
}

module.exports.remove = function(req, res) {
    Event.findOneAndRemove({
        '_id': req.params.event_id
    }, function(err) {
        if (err) {
            res.send(400, {
                'status': 'error',
                'message': 'Error deleting event ' + req.params.event_id,
                'info': JSON.stringify(err)
            });
        } else {
            res.send(200, {
                'status': 'success',
                'message': 'Successfully deleted event',
                'info': ''
            });
        }
    });
}

module.exports.subscribe = function(req, res) {

}

module.exports.invite = function(req, res) {

}

module.exports.score = function(req, res) {

}

module.exports.comment = function(req, res) {

}
