'use strict';
var fs = require('fs'),
    _ = require('underscore'),
    mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function(req, res) {
    res.send(200, {
        'status': 'success',
        'message': 'Login successful',
        'info': req.user
    });
};

module.exports.register = function(req, res, next) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        parent: req.body.parent
    }), req.body.password, function(err, user) {
        if (err) {
            res.send(400, {
                'status': 'error',
                'message': 'Error creating user',
                'info': err
            });
        } else {
            res.send(200, {
                'status': 'success',
                'message': 'User created',
                'info': user
            });
            next();
        }
    });
};


module.exports.logout = function(req, res) {
    if (req.isAuthenticated()) {
        req.session.destroy(function() {});
        req.logout();
    };
    res.send({
        'status': 'success',
        'message': 'Logout successful',
        'info': ''
    });
};

module.exports.update = function(req, res) {
    var update_user = {};
    update_user = _.extend(update_user, req.body);
    delete update_user._id; // Disallow editing of username
    User.findOneAndUpdate({
            _id: req.params.user_id
        }, {
            $set: update_user
        }, {
            upsert: true
        },
        function(err, user) {
            if (err) {
                res.send(400, {
                    'status': 'error',
                    'message': 'Error updating user ' + req.params.user_id,
                    'info': JSON.stringify(err)
                });
            } else {
                res.send(200, {
                    'status': 'success',
                    'message': 'Successfully updated user',
                    'info': JSON.stringify(user)
                });
            }
        });
};

module.exports.profile = function(req, res) {
    if (req.user) {
        res.send(200, {
            status: 'success',
            user: req.user
        });
    } else {
        res.send(401, {
            status: 'error'
        });
    }
};
