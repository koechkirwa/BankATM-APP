import React from "react";

import {MenuButton} from "../../Components/MenuButton";
import {serviceCardExists} from "../../Services/serviceCardExists";
import {AuthContext} from "../../Context/AuthContext";

import "./TransferMenu.css";

const TransferMenu = ({setValidCard, setTransferToUser}) => {

    const [transferCard, setTransferCard] = React.useState("");
    const {userLoginInfo: {cardNumber}} = React.useContext(AuthContext);

    const onChangeTransferCard = (event) => {
        setTransferCard(event.target.value);
    };

    const submitCardExists = (event) => {
        event.preventDefault();

        // Evitar realizarnos transferencias a nosotros mismos
        if (cardNumber === transferCard) {
            alert("Tarjeta no valida, ingresa otra porfavor.");
            return;
        }
        serviceCardExists(transferCard)
            .then(response => {
                if (response.dataFounded) {
                    const {idAccountToAdd} =  response;
                    setValidCard(true);
                    setTransferToUser(idAccountToAdd);
                } else {
                    alert("La tarjeta ingresada no existe, porfavor ingresa otra.");
                }
            })
    };

    return(
        <div className="depFunds">
            <div className="text-Dep">
                <p>Ingrese la tarjeta a la que transferir</p>
            </div>
            <div className="inputDep">
                <form onSubmit={submitCardExists}>
                    <input
                        type="text"
                        className="moneyDep"
                        minLength="16" maxLength="16"
                        onChange={onChangeTransferCard}
                        value={transferCard}
                    />
                    <input type="submit" value="Continuar" className="dep-funds-submit"/>
                </form>
            </div>
            <MenuButton text="Cancelar"/>
        </div>
    );
};

export {TransferMenu};
