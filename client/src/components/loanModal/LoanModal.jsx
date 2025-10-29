import {Label, Input, InfoText, Button, ButtonsWrapper, Title, Error, ModalBox} from "./LoanModalComponents";
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";

const LoanModal = ({book, isOpen, onClose, onConfirm, error}) => {
    const [days, setDays] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const handleConfirmClick = () => {
        onConfirm(days);
    }

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
        >
            <ModalBox>
                <Title>Borrow a book</Title>
                <div>
                    <Label>Book title</Label>
                    <InfoText>{book.book_title}</InfoText>
                </div>
                <div>
                    <Label>Book author(s)</Label>
                    <InfoText>{book.authors.join(", ")}</InfoText>
                </div>
                <div>
                    <Label>Borrow for (days):</Label>
                    <Input
                        id="elements-per-page"
                        type="number"
                        min={1}
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                    />
                </div>
                <ButtonsWrapper>
                    <Button onClick={handleConfirmClick}>Confirm</Button>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                </ButtonsWrapper>
                {errorMessage && <Error>{errorMessage}</Error>}
            </ModalBox>
        </Modal>
    )
}

export default LoanModal;