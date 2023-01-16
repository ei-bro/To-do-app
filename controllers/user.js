const mysqlConnection = require("../db/connect.js");

const jwt = require('jsonwebtoken')
const { BadRequestError, CustomAPIError } = require('../errors/index')

const login = (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequestError('Please provide usename and password')
    }

    const singleUser = `SELECT * FROM u902413967_first.Users WHERE username ="${username}";`;
    mysqlConnection.query(singleUser, (err, result) => {
        if (err) {
            throw new CustomAPIError("Something went wrong try again later")
        }
        if (result.length == 0) {
            return res.status(404).json({ msg: `There is no account with this username` });
        } else {
            // some code
            if (result[0].password == password) {
                const id = result[0].id
                const uname = result[0].username
                const token = jwt.sign({ id, uname }, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                })
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ msg: "incorrect pasword" });

            }
        }
    });
}

const register = (req, res) => {
    const { username, password } = req.body
    console.log(req.body)

    if (!username || !password) {
        throw new BadRequestError('Please provide usename and password')
    }
    const singleUser = `SELECT * FROM u902413967_first.Users WHERE username ="${username}";`;
    mysqlConnection.query(singleUser, (err, result) => {
        if (err) {
            console.log(err)
            throw new CustomAPIError("Something went wrong try again later")
        }
        if (result.length == 0) {

            const createUser = `INSERT INTO u902413967_first.Users (username,password) VALUES ("${username}","${password}") `;

            mysqlConnection.query(createUser, (err, result) => {
                if (err) {

                    throw new CustomAPIError("Something went wrong try again later")
                } else {
                    return res.status(201).json({ msg: "sucessfully registerd" });
                }
            });

        } else {
            return res.status(404).json({ msg: `There is an account with this username` });

        }
    });

}
const singleUser = (req, res) => {
    const { uname } = req.user
    res.status(200).json({ msg: uname })
}
module.exports = {
    login,
    register,
    singleUser
}
