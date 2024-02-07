import React from "react";

import {MenuButton} from "../../Components/MenuButton";
import {useNavigate} from "react-router-dom";

import {serviceTransfer} from "../../Services/serviceTransfer";

import {UserContext} from "../../Context/UserContext";
import {AuthContext} from "../../Context/AuthContext";

import "./TransferFonds.css";
import {randomIDGenerator} from "../../Helpers/randomIDGenerator";

const TransferFonds = ({transferToUser}) => {

    const [transferFonds, setTransferFonds] = React.useState("");
    const {userFonds, setUserFonds} = React.useContext(UserContext);
    const {userLoginInfo: {idAccount}} = React.useContext(AuthContext);
    const toTransactions = useNavigate();

    const onChangeTransferFonds = (event) => {
        setTransferFonds(event.target.value);
    };

    const onSubmitTransfer = (event) => {
        event.preventDefault();
        if (transferFonds > 0) {
            serviceTransfer(idAccount, transferToUser, transferFonds)
                .then(response => {
                    const {transferSuccesful, validMoney} = response;

                    if(!transferSuccesful && !validMoney) {
                        alert("No tienes suficientes fondos, ingresa otra cantidad porfavor.")
                    } else if(!transferSuccesful && validMoney) {
                        alert("Lo sentimos, no se pudo realiza la transferencia, intentalo más tarde.")
                    }
                    else if(transferSuccesful && validMoney) {
                        alert("Transferencia realizada con exito.")
                        const oldFonds = userFonds;
                        const idTransaction = randomIDGenerator(20);
                        const newUserFonds = Number(userFonds) - Number(transferFonds);
                        setUserFonds(newUserFonds);
                        toTransactions(`/transaction/${idTransaction}`, {
                            state: {
                                transactionType: "Transferencia",
                                oldFonds,
                                newUserFonds,
                                fondsChange: -transferFonds,
                                idAccount,
                            },
                        });
                    }
                });
        }
    };

    return(
        <div className="transferFonds">
            <div className="transferFonds__cancel">
                <MenuButton text="Cancelar"/>
            </div>
            <div className="transferFonds__info">
                <p>Saldo Actual</p>
                <p>{`$${userFonds}`}</p>
            </div>
            <div className="transferFonds__form">
                <form onSubmit={onSubmitTransfer}>
                    <input type="number"
                           placeholder="$ ..." min="0"
                           onChange={onChangeTransferFonds}
                           value={transferFonds}
                    />
                    <button type="submit">Transferir</button>
                </form>
            </div>
        </div>
    );
};

export {TransferFonds};
