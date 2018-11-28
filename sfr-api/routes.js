const express = require('express')
const cors = require('cors')
const path = require('path')
const { auth, api } = require('./src/routes')

const routesConfig = (app) => {

  const whitelist = [
    'http://localhost:3000',
    'http://localhost',
  ]

  const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors(corsOptions))
  app.use('/', express.static(path.join(__dirname, 'public')))
  app.use('/auth', auth)
  app.use('/api', api)

  app.get('/login', (req, res) => {
    res.redirect('/')
  })
}

module.exports = routesConfig