// console.clear();


const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");


const tasks = require("./routes/tasks");
const users = require("./routes/user");
require("dotenv").config();
const port = process.env.PORT || 5000;

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const auth = require("./middleware/auth")
// middleware

app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/users", users);
app.use("/api/v1/tasks", auth, tasks);
// app.use(express.static("./public/build"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = () => {
	try {
		connectDB.getConnection((err) => {
			if (err) throw err;
			else console.log("Connected to Database ");
		});
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
