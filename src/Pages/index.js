import React from "react";
import Cards from 'react-credit-cards'

import {MenuButton} from "../../Components/MenuButton";
import {EndSesionButton} from "../../Components/EndSesionButton";
import {ProtectedRoute} from "../../Components/ProtectedRoute";
import {AuthContext} from "../../Context/AuthContext";
import {UserContext} from "../../Context/UserContext";

import "./CheckFunds.css";
import 'react-credit-cards/es/styles-compiled.css';

const CheckFonds = () => {

    const {userLoginInfo} = React.useContext(AuthContext);
    const {userName, userCardDateEnd, userFonds} = React.useContext(UserContext);
    const {cardNumber} = userLoginInfo;

    return(
        <ProtectedRoute>
            <div className="check-funds-container">
                <div className="card-container">
                    <Cards
                        number={cardNumber}
                        name={userName}
                        expiry={userCardDateEnd}
                        focus={"name"}
                    />
                </div>
                <div className="text-container">
                    <p>Saldo Disponible: </p>
                    <p className="check-input">{`$${userFonds}`}</p>
                </div>
                <div className="button-container">
                    <div className="comprobante-button">
                        <button>Imprimir</button>
                    </div>
                    <div className="exit-button">
                        <MenuButton text="Continuar"/>
                    </div>
                    <div className="menu-button">
                        <EndSesionButton />
                    </div>

                </div>
            </div>
        </ProtectedRoute>
    );
};

export {CheckFunds};
