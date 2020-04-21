const express = require('express')
const { isAuthenticated: withAuth } = require('../middlewares/auth.middleware')
const stockController = require('../controllers/stock.controller')
const cashController = require('../controllers/cash.controller')

const router = express.Router()

// stock routes /api...
router.get('/invoices/:dni/:profile', withAuth, stockController.getInvoicesCustomer)
router.get('/names/:name', withAuth, stockController.getCustomerNames)
router.get('/stock', withAuth, stockController.getPriceList)

// cash routes /api...
router.get('/cash/:id/:idStore/:date', withAuth, cashController.getCashStore)
router.post('/cash/calculate', withAuth, cashController.calculateCash)
router.post('/cash/save', withAuth, cashController.saveCashStore)

module.exports = router