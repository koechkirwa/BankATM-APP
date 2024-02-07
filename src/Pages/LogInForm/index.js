import React from "react";

import {serviceLogin} from "../../Services/serviceLogin";
import {serviceBlockCard} from "../../Services/serviceBlockCard";
import {AuthContext} from "../../Context/AuthContext";

import "./LogInForm.css";

const LogInForm = () => {

    const [cardNumber, setCardNumber] = React.useState("");
    const [NIP, setNIP] = React.useState("");
    const {login} = React.useContext(AuthContext);
    let intentos = 0;

    const cardNumberOnChange = (event) => {
        setCardNumber(event.target.value);
    }

    const NIPOnChange = (event) => {
        setNIP(event.target.value);
    }

    const onLogInFormSubmitted = async (event) => {
        event.preventDefault();
        const loginResponse = await serviceLogin(cardNumber, NIP);
        /*If Backend told us that everything is correct,
             we log in the page*/
        if(loginResponse.shouldLogin) {
            const {idCuenta, tipoTarjeta, randomATM} = loginResponse;
            login(idCuenta, cardNumber, tipoTarjeta, randomATM);
        } else {
            // Checking if the card is blocked
            if(loginResponse.cardBlocked) {
                alert("Tu tarjeta esta bloqueada, porfavor contacta a soporte a cliente para desbloquearla.");
            } else if (loginResponse.badInfo) { // If not, checking if was a bad NIP to the valid card
                alert("Tarjeta o NIP incorrectos.");
                intentos++;
                // When we reach 3 tries, we block de card
                if (intentos === 3) {
                    serviceBlockCard(cardNumber)
                     .then(response => {
                         if (response.cardBlocked) {
                             alert("Se equivoco 3 veces en ingresar a su cuenta. Por motivos de seguridad" +
                                 " la tajeta a sido bloqueada, porfavor contacta a soporte a cliente para desbloquearla.");
                         }
                    })
                }
            } else { // If the card does not even exist, we just show invalid info message.
                alert("Tarjeta o NIP incorrectos.");
            }
        }
    }

    return(
        <div className="container">
            <form onSubmit={onLogInFormSubmitted}>
                <p>¡Bienvenido a <span>Sintindir!</span></p>
                <label className="cardLabel">Número de tarjeta</label>
                <input
                    type="text"
                    minLength="16" maxLength="16"
                    className="cardInput"
                    onChange={cardNumberOnChange}
                    value={cardNumber}
                />
                <label className="pinLabel">NIP</label>
                <input
                    type="text"
                    minLength="4" maxLength="4"
                    className="nipInput"
                    onChange={NIPOnChange}
                    value={NIP}
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export {LogInForm};
