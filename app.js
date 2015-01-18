(function () {
    'use strict';
    var express = require('express'),
        app = express();

    // START THE SERVER!
    console.log('STARTING THE SPORTIZ SERVER');
    console.log('-------------------------');
    app.listen(3000);
    console.log('Started the server');
    process.on('uncaughtException', function (error) {
        console.log(error.stack);
        console.log(error);
    });
})();