require('dotenv').config()

const config = {
    port: 3000,
    database: {
        dialect: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        schema: process.env.DB_SCHEMA,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        log: false
    },
    secret: 'qazwsx'
}

module.exports = config