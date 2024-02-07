import React from 'react';

import {MenuButton} from "../../Components/MenuButton";
import {EndSesionButton} from "../../Components/EndSesionButton";
import {useParams, useLocation} from "react-router-dom";
import {getTodayDatetime} from "../../Helpers/getTodayDatetime";

import {serviceTransaction} from "../../Services/serviceTransaction";

import {AuthContext} from "../../Context/AuthContext";

import "./Transaction.css";

const Transaction = () => {

    const {idTransaction} = useParams();
    const {userLoginInfo: {idATM}} = React.useContext(AuthContext);
    const transactionInfo = useLocation();

    const datetime = getTodayDatetime();

    const {state: {
        transactionType,
        oldFonds,
        newUserFonds,
        fondsChange,
        idAccount
    }} = transactionInfo;

    React.useEffect(() => {
        serviceTransaction({
            idTransaction,
            transactionType,
            idATM,
            idAccount,
            datetime,
            fondsChange
        })
    }, [])

  return (
      <div className="transaction">
          <div className="transaction__info">
              <div className="transaction__status-box">
                  <p>Transaccion Completada</p>
                  <p>ID: {idTransaction}</p>
                  <p>Tipo: {transactionType}</p>
                  <p>ID ATM: {idATM}</p>
              </div>
              <div className="transaction__info-box">
                  <p>Saldo Anterior: ${oldFonds}</p>
                  <p>Saldo Actual: ${newUserFonds}</p>
                  <p>ID Cuenta: {idAccount}</p>
                  <p>Fecha y Tiempo: {datetime}</p>
              </div>
          </div>
          <div className="transaction__buttons">
              <MenuButton text="Continuar"/>
              <EndSesionButton />
          </div>
      </div>
  )
};

export {Transaction};
