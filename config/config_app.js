'use strict';
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    session = require('express-session'),
    favicon = require('serve-favicon'),
    errorhandler = require('errorhandler'),
    multer  = require('multer'),
    MongoStore = require('connect-mongo')(session);

var User = require('../models/user');

var Settings = require('./settings');
var env_config = Settings.values.config[Settings.values.env];

var sessionStore = new MongoStore({
    url: env_config.db_uri,
    clear_interval: 3600
});

module.exports = function(app) {

    app.use(compression());
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(multer());
    app.use(cookieParser('Sportiz_Sessions'));
    app.use(session({
        secret: "Sportiz_Sessions",
        cookie: {
            maxAge: 31536000000
        },
        store: sessionStore
    }));
    app.use(methodOverride());
    app.use(passport.initialize());
    app.use(passport.session());

    app.all("/api/*", function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, HEAD, DELETE, OPTIONS");
        return next();
    });

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));

    mongoose.connect(env_config.db_uri);

    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to: ' + env_config.server);
    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
};
