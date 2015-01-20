'use strict';
var fs = require('fs'),
	_ = require('underscore'),
	mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.getAllEvents = function (req, res) {
    res.send(200);
};


