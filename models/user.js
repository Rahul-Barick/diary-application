var mongo_connection = require('../helpers/connect_mongo.js');
var database_constants = require('../configs/database_const.js');

module.exports = {
    get: function (filter, project, callback) {
        var db = mongo_connection.get_mongo_connection();
        db.collection(database_constants.USERS).find(filter).project(project).limit(1).next(callback);
    }
};
