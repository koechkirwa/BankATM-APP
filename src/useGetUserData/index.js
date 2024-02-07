import React from 'react';
import {serviceUserData} from "../../Services/serviceUserData";
import {AuthContext} from "../../Context/AuthContext";

const useGetUserData = (idAccount, cardNumber) => {

    const [userFonds, setUserFonds] = React.useState();
    const [userName, setUserName] = React.useState();
    const [userCardDateEnd, setUserCardDateEnd] = React.useState();

    React.useEffect(() => {
        try {
            serviceUserData(idAccount, cardNumber)
                .then((response) => {
                    setUserFonds(response.fonds);
                    setUserName(response.name);
                    setUserCardDateEnd(response.cardDateEnd);
                })
        } catch (error) {
            console.log(error);
        }
    }, [idAccount, cardNumber])

    return {
        userFonds, setUserFonds,
        userName, setUserName,
        userCardDateEnd, setUserCardDateEnd
    }
}
export {useGetUserData};
