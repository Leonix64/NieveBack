const db = require('../config/db');

const UserModel = {};

UserModel.create = (userData, callback) => {
    db.query('INSERT INTO user SET ?', userData, (err, result) => {
        if (err) {
            console.error('Error inserting user', err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

module.exports = UserModel;