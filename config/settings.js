'use strict';

module.exports.values = {
    'db': 'mongodb://localhost/sportiz',
    'env': 'LOCAL', // options LOCAL, DOGFOOD, PROD
    'config': {
        'LOCAL' : {
            'server': 'http://localhost',
            'port': 3000,
            'db_uri': 'mongodb://localhost/sportiz',

        },
        'DOGFOOD' : {
            // NOTHING HERE
        },
        'STAGING' : {
            // NOTHING HERE
        },
        'PROD' : {
            // NOTHING HERE           
        }
    },
    'version': {
        "client": "1",
        "api": "1",
        "status": "stable"
    }
};