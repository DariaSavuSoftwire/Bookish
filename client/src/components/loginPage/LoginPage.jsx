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
import {object, string} from 'yup';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [toRegister, setToRegister] = useState(false);
    const {login, register, error: loginError, errorType} = useAuth();
    const navigate = useNavigate();

    const loginSchema = object({
        username: string().required("Username is required"),
        password: string().required("Password is required"),
    });

    const registerSchema = object({
        username: string().required("Username is required"),
        name: string().required("Name is required"),
        password: string().required("Password is required"),
    });


    const handleLogin = async () => {
        try {
            await loginSchema.validate({username: username, password: password}, {abortEarly: false});
            await login(username, password);
            navigate('/home');
        } catch (error) {
            if (error.name === "ValidationError") {
                setError(error.errors.join(", "));
            }
        }
    }

    const handleRegister = async () => {
        try {
            await registerSchema.validate({username: username, password: password}, {abortEarly: false});
            await register(username, name, password);
            navigate('/home');
        } catch (error) {
            if (error.name === "ValidationError") {
                setError(error.errors.join(", "));
            }
        }

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

                        {error && <Error>{error}</Error>}
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

                        {error && <Error>{error}</Error>}
                    </div>
                )}
            </LoginForm>
        </LoginWrapper>
    )
}

export default LoginPage;
