const Sequelize = require('sequelize')
const config = require ('../config')

const { database } = config
let _dbinstance = null

module.exports = function dbinstance() {
    if(!_dbinstance){
        _dbinstance = new Sequelize(database.schema, database.user, database.password,
        {
            host: database.host,
            dialect: database.dialect,
            port: database.port,
            query: {
                raw: false
            },
            logging: database.log
        })
    }
    return _dbinstance
}