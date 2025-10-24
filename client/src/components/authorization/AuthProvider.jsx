import React, {useEffect} from "react";
import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {userLogin} from "../ApiService";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(localStorage.getItem("bookish_token") || "");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token);
        if (token) {
            navigate('/home');
        }
    }, []);

    const login = async (username, password) => {
        try {
            const token = await userLogin(username, password);
            setUser(username);
            setToken(token);
            localStorage.setItem("bookish_token", token);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("bookish_token");
        navigate("/login");
    }

    return <AuthContext.Provider value={{token, user, login, logout}}>{children}
    </AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
}