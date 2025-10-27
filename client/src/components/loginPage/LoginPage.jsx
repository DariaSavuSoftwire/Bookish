import {useState} from "react";
import {useAuth} from "../authorization/AuthProvider";
import {useNavigate} from "react-router-dom";
import {
    LoginWrapper,
    LoginForm,
    LoginInput,
    LoginButton,
    LoginTitle,
    RegisterText,
    RegisterLink
} from "./LoginComponents";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            console.log("Username or password is required");
            return;
        }
        await login(username, password);
        navigate('/home');
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
                <LoginInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoginButton onClick={handleLogin}>Login</LoginButton>
                <RegisterText>
                    Don’t have an account?
                    <RegisterLink href='/register'>Register now</RegisterLink>
                </RegisterText>
            </LoginForm>
        </LoginWrapper>
    )
}

export default LoginPage;
