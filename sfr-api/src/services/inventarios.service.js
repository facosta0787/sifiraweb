const sequelize = require('sequelize')
const dbinstance = require('../database')

const db = dbinstance()
const type = sequelize.QueryTypes.SELECT

const findInvoincesCustomer = async (cod, profile) => {
  if (!cod || cod === '')  return {}

  try {
    const customer = await db.query(`exec usp_ConsultaNomCliente '01', :cod`,
    { replacements: { cod, profile }, type})
    const invoices = await db.query(`exec usp_consultaFacturasCliente '01', :cod, :profile`,
    { replacements: { cod, profile }, type})
    return {customer: customer[0], invoices}
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

const findCustomerNames = async (name) => {
  if (!name || name === '')  return {}

  try {
    return await db.query(`exec usp_consultaClientesPorNombre :name`,
    { replacements: { name }, type})
  } catch (error) {
    return error
  }
}

const findPriceList = async (ref = '', desc = '', idStore) => {
  if (!idStore || idStore === '')  return {}

  try {
    return await db.query(`exec usp_ConsultaInventarioAlmacen :ref, :desc, :idStore`,
    { replacements: { ref, desc, idStore }, type})
  } catch (error) {
    return error
  }
}

module.exports = {
  findInvoincesCustomer,
  findCustomerNames,
  findPriceList
}