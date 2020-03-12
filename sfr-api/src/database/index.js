const Sequelize = require('sequelize')
const config = require ('../config')
const tedious = require('tedious')

const { database } = config
let conn = null

module.exports = function dbinstance() {
    if(!conn){
        conn = new Sequelize(database.schema, database.user, database.password,
        {
            host: database.host,
            dialect: database.dialect,
            dialectModule: tedious,
            port: database.port,
            query: {
                raw: false
            },
            logging: database.log,
            operatorsAliases: Sequelize.Op
        })
    }
    return conn
}