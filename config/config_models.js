'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var models = [
        'user', 'event'
    ];

    models.forEach(function (m) {
        var model = require('../models/' + m);
    });

    mongoose.model('User').schema.add({
        user: {type: Schema.ObjectId, ref: 'User'}
    });
};