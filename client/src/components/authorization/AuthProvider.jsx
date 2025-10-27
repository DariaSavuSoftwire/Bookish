import React, {useEffect} from "react";
import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {userLogin, userRegister} from "../ApiService";
import {jwtDecode} from "jwt-decode";
import {AUTH_TOKEN_KEY, USER_ROLE_KEY} from "../Constants";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(localStorage.getItem(AUTH_TOKEN_KEY) || "");
    const [error, setError] = React.useState("");
    const [isRegisterPage, setIsRegisterPage] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(localStorage.getItem(USER_ROLE_KEY) === "ADMIN" || false);
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
        if (!token)
            return;
        if (isTokenExpired(token)) {
            setUser(null);
            setToken("");
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(USER_ROLE_KEY);
            return;
        }
        navigate('/home');

    }, [token, navigate]);

    const login = async (username, password) => {
        try {
            const response = await userLogin(username, password);
            setUser(username);
            setToken(response.token);
            localStorage.setItem(AUTH_TOKEN_KEY, response.token);
            localStorage.setItem(USER_ROLE_KEY, response.role);
            setIsAdmin(response.role === "ADMIN");
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
            const response = await userRegister(username, name, password);
            setUser(username);
            setToken(response.token);
            localStorage.setItem(AUTH_TOKEN_KEY, response.token);
            localStorage.setItem(USER_ROLE_KEY, response.role);
            setIsAdmin(response.role === "ADMIN");
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
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_ROLE_KEY);
        navigate("/login");
    }

    return <AuthContext.Provider
        value={{token, user, login, register, logout, isAdmin, error, isRegisterPage}}>{children}
    </AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
}