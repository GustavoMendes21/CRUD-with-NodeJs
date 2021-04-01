const database = require("./config");
module.exports = {
	async getUsers() {
		return await database.query("SELECT * FROM register.user");
	},

	async getUser(id) {
		return await database.query("SELECT * FROM register.user WHERE id = $1", [id]);
	},

	async getUserByEmail(email){
		return await database.query("SELECT * FROM register.user WHERE email = $1", [email]);
	},

	async createUser(id, user) {        
		return await database.query("INSERT INTO register.user (id, name, email) values ($1, $2, $3) RETURNING *", [id, user.name, user.email]);
	},

	async deleteUser(id) {
		return await database.query("DELETE FROM register.user WHERE id = $1 ", [id]);
	},

	async updateUser(id, user) {
		return await database.query("UPDATE register.user SET name = $1, email = $2 WHERE id = $3", [user.name, user.email, id]);
	}
};


