import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);

    return (
        <AuthContext.Provider
            value={{
                currentUser: currentUser,
                setCurrentUser: setCurrentUser,
                isLoggedIn: isLoggedIn,
                setIsLoggedIn: setIsLoggedIn,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };