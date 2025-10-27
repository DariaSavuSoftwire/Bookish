import React from "react";
import LoginPage from "./loginPage/LoginPage";
import AuthProvider from "./authorization/AuthProvider";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import PrivateRoute from "./authorization/PrivateRoute";
import HomePage from "./homePage/HomePage";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/home" element={<HomePage/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
