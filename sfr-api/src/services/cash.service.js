const sequelize = require('sequelize')
const dbinstance = require('../database')

const db = dbinstance()
const type = sequelize.QueryTypes.SELECT

const findCashStore = async (id, idStore, date) => {
  if (!idStore || idStore === '' ||
      !date || date === '')  throw 'Parameters can\'t be empty'

  try {
    let result = {}
    const [ cash ] = await db.query(`exec DBBANCOS..Usp_CC_consultaMovCuadreCaja null, :idStore, :date;`,
    { replacements: { idStore, date }, type })

    if (cash) {
      const { id } = cash

      const cashDetails = await db.query(`exec DBBANCOS..Usp_CC_CargaDetalleCuadreCaja :id;`,
      { replacements: { id }, type })

      result = { cash, cashDetails, new: false }
    } else {
      const results = await db.query(`exec DBBANCOS..Usp_CC_CargaTipoCuadreCaja :idStore;`,
      { replacements: { idStore }, type })

      const cashType = results.map(result => Object.assign({}, result, { valor: 0 }))

      const [ previousBalance ] = await db.query(`exec DBBANCOS..Usp_CC_SaldoAnterior :idStore, :date;`,
      { replacements: { idStore, date }, type })

      result = {
        cash: {
          id: null,
          idAlmacen: idStore,
          saldoAnterior: previousBalance.saldo
        },
        cashDetails: cashType,
        new: true
      }
    }
    return result

  } catch(error) {
    return error
  }
}

const calculateCashValues = async (xml, prevBalance) => {
  try {
    if (!xml || xml === '' ||
    !prevBalance || prevBalance === '') throw 'Parameters can\'t be empty'

    const [ values ] = await db.query('exec DBBANCOS..CalculaValoresCuadreCajaXML :xml, :prevBalance',
    { replacements: { xml, prevBalance }, type})

    for (let key in values){
      if(values.hasOwnProperty(key)){
        values[key] = parseFloat(values[key])
      }
    }

    return values

  } catch(error) {
    return error
  }
}

const insertCashStore = async (params) => {
  try {

  } catch(error) {
    return error
  }
}

module.exports = {
  findCashStore,
  calculateCashValues
}