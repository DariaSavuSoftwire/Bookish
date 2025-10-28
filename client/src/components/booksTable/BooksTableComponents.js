import styled from "styled-components";

export const TableWrapper = styled.div`
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: white;
`;

export const Th = styled.th`
    background-color: #6b73ff;
    color: white;
    padding: 15px;
    text-align: left;
    font-weight: 600; 
    font-size: 0.9rem;
`;

export const Td = styled.td`
    padding: 15px;
    border-bottom: 1px solid #eee;
    color: #333;
`;

export const Tr = styled.tr`
    &:last-of-type {
        td {
            border-bottom: none; 
        }
    }

    &:hover {
        background-color: #f7f8ff;
    }
`;
export const TableButton = styled.button`
    padding: 0.5rem 1rem;
    margin-left: 5px;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
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
