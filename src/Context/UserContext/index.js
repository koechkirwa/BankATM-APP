import React from "react";
import {useGetUserData} from "../../Hooks/useGetUserData";
import {AuthContext} from "../AuthContext";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {

    const {userLoginInfo} = React.useContext(AuthContext);
    const {idAccount, cardNumber} = userLoginInfo;

    const { userFonds,
            setUserFonds,
            userName,
            setUserName,
            userCardDateEnd,
            setUserCardDateEnd } = useGetUserData(idAccount, cardNumber);

    return (
        <UserContext.Provider
            value={{
                userFonds,
                setUserFonds,
                userName,
                setUserName,
                userCardDateEnd,
                setUserCardDateEnd
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export {UserProvider, UserContext};
