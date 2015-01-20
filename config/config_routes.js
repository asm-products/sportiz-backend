'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
 
module.exports = function (app) {
    //Check if a User is authenticated
    function checkAuthenticated() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                next();
            } else {
                res.send(401, {'status': 'error',
                    'message': 'We got an Authentication Faliure. Try logging in again.',
                    'info': ''});
            }
        };
    }

    function checkRole(role) {
        return function (req, res, next) {
            if (isAuthorized(role, req)) {
                next();
            } else {
                res.send(403, {'status': 'error',
                    'message': 'You are not supposed to be here!',
                    'info': ''
                });
            }
        };
    }

    function isAuthorized(role, req) {
        if(req.user.role) {
            if(req.user.role <= role) {
                return true;
            }
            return false;
        }
        return false;
    };

    //Register user and login as well as other auth routes
    (function authentication_routes() {
        var AccountCtrl = require('../controllers/account');
        app.post('/api/v1/auth/login', passport.authenticate('local'), AccountCtrl.login);

        app.post('/api/v1/auth/register', AccountCtrl.register);
        app.get('/api/v1/auth/logout', AccountCtrl.logout);
        app.get('/api/v1/auth/get_logged_in_user', function (req,res) {
            if(req.user) {
               res.send(200, {status: 'success', user: req.user}); 
            }
            else {
                res.send(401, {status: 'error'});
            }
        });

        app.post('/api/v1/auth/login', function (req, res) {
            console.log(req.body);
            req.login(req.body, function (err) {
                console.log(err);
                console.log("logged in");
            });
        });
    })();

    //Event CRUD routes
    (function event_routes() {
        var EventCtrl = require('../controllers/event');
        app.get('/api/v1/events', EventCtrl.getAllEvents);
        app.post('/api/v1/events', EventCtrl.create);
    })();


    (function handle_defaults() {
        app.use(function (req, res){
            //res.send(404, {'info': '...Page not found'});
        });
    })();
};