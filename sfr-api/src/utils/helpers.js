const xmlGenerator = (data) => {
  let xml = data.reduce( (ant, act) => {
    return `${ant}<concepto idConcepto = "${act.idConcepto}" valor="${act.valor}"></concepto>`
  }, '<?xml version="1.0"?><cuadreCaja>')
  xml = `${xml}</cuadreCaja>`
  return xml
};

const isEmpty = (obj) => {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

module.exports = { xmlGenerator, isEmpty }