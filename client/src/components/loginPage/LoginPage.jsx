import React, {Component, useState} from "react";
import {
    HomeDiv,
    HomeTitleTag,
    HomeTitleContainer,
} from "./HomeComponents";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Login clicked", username, password);
    };

    return (
        <HomeDiv>
            <HomeTitleContainer>
                <HomeTitleTag>Welcome to Our Library:</HomeTitleTag>
            </HomeTitleContainer>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
            <button>Register</button>
        </HomeDiv>
    );
};
