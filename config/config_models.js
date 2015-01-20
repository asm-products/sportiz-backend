'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var models = [
        'account', 'event'
    ];

    models.forEach(function (m) {
        var model = require('../models/' + m);
    });

    mongoose.model('Account').schema.add({
        account: {type: Schema.ObjectId, ref: 'Account'}
    });
};