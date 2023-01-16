const express = require("express");
const router = express.Router();

const { login, register, singleUser } = require('../controllers/user')
const auth = require('../middleware/auth');
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/single").get(auth, singleUser)

module.exports = router