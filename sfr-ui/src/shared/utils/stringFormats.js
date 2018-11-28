import isNil from 'lodash/isNil';

export function number(numero = 0) {
  if (isNil(numero)) return '0'

  if(numero.toString().trim() === '') return '0';

  let num = numero.toString().replace(/,/g, '');
  if (!isNaN(num)) {
    num = num
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1,');
    num = num
      .split('')
      .reverse()
      .join('')
      .replace(/^[,]/, '');
    num = num.replace('-,', '-');
    return num;
  }
  return numero;
}
