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
    const [errorType, setErrorType] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState(false);
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
            const response = await userLogin(username, password);
            setUser(username);
            setToken(response.token);
            localStorage.setItem("bookish_token", response.token);
            setError("");
            setErrorType("")
            setIsAdmin(response.role === "ADMIN");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setErrorType("login");
        }
    }

    const register = async (username, name, password) => {
        try {
            const response = await userRegister(username, name, password);
            setUser(username);
            setToken(response.token);
            localStorage.setItem("bookish_token", response.token);
            setError("")
            setErrorType("")
            setIsAdmin(response.role === "ADMIN");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setErrorType("register");
        }
    }


    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("bookish_token");
        navigate("/login");
    }

    return <AuthContext.Provider value={{token, user, login, register, logout, isAdmin, error, errorType}}>{children}
    </AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
}