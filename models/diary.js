const database_consts = require('../configs/database_const');
const mongodb_connection = require('../helpers/connect_mongo');

module.exports = {
    create: ((data, cb) => {
        var db = mongodb_connection.get_mongo_connection();
        db.collection(database_consts.DIARY).insertOne(data, function (err, results) {
            cb(err, data)
        })
    }),
    search: ((filter, project, skip, limit, callback) => {
        let db = mongodb_connection.get_mongo_connection();
        db.collection(database_consts.DIARY).find(filter).project(project).sort({
            created_at: -1
        }).skip(skip).limit(limit).toArray(callback);
    }),
    count: ((filter, callback) => {
        let db = mongodb_connection.get_mongo_connection();
        db.collection(database_consts.DIARY).count(filter, callback);
    }),
    get: ((filter, callback) => {
        let db = mongodb_connection.get_mongo_connection();
        db.collection(database_consts.DIARY).find(filter).toArray(callback);
    })
}