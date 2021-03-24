const usersData = require('../database/usersData');

class UserController {
    async GetUsers(req, res) {
        const users = await usersData.getUsers();

        return res.status(200).json(users.rows);
    }
}

module.exports = UserController;