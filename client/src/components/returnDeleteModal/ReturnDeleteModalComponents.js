import styled, {css} from "styled-components";
import {Box} from "@mui/material";

export const Button = styled.button`
    padding: 12px 16px;
    margin-top: 20px;
    background-color: #6b73ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #5a63e8;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    ${({variant}) => variant === 'secondary' && css`
        background-color: #ced4da;
        color: black;

        &:hover {
            background-color: #ced4ea;
            transform: translateY(-2px);
        }

    `}
`;

export const Label = styled.label`
    margin-right: 0.5rem;
    font-size: 1.5rem;
    color: #495057;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

export const Error = styled.div`
    background-color: #ffe5e5;
    color: #b00020;
    border: 1px solid rgba(176, 0, 32, 0.2);
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
    margin-top: 12px;
    width: 90%;
    text-align: center;
    box-shadow: 0 2px 6px rgba(176, 0, 32, 0.05);
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const ModalBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: white;
    padding: 2rem;
`;