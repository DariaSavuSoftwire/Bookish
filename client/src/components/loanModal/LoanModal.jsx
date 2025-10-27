import {Label, Input, InfoText, Button, ButtonsWrapper, Title} from "./LoanModalComponents"; // Import InfoText
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
};

const LoanModal = ({book, isOpen, onClose, onConfirm}) => {
    const [days, setDays] = useState(1);
    const handleConfirmClick = () => {
        onConfirm(days);
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
        >
            <Box sx={style}>
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
            </Box>
        </Modal>
    )
}

export default LoanModal;