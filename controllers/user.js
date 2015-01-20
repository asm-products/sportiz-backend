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
