const sequelize = require('sequelize')
const dbinstance = require('../database')

const db = dbinstance()
const type = sequelize.QueryTypes.SELECT

const findUser = async (username) => {
  if (!username || username === '')  return {}

  try {
    const query = `select [id], [user], [name], [strPassword], [perfil], [idAlmacen]
    from Users where [user] = :username;`
    const user = await db.query(
      query,
      {
        replacements: { username },
        type,
      }
    )
    return user[0] || {}
  } catch(error) {
    return error
  }
}

module.exports = { findUser }