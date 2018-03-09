const config = require('../configs/config.js');

const state = {db: null};

module.exports = {
    connect_mongo: ((callback) => {
        if (!state.db) {
            const MongoClient = require('mongodb').MongoClient;
            const host = config[config.env].mongodb.host;
            const port = config[config.env].mongodb.port;
            const db_name = config[config.env].mongodb.db;
            const url = 'mongodb://' + host + ':' + port + '/' + db_name;
            // Use connect method to connect to the server
            MongoClient.connect(url, config[config.env].mongodb.connection_options, ((err, db) => {
                if (err) {
                    console.log("Mongo Connection Failed");
                    process.exit(1);
                    return;
                }
                console.log("Connected successfully to Mongodb server");
                state.db = db;
                callback();
            }));
        } else {
            callback();
        }
    }),
    get_mongo_connection : (() => {
        return state.db
    })
};



