const service = require('../services/inventarios.service')

const getInvoicesCustomer = async (req, res) => {
  const { dni, profile } = req.params
  const { findInvoincesCustomer } = service
  const invoices = await findInvoincesCustomer(dni, profile)
  return res.status(200).json(invoices)
}

const getCustomerNames = async (req, res) => {
  const { name } = req.params
  const { findCustomerNames } = service
  const names = await findCustomerNames(name)
  return res.status(200).json(names)
}

const getPriceList = async (req, res) => {
  const { ref, desc, idStore } = req.query
  const { findPriceList } = service
  const priceList = await findPriceList(ref, desc, idStore)
  return res.status(200).json(priceList)
}

module.exports = {
  getInvoicesCustomer,
  getCustomerNames,
  getPriceList
}