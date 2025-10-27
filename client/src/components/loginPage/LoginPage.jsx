import {useEffect, useState} from "react";
import {useAuth} from "../authorization/AuthProvider";
import {useNavigate} from "react-router-dom";
import {
    LoginWrapper,
    LoginForm,
    LoginInput,
    LoginButton,
    LoginTitle,
    RegisterText,
    RegisterLink, Error
} from "./LoginComponents";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [toRegister, setToRegister] = useState(false);
    const {login, register, error: loginError, errorType} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            console.log("All fields are required");
            setError("All fields are required");
            return;
        }
        await login(username, password);
        navigate('/home');
    }

    const handleRegister = async () => {
        if (!username || !password || !name) {
            console.log("All fields are required");
            setError("All fields are required");
            return;
        }
        await register(username, name, password);
        navigate('/home');
    }

    useEffect(() => {
        if (!loginError)
            return;
        setToRegister(errorType === "register");
        setError(loginError);
    }, [loginError, errorType]);

    const resetForm = () => {
        setError("");
        setName("");
        setPassword("");
        setError("");
    }

    return (
        <LoginWrapper>
            <LoginTitle>Welcome to Bookish</LoginTitle>
            <LoginForm>
                <LoginInput
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                {toRegister &&
                    <LoginInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                }
                <LoginInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {toRegister ?
                    <><LoginButton onClick={handleRegister}>Register</LoginButton>
                        <RegisterText>
                            Already have an account?
                            <RegisterLink onClick={() => {
                                resetForm();
                                setToRegister(false);
                            }}>Login now</RegisterLink>
                        </RegisterText>
                        {error &&
                            <Error>{error}</Error>}</>
                    :
                    <>
                        <LoginButton onClick={handleLogin}>Login</LoginButton>
                        <RegisterText>
                            Don’t have an account?
                            <RegisterLink onClick={() => {
                                resetForm();
                                setToRegister(true);
                            }}>Register now</RegisterLink>
                        </RegisterText>
                        {
                            error &&
                            <Error>{error}</Error>
                        }
                    </>
                }
            </LoginForm>
        </LoginWrapper>
    )
}

export default LoginPage;
