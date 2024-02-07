import React from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    // To states that will help us to know if the user is logged across the App
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [userLoginInfo, setUserLoginInfo] = React.useState({});
    const navigateLogin = useNavigate();

    // Function to be called when the user logged in successfully
    // set userLoginInfo with all the basic information we need
    const login = (idAccount, cardNumber, cardType, idATM) => {
        setIsAuthenticated(true);
        setUserLoginInfo({idAccount, cardNumber, cardType, idATM});
        // Redirecting the user to the menu
        navigateLogin("/menu");
    };

    const logout = () => {
        setIsAuthenticated(false);
        // We erase the userLoginInfo when the user is logged out
        // so a new user can log in, redirect the user to the login form
        setUserLoginInfo({});
        navigateLogin("/login");
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, userLoginInfo, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext};
