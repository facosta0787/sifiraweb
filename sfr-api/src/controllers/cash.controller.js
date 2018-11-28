const service = require('../services/cash.service')
const { xmlGenerator } = require('../utils/helpers')

const getCashStore = async (req, res) => {
  const { id, idStore, date } = req.params
  const { findCashStore } = service
  const cashStore = await findCashStore(id, idStore, date)
  return res.status(200).json(cashStore)
}

const calculateCash = async (req, res) => {
  const { cashDetails, cash } = req.body

  if (!cash || !cashDetails) {
    return res.status(400).json({
      message: 'Los parametros cash y cashDetails son requeridos',
      status: 400
    })
  }

  const { saldoAnterior } = cash
  const xml = xmlGenerator(cashDetails)
  const calculatedCashValues = await service.calculateCashValues(xml, saldoAnterior)
  return res.status(200).json(calculatedCashValues)
}

const saveCashStore = async (req, res) => {
  const { me } = req
  const { cash, cashDetails } = req.body

  if (!cash || !cashDetails) {
    return res.status(400).json({
      message: 'Los parametros cash y cashDetails son requeridos',
      status: 400
    })
  }

  const xml = xmlGenerator(cashDetails)
  const fecha = new Date()
  const {
    id,
    idAlmacen,
    saldoAnterior,
    ingresos,
    egresos,
    saldoCajaEfectivo,
    baseCaja,
    efectivoDisponible,
    bancos,
    saldoFinal,
    observaciones,
   } = cash
   const params = {
     xml,
     id,
     idAlmacen,
     fecha,
     saldoAnterior,
     ingresos,
     egresos,
     saldoCajaEfectivo,
     baseCaja,
     efectivoDisponible,
     bancos,
     saldoFinal,
     observaciones,
     user: me.user
   }
  return res.status(200).json({ message: 'Saved !', data: params })
}

module.exports = {
  getCashStore,
  calculateCash,
  saveCashStore
}