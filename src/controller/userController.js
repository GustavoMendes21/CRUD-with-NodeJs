const usersData = require("../database/usersData");
const AppError = require("../error/appError");

const { v4: uuidv4 } = require("uuid");
class UserController {
	async GetUsers(req, res) {

		const users = await usersData.getUsers();
		if(users.rows.length === 0) throw new AppError("Users not found", 404);              
		return res.status(200).json(users.rows);
	}
	async createUser(req, res) {
		const id = uuidv4();
		const user = req.body;
       
		const userAlreadyExists = await usersData.getUserByEmail(user.email);
     
		if (userAlreadyExists.rows.length !== 0) throw new AppError("User Already Exists", 409);        
        
		const newUser = await usersData.createUser(id,user);
        
		return res.status(201).json(newUser.rows);
	}
	async updateUser(req, res) {
		const id = req.params.id;
		const user = req.body;

		const result = await usersData.getUser(id);
		if (result.rows.length === 0) throw new AppError("User not found", 404);

		await usersData.updateUser(id, user);

		return res.status(204).end();
	}

	async deleteUser(req, res) {
		const id = req.params.id;

		const result = await usersData.getUser(id);

		if(result.rows.length === 0) throw new AppError("User not found", 404);

		await usersData.deleteUser(id);

		return res.status(204).end();
	}
}

module.exports = UserController;