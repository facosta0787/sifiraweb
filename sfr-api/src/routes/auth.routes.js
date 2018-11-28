const express = require('express')
const controller = require('../controllers/auth.controller')
const router = express.Router()

// auth routes
router.post(
  '/login',
  (req, res) => controller.doLogin(req,res)
)

module.exports = router