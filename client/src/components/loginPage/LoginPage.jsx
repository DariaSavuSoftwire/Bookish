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
import {loginSchema, registerSchema} from "../Schemas";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [toRegister, setToRegister] = useState();
    const {login, register, error: loginError, isRegisterPage} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await loginSchema.validate({username: username, password: password}, {abortEarly: false});
            await login(username, password);
            navigate('/home');
        } catch (error) {
            if (error.name === "ValidationError") {
                setErrorMessage(error.errors.join(", "));
            }
        }
    }

    const handleRegister = async () => {
        try {
            await registerSchema.validate({username: username, name: name, password: password}, {abortEarly: false});
            await register(username, name, password);
            navigate('/home');
        } catch (error) {
            if (error.name === "ValidationError") {
                setErrorMessage(error.errors.join(", "));
            }
        }

    }

    useEffect(() => {
        if (!loginError)
            return;
        setToRegister(isRegisterPage);
        setErrorMessage(loginError);
    }, [loginError, isRegisterPage]);

    const resetForm = () => {
        setErrorMessage("");
        setName("");
        setPassword("");
        setErrorMessage("");
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
                {toRegister ? (
                    <div>
                        <LoginButton onClick={handleRegister}>Register</LoginButton>

                        <RegisterText>
                            Already have an account?
                            <RegisterLink
                                onClick={() => {
                                    resetForm();
                                    setToRegister(false);
                                }}
                            >
                                Login now
                            </RegisterLink>
                        </RegisterText>

                        {errorMessage && <Error>{errorMessage}</Error>}
                    </div>
                ) : (
                    <div>
                        <LoginButton onClick={handleLogin}>Login</LoginButton>

                        <RegisterText>
                            Don’t have an account?
                            <RegisterLink
                                onClick={() => {
                                    resetForm();
                                    setToRegister(true);
                                }}
                            >
                                Register now
                            </RegisterLink>
                        </RegisterText>

                        {errorMessage && <Error>{errorMessage}</Error>}
                    </div>
                )}
            </LoginForm>
        </LoginWrapper>
    )
}

export default LoginPage;
