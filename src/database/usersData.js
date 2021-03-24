const database = require('./config');

module.exports = {
    async getUsers() {
        return await database.query('SELECT * FROM register.user');
    },
};

