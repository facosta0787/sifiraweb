const jwt = require('jsonwebtoken')
const { isEmpty } = require('../utils/helpers')
const { secret } = require('../config/index')
const { findUser } = require('../services/auth.service')

const doLogin = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await findUser(username)

    if(!isEmpty(user)) {
      if(password === user.strPassword) {
        delete user.strPassword
        return jwt.sign(user, secret, {
          algorithm: 'HS256',
          expiresIn: '24h'
        },
        (error, token) => {
          if(error) throw {
            status: 500,
            message: error.toString()
          }
          return res.status(200).json({ token })
        })
      }
    }

    throw {
      status: 403,
      message: 'Incorrect username or password'
    }

  } catch(error) {
    return res.status(error.status).json({ error })
  }
}

module.exports = {
  doLogin
}
