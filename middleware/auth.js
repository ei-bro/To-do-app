const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(201).json({ msg: "No token provided " });
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, uname } = decoded
    req.user = { id, uname }
    next()
  } catch (error) {
    return res.status(201).json({ msg: "Not authorized to access this route" });
  }
}


module.exports = authenticationMiddleware
