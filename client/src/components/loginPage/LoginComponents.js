import styled from "styled-components";

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
`;

export const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    width: 320px;
    text-align: center;
`;

export const LoginTitle = styled.h1`
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-top: 25vh;
    margin-bottom: 10vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
`;

export const LoginInput = styled.input`
    padding: 12px 16px;
    margin: 10px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;

    &:focus {
        border-color: #6b73ff;
        box-shadow: 0 0 5px rgba(107, 115, 255, 0.3);
    }
`;

export const LoginButton = styled.button`
    padding: 12px 16px;
    margin-top: 20px;
    background-color: #6b73ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #5a63e8;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;
export const RegisterText = styled.p`
    margin-top: 15px;
    font-size: 14px;
    color: #555;
    text-align: center;
`;

export const RegisterLink = styled.a`
    color: #6b73ff;
    cursor: pointer;
    font-weight: bold;
    margin-left: 5px;

    &:hover {
        text-decoration: underline;
    }
`;

