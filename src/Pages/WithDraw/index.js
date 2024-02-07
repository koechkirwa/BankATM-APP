import React from "react";

import {MenuButton} from "../../Components/MenuButton";
import {ProtectedRoute} from "../../Components/ProtectedRoute";
import {useNavigate} from "react-router-dom";

import {serviceWithdraw} from "../../Services/serviceWithdraw";

import {randomIDGenerator} from "../../Helpers/randomIDGenerator";

import {UserContext} from "../../Context/UserContext";
import {AuthContext} from "../../Context/AuthContext";

import "./WithDraw.css";

const WithDraw = () => {

    const {userFonds, setUserFonds} = React.useContext(UserContext);
    const {userLoginInfo: {idAccount, cardType}} = React.useContext(AuthContext);
    const [fondsToDraw, setFondsToDraw] = React.useState("");
    const toTransactions = useNavigate();


    const fondsOnChange = (event) => {
        setFondsToDraw(event.target.value);
    };

    const withdrawSubmitted = (event) => {
        event.preventDefault();
        if (fondsToDraw > 0) {
            serviceWithdraw(idAccount, fondsToDraw, cardType)
                .then(response => {
                    const {withdrawSuccesful, validMoney, fromBank} = response;

                    if(!fromBank) {
                        if(!withdrawSuccesful && !validMoney) {
                            alert("No tienes suficientes fondos, ingresa otra cantidad porfavor.")
                        } else if(!withdrawSuccesful && validMoney) {
                            alert("Lo sentimos, no se pudo realizar el retiro, intentalo más tarde.")
                        }
                        else if(withdrawSuccesful && validMoney) {
                            alert("Porfavor, retire su dinero.")
                            const oldFonds = userFonds;
                            const idTransaction = randomIDGenerator(20);
                            const newUserFonds = Number(userFonds) - Number(fondsToDraw);
                            setUserFonds(newUserFonds);
                            toTransactions(`/transaction/${idTransaction}`, {
                                state: {
                                    transactionType: "Retiro-Debito",
                                    oldFonds,
                                    newUserFonds,
                                    fondsChange: -fondsToDraw,
                                    idAccount,
                                },
                            });
                        }
                    } else {
                        if(!withdrawSuccesful && !validMoney) {
                            alert("No puedes retirar más de 5000, porfavor ingresa otra cantidad.")
                        } else if(!withdrawSuccesful && validMoney) {
                            alert("Lo sentimos, no se pudo realizar el retiro, intentalo más tarde.")
                        }
                        else if(withdrawSuccesful && validMoney) {
                            alert("Porfavor, retire su dinero.")
                            const idTransaction = randomIDGenerator(20);
                            toTransactions(`/transaction/${idTransaction}`, {
                                state: {
                                    transactionType: "Retiro-Credito",
                                    oldFonds: userFonds,
                                    newUserFonds: userFonds,
                                    fondsChange: 0,
                                    idAccount,
                                },
                            });
                        }
                    }


                });
        }
    };

    return(
        <ProtectedRoute>
            <div className="withDraw">
                <div className="withDraw__cancel">
                    <MenuButton text="Cancelar"/>
                </div>
                <div className="withDraw__info">
                    <p>Saldo Actual</p>
                    <p>{`$${userFonds}`}</p>
                </div>
                <div className="withDraw__form">
                    <form onSubmit={withdrawSubmitted}>
                        <input
                            type="number" min="0"
                            placeholder="$ ..."
                            onChange={fondsOnChange}
                            value={fondsToDraw}
                        />
                        <button type="submit">Retirar</button>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export {WithDraw};
