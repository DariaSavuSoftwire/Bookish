import React, {useEffect} from "react";
import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {userLogin, userRegister} from "../ApiService";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(localStorage.getItem("bookish_token") || "");
    const [error, setError] = React.useState("");
    const [isRegisterPage, setIsRegisterPage] = React.useState(false);
    const navigate = useNavigate();

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const expiry = decoded.exp;
            const now = Date.now() / 1000;
            return expiry < now;
        } catch (e) {
            console.error("Invalid token:", e);
            return true;
        }
    }


    useEffect(() => {
        console.log(token);
        if (!token)
            return;
        if (isTokenExpired(token)) {
            setUser(null);
            setToken("");
            localStorage.removeItem("bookish_token");
            return;
        }
        navigate('/home');

    }, [token, navigate]);

    const login = async (username, password) => {
        try {
            const token = await userLogin(username, password);
            setUser(username);
            setToken(token);
            localStorage.setItem("bookish_token", token);
            setError("");
            setIsRegisterPage(false);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setIsRegisterPage(false);
        }
    }

    const register = async (username, name, password) => {
        try {
            const token = await userRegister(username, name, password);
            setUser(username);
            setToken(token);
            localStorage.setItem("bookish_token", token);
            setError("")
            setIsRegisterPage(true);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setIsRegisterPage(true);
        }
    }


    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("bookish_token");
        navigate("/login");
    }

    return <AuthContext.Provider value={{token, user, login, register, logout, error, isRegisterPage}}>{children}
    </AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
}