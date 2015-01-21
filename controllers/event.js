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
    Event.findOne({
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
    created_event.organizer = req.user._id;
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
    updated_event = _.extend(updated_event, req.body);
    delete updated_event._id;
    delete updated_event.__v;
    updated_event.modified_at = Date.now();
    Event.findOneAndUpdate({
            _id: req.params.event_id
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
    var id = req.params.event_id;
    var user = req.user._id;
    var updated_event = {};

    Event.findOne({
        _id: id
    }, function(err, event) {
        if (err || !event) {
            res.send(400, {
                'status': 'error',
                'message': 'Error getting event ' + id,
                'info': err
            });
        } else {
            updated_event = _.extend(updated_event, event);
            delete updated_event._id;
            delete updated_event.__v;
            updated_event.subscribers = updated_event.subscribers || [];
            updated_event.subscribers = updated_event.subscribers.concat(user);
            updated_event.modified_at = Date.now();
            Event.findOneAndUpdate({
                    _id: req.params.event_id
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
                            'message': 'Failed to subscribe to this event',
                            'info': JSON.stringify(err)
                        });
                    } else {

                        res.send(200, {
                            'status': 'success',
                            'message': 'Successfully subscribed to this event',
                            'info': JSON.stringify(event)
                        });
                    }
                });            
        }
    });
}

module.exports.invite = function(req, res) {
    var id = req.params.event_id;
    var updated_event = {};
    var invite = req.body;

    Event.findOne({
        _id: id
    }, function(err, event) {
        if (err || !event) {
            res.send(400, {
                'status': 'error',
                'message': 'Error getting event ' + id,
                'info': err
            });
        } else {
            updated_event = _.extend(updated_event, event);
            delete updated_event._id;
            delete updated_event.__v;
            updated_event.players = updated_event.players || {};
            updated_event.players.none = updated_event.players.none || [];
            updated_event.players.none = updated_event.players.none.concat(invite.user);
            updated_event.modified_at = Date.now();
            Event.findOneAndUpdate({
                    _id: req.params.event_id
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
                            'message': 'Failed to invite to this event',
                            'info': JSON.stringify(err)
                        });
                    } else {

                        res.send(200, {
                            'status': 'success',
                            'message': 'Successfully invited to this event',
                            'info': JSON.stringify(event)
                        });
                    }
                });            
        }
    });
}

module.exports.score = function(req, res) {
    var id = req.params.event_id;
    var updated_event = {};
    var score = req.body;

    Event.findOne({
        _id: id
    }, function(err, event) {
        if (err || !event) {
            res.send(400, {
                'status': 'error',
                'message': 'Error getting event ' + id,
                'info': err
            });
        } else {
            updated_event = _.extend(updated_event, event);
            delete updated_event._id;
            delete updated_event.__v;
            updated_event.score = score.score;
            updated_event.modified_at = Date.now();
            Event.findOneAndUpdate({
                    _id: req.params.event_id
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
                            'message': 'Failed to set score',
                            'info': JSON.stringify(err)
                        });
                    } else {

                        res.send(200, {
                            'status': 'success',
                            'message': 'Successfully set the score',
                            'info': JSON.stringify(event)
                        });
                    }
                });            
        }
    });
}

module.exports.comment = function(req, res) {
    var id = req.params.event_id;
    var updated_event = {};
    var comment = {};
    comment.comment = req.body.comment;
    comment.commented_on = Date.now();
    comment.by = req.user._id;

    Event.findOne({
        _id: id
    }, function(err, event) {
        if (err || !event) {
            res.send(400, {
                'status': 'error',
                'message': 'Error getting event ' + id,
                'info': err
            });
        } else {
            updated_event = _.extend(updated_event, event);
            delete updated_event._id;
            delete updated_event.__v;
            updated_event.comments = updated_event.comments || [];
            updated_event.comments = updated_event.comments.concat(comment);
            updated_event.modified_at = Date.now();
            Event.findOneAndUpdate({
                    _id: req.params.event_id
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
                            'message': 'Failed to comment on this event',
                            'info': JSON.stringify(err)
                        });
                    } else {

                        res.send(200, {
                            'status': 'success',
                            'message': 'Successfully commented on this event',
                            'info': JSON.stringify(event)
                        });
                    }
                });            
        }
    });
}
