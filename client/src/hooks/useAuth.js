import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext();

const useLocalStorage = function (keyName, defaultValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = localStorage.getItem(keyName);
            if(value) {
                // sets storedValue to Value, which consecuently sets 'user' value in AuthProvider
                return JSON.parse(value);
            } else {
                // defaultValue is null initially
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (error) {
            return defaultValue;
        }
    });

    // setValue === setUser
    const setValue = function (newValue) {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (error) {
            console.log(error);
        }
        setStoredValue(newValue);
    }

    return [storedValue, setValue];
}

export function AuthProvider({ children }){
    // const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);

    // call this function to authenticate the user
    const login = async(token) => {
        // console.log(token);
        // setUser(user);
        setToken(token);
    };

    const logout = () => {
        // setUser(null);
        setToken(null);
    };    

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}