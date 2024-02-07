import React from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const {isAuthenticated} = React.useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children;
};

export {ProtectedRoute};
