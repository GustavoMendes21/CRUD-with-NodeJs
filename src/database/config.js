const { Pool } = require("pg");

const client = new Pool({
	user: "postgres",
	host: "localhost",
	database: "crud",
	password: "mendes",
	port: 5432
});

module.exports = client;