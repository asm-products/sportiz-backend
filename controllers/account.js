'use strict';
var fs = require('fs'),
	_ = require('underscore'),
	mongoose = require('mongoose');
var Account = mongoose.model('Account');

module.exports.login = function (req, res) {
    res.send(200, {
    	'status': 'success',
        'message': 'Login successful',
        'info': req.user
    });
};

module.exports.register = function(req, res, next) {
    Account.register(new Account({ 
    	username : req.body.username, 
    	email: req.body.email, 
    	role: req.body.role, 
    	parent: req.body.parent}), req.body.password, function(err, account) {
        if (err) {
            res.send(400, {'status' : 'error',
                'message' : 'Error creating account',
                'info':  err });
        } else {
            res.send(200, {'status': 'success',
                'message' : 'Account created',
                'info' : account});
            next();
        }
    });
};


module.exports.logout = function(req, res) {
	if (req.isAuthenticated()) {
        // this destroys the current session (not really necessary because you get a new one
        req.session.destroy(function() {
            // if you don't want destroy the whole session, because you anyway get a new one you also could just change the flags and remove the private informations
            // req.session.user.save(callback(err, user)) // didn't checked this
            //delete req.session.user;  // remove credentials
            //req.session.authenticated = false; // set flag
            //res.clearCookie('connect.sid', { path: '/' }); // see comments above                res.send('removed session', 200); // tell the client everything went well
        });

        req.logout();
    };
	res.send({	'status': 'success',
				'message': 'Logout successful',
				'info': ''
			});
};
