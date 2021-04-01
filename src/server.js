const express = require("express");
const AppError = require("./error/appError");
require("express-async-errors");

const app = express();
const port = 3000;
const router = require("./routes");

app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message
		});
	}

	return res.status(500).json({
		status: "Error",
		message: `Internal Server Error ${err.message}`
	});      
});


app.listen(port, () => {console.log("Server is Running!");});