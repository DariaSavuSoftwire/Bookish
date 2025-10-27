import styled, {css} from "styled-components";

export const Title = styled.label`
    background-color: #6b73ff;
    color: white;
    padding: 15px;
    text-align: center;
    font-weight: 600; 
    font-size: 1.5rem;
    border-radius: 8px;
`;


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
    ${({ variant }) => variant === 'secondary' && css`
        background-color: #ced4da;
        color: black;

        &:hover {
            background-color: #ced4ea;
            transform: translateY(-2px);
        }

    `}
`;

export const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    text-align: left;
    width: 100%; 
    box-sizing: border-box;

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
    font-weight: 500;
`;

export const ButtonsWrapper=styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;
export const ModalContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(300px, 40vw, 500px);
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem; 
    
    > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem; 
    }
    
    span {
      padding: 0.75rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      background-color: #f8f9fa; 
      color: #495057;
    }
`;

export const InfoText = styled.span`
    display: block; 
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #f8f9fa;
    color: #495057;
    width: 100%;
    box-sizing: border-box; // Ensures padding doesn't affect final width
`;