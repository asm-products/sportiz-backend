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
                    'message': 'Authentication Faliure. Try logging in again.',
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
        var UserCtrl = require('../controllers/user');
        app.post('/api/v1/auth/login', passport.authenticate('local'), UserCtrl.login);
        app.put('/api/v1/auth/users/:user_id', UserCtrl.update);
        app.post('/api/v1/auth/register', UserCtrl.register);
        app.get('/api/v1/auth/logout', UserCtrl.logout);
        app.get('/api/v1/auth/profile', UserCtrl.profile);
    })();

    //Event CRUD routes
    (function event_routes() {
        var EventCtrl = require('../controllers/event');
        app.get('/api/v1/events', EventCtrl.all);
        app.get('/api/v1/events/:event_id', EventCtrl.get)
        app.post('/api/v1/events', checkAuthenticated(), EventCtrl.create);
        app.put('/api/v1/events/:event_id', checkAuthenticated(), EventCtrl.update);
        app.del('/api/v1/events/:event_id', checkAuthenticated(), EventCtrl.remove)
        app.get('/api/v1/events/:event_id/subscribe', checkAuthenticated(), EventCtrl.subscribe);
        app.post('/api/v1/events/:event_id/invite', checkAuthenticated(), EventCtrl.invite);
        app.post('/api/v1/events/:event_id/score', checkAuthenticated(), EventCtrl.score);
        app.post('/api/v1/events/:event_id/comment', checkAuthenticated(), EventCtrl.comment);
    })();


    (function handle_defaults() {
        app.use(function (req, res){
            //res.send(404, {'info': '...Page not found'});
        });
    })();
};