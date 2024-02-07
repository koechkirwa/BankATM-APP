import React from "react";

import {ProtectedRoute} from "../../Components/ProtectedRoute";
import {UserContext} from "../../Context/UserContext";
import {AuthContext} from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";

import transferLogo from "../../img/transfer-svgrepo-com.svg";
import moneyK from "../../img/cash-pay-svgrepo-com.svg";
import withdrawal from "../../img/cash-machine-svgrepo-com.svg";
import inquiry from "../../img/money-svgrepo-com.svg";
import exit from "../../img/exit-svgrepo-com.svg";

import "./MainMenu.css";

const MainMenu = () => {

    const {userName} = React.useContext(UserContext);
    const {userLoginInfo, logout} = React.useContext(AuthContext);
    const {idAccount} = userLoginInfo;

    const menuNavigate = useNavigate();

    const changeMenuFunction = (route) => {
        menuNavigate(route);
    };

    return(
        <ProtectedRoute>
            <div className="mainMenu">
                <div className="headerMenu">
                    <h1>Bienvenido {userName}!</h1>
                    <p>Número de Cuenta: {idAccount}</p>
                </div>
                <p className="opSelected">Seleccione la opción deseada.</p>
                <div className="menuButtons">
                    <div className="menuButton">
                        <button onClick={() => changeMenuFunction("/transfer")}>
                            <img src={transferLogo}/>
                        </button>
                        <p>Tranferencias</p>
                    </div>
                    <div className="menuButton">
                        <button onClick={() => changeMenuFunction("/dep-fonds")}>
                            <img src={moneyK}/>
                        </button>
                        <p>Pagos/Depositos</p>
                    </div>
                    <div className="menuButton">
                        <button onClick={() => changeMenuFunction("/withdraw")}>
                            <img src={withdrawal}/>
                        </button>
                        <p>Retiros</p>
                    </div>
                    <div className="menuButton">
                        <button onClick={() => changeMenuFunction("/check-fonds")}>
                            <img src={inquiry}/>
                        </button>
                        <p>Consulta</p>
                    </div>
                    <div className="menuButton">
                        <button onClick={logout}>
                            <img src={exit}/>
                        </button>
                        <p>Salir</p>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export {MainMenu};
