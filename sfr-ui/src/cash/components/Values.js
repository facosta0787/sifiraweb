import React from 'react';
import isNil from 'lodash/isNil';
import { Input } from 'semantic-ui-react';
import { number } from '../../shared/utils/stringFormats';
import HeaderContainer from './ValuesContainer';

const HeaderCash = (props) => {
  const {
    saldoAnterior,
    ingresos,
    ingresosV,
    egresos,
    egresosV,
    saldoCajaEfectivo,
    saldoCajaEfectivoV,
    baseCaja,
    efectivoDisponible,
    efectivoDisponibleV,
    bancos,
    bancosV,
    saldoFinal,
    saldoFinalV,
  } = props.data;

  const inputIngresos = isNil(ingresosV) ? ingresos : ingresosV;
  const inputEgresos = isNil(egresosV) ? egresos : egresosV;
  const inputSaldoCajaEfectivo = isNil(saldoCajaEfectivoV) ? saldoCajaEfectivo : saldoCajaEfectivoV;
  const inputEfectivoDisponible = isNil(efectivoDisponibleV) ? efectivoDisponible : efectivoDisponibleV;
  const inputBancos = isNil(bancosV) ? bancos : bancosV;
  const inputSaldoFinal = isNil(saldoFinalV) ? saldoFinal : saldoFinalV;


  return (
    <HeaderContainer>
      <Input label='Sando Anterior' value={number(saldoAnterior)} size='mini' readOnly fluid />
      <Input label='Ingresos' value={number(inputIngresos)} size='mini' readOnly fluid />
      <Input label='Egresos' value={number(inputEgresos)} size='mini' readOnly fluid />
      <Input label='Efectivo' value={number(inputSaldoCajaEfectivo)} size='mini' readOnly fluid />
      <Input label='Base' value={number(baseCaja)} size='mini' readOnly fluid />
      <Input label='Efectivo Disp.' value={number(inputEfectivoDisponible)} size='mini' readOnly fluid />
      <Input label='Bancos' value={number(inputBancos)} size='mini' readOnly fluid />
      <Input label='Saldo Final' value={number(inputSaldoFinal)} size='mini' readOnly fluid />
    </HeaderContainer>
  )
}

export default HeaderCash;