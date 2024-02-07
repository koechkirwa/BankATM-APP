import React from "react";

import { MenuButton } from "../../Components/MenuButton";
import {ProtectedRoute} from "../../Components/ProtectedRoute";
import {useNavigate} from "react-router-dom";

import {serviceDepPay} from "../../Services/serviceDepPay";

import {AuthContext} from "../../Context/AuthContext";
import {UserContext} from "../../Context/UserContext";

import "./DepFunds.css";
import {randomIDGenerator} from "../../Helpers/randomIDGenerator";

const DepFonds = () =>{

    const [depPayFonds, setDepPayFonds] = React.useState("");
    const {userLoginInfo: {idAccount, cardType}} = React.useContext(AuthContext);
    const {setUserFonds, userFonds} = React.useContext(UserContext);
    const navigate = useNavigate();

    const onChangeDepPayFonds = (event) => {
        setDepPayFonds(event.target.value);
    };

    const onSubmitDepPay = (event) => {
        event.preventDefault();
        if(depPayFonds > 0) {
            serviceDepPay(idAccount, depPayFonds, cardType)
                .then(response => {
                    if(cardType === "debito") {
                        const {depPaySuccesful} = response;
                        if(!depPaySuccesful) {
                            alert("Lo sentimos, no se pudo realizar el deposito, intentalo más tarde.");
                        } else {
                            alert("Deposito realizado con exito.");
                            setUserFonds(Number(userFonds) + Number(depPayFonds));
                            navigate("/menu");
                        }
                    }
                    else if(cardType === "credito") {
                        const {depPaySuccesful, validMoney, noToPayFonds, newUserFonds} = response;

                        if (depPaySuccesful && validMoney && noToPayFonds) {
                            alert("No tienes pagos pendientes en tu corte mensual.");
                            navigate("/menu");
                        } else if(!depPaySuccesful && validMoney) {
                            alert("Lo sentimos, no se pudo realizar el pago, intentalo más tarde.")
                        } else if(!depPaySuccesful && !validMoney) {
                            alert("No tienes suficientes fondos, ingresa otra cantidad porfavor.")
                        } else if(depPaySuccesful && validMoney) {
                            alert("Pago al corte mensual realizado con exito.");
                            const oldFonds = userFonds;
                            const idTransaction = randomIDGenerator(20);
                            setUserFonds(newUserFonds);
                            navigate(`/transaction/${idTransaction}`, {
                                state: {
                                    transactionType: "Pago Corte Mensual",
                                    oldFonds,
                                    newUserFonds,
                                    fondsChange: -depPayFonds,
                                    idAccount,
                                },
                            });
                        }
                    }
                })
        }
    };

    return(
        <ProtectedRoute>
            <div className="depFunds">
                <div className="text-Dep">
                    {
                        cardType === "debito" ?
                            <p>Ingrese el monto a depositar</p>
                        :
                            <p>Ingrese el monto a pagar</p>
                    }
                </div>
                <div className="inputDep">
                    <form onSubmit={onSubmitDepPay}>
                        <input
                            type="number"
                            min="0" placeholder="$ ..."
                            className="moneyDep"
                            onChange={onChangeDepPayFonds}
                            value={depPayFonds}
                        />
                        <input
                            type="submit"
                            className="dep-funds-submit"
                            value= {cardType === "debito" ? "Depositar" : "Pagar"}
                        />
                    </form>
                </div>
                <MenuButton text="Cancelar"/>
            </div>
        </ProtectedRoute>
    );
};

export {DepFonds};
