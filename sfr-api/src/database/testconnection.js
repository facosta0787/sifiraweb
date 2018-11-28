const sequelize = require('sequelize')
const dbinstance = require('./index')
const db = dbinstance()

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // process.exit(0)
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1)
  });

  db.query("exec InventarioAlmacenes.dbo.usp_ConsultaInventario '15473',''",{
    type: sequelize.QueryTypes.SELECT
  }).then( data => {
    console.log(data)
    process.exit(0)
  })
