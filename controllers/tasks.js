const mysqlConnection = require("../db/connect.js");
// Get All Tasks
const getAllTasks = async (req, res) => {
	const { id } = req.user

	const allTasks = `SELECT * FROM u902413967_first.Task WHERE uid=${id};`;
	mysqlConnection.query(allTasks, (err, result) => {
		if (err) {
			return res.status(500).json({ msg: err });
		} else {
			return res.status(200).json({ result });
		}
	});
};
// Get Single
const getTask = async (req, res) => {
	const { id } = req.params;
	const uid = req.user.id
	console.log(req.params, uid);
	const singleTask = `SELECT * FROM u902413967_first.Task WHERE id ='${id}' and uid='${uid}' ;`;
	mysqlConnection.query(singleTask, (err, result) => {
		if (err) {
			return res.status(500).json({ msg: err });
		}
		if (!result) {
			return res.status(404).send(`No task with id : ${id}`);
		} else {
			return res.status(200).json({ result });
		}
	});
};
// Create Task
const createTask = async (req, res) => {
	const { name } = req.body;
	console.log(name);
	const { id } = req.user

	if (!name) {
		return res.status(401).json({ msg: "plese provide data" });
	}
	const createTask = `INSERT INTO u902413967_first.Task (task_name,uid) VALUES ("${name}","${id}") `;

	mysqlConnection.query(createTask, (err, result) => {
		if (err) {
			console.log(err);
			return res.send(err);
		} else {
			return res.status(201).json({ result });
		}
	});
};
// Delete Task
const deleteTask = async (req, res) => {
	const { id } = req.params;
	const uid = req.user.id
	const deletTask = `DELETE FROM u902413967_first.Task WHERE id=${id} And uid=${uid}`;

	mysqlConnection.query(deletTask, (err) => {
		if (err) {
			console.log(err);
			return res
				.status(404)
				.json({ result: `No Task with ID Of ${id} ` });
		} else {
			return res.status(200).json({ result: "task deleted" });
		}
	});
};

// Update Tasks
const updateTask = async (req, res, next) => {
	const { id } = req.params;
	const uid = req.user.id
	// console.log(id);
	let { name, completed } = req.body;

	if (completed) {
		completed = 1;
	}
	// console.log(req.body);

	const updateTask = `UPDATE u902413967_first.Task
	SET task_name = "${name}",
		completed = ${completed}
		WHERE id=${id} And uid=${uid}`;

	mysqlConnection.query(updateTask, (err) => {
		if (err) {
			console.log(err);
			return res.send(err);
		} else {
			const singleTask = `SELECT * FROM u902413967_first.Task WHERE id ="${id}";`;
			mysqlConnection.query(singleTask, (err, result) => {
				if (err) {
					return res.status(500).json({ msg: err });
				}
				if (!result) {
					return res.status(404).send(`No task with id : ${id}`);
				} else {
					return res.status(200).json({ result });
				}
			});
		}
	});
};

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
