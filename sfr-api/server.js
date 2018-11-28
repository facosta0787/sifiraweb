const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const config = require('./src/config')
const routesConfig = require('./routes')

const PORT = process.env.PORT || config.port
const app = asyncify(express())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routesConfig(app)

app.listen(PORT, (error) => {
    if(error){
        console.log(error)
        process.exit(1)
    }
    console.log(chalk.green(`[app] Server is running and listening on http://localhost:${PORT}`))
})