import {useState} from "react";
import {useAuth} from "../authorization/AuthProvider";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const authentication = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            console.log("Username or password is required");
            return;
        }
        await authentication.login(username, password);
        navigate('/home');
    }

    return (
        <div>
            <input
                type="string"
                id="username"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginPage;