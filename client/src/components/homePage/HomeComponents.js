import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 4rem);
    padding: 2rem;
    background-color: #f8f9fa;
    color: #333;
    overflow-y: auto;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: #343a40;
`;

export const UserActions = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const AdminActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
`;

export const SearchBar = styled.div`
    display: flex;
    gap: 1rem;
`;

export const Content = styled.main`
    flex-grow: 1;
`;

export const PaginationContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #6b73ff;
    color: white;
    &:hover {
        background-color: #5a63e8;
    }

    &:disabled {
        background-color: #ced4da;
        cursor: not-allowed;
    }
`;

export const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
`;

export const Label = styled.label`
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #495057;
`;