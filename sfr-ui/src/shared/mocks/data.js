export const data = [
  {"Cedula":"1036609137","Nombre":"ACOSTA ESTRADA ANDRES FELIPE","Tel1":"3113495655","Tel2":"","Tel3":"3113495655","Tel4":""},
  [
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':'f'},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':'adf'},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':'Yola'},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':'Marico'},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''},
    {'Almacen':'INIZIO 1','Fecha':'15 Ago 2017','Tipo':'VOM','Numero':'26142','Valor':'$ 127.000','Vendedor':'Carolina F6','Concepto':''}
  ]
]

function generaNames(n){
  let names = []
  for(let i = 0; i < n; i++){
    names[i] = {'Almacen':'Inizio 1','Cedula':'1036609137','Nombre':'Andres Felipe Acosta','Telefono':'3113495655'}
  }
  return names
}

export const names = generaNames(10)

function generaRefs(n){
  let refs = []
  for(let i = 0; i < n; i++){
    refs[i] = {'Almacen':'Inizio 1','Referencia':'15473','Descripcion':'Leggins Suplex','Precio x Mayor':'$ 51,000.00','Precio x Unidad':'$ 66,000.00','Costo':'$ 34,000.00'}
  }
  return refs
}

export const refs = generaRefs(10)
