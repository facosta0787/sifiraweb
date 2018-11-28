const jwt = require('jsonwebtoken')
const { isEmpty } = require('../utils/helpers')
const { secret } = require('../config')

const isAuthenticated = (req, res, next) => {
  try {
    const token = getTokenfromHeader(req)
    if(!token) throw {
      status: 401,
      message: 'Unauthorized or absent token in the headers'
    }

    jwt.verify(token, secret, function(error, decoded) {
      if(error) throw {
        status: getHttpCodeError(error),
        message: error.toString()
      }
      req.me = decoded
      next()
    });

  } catch(error) {
    res.status(error.status).json(error)
  }
}

const getTokenfromHeader = (req) => {
  if(!isEmpty(req.header('Authorization'))) {
    return req.header('Authorization').split(' ')[1]
  }
  return false
}

const getHttpCodeError = (error) => {
  const message = error.toString()
  if(message.includes('expired')) {
    return 401
  }
  return 400
}

module.exports = {
  isAuthenticated
}