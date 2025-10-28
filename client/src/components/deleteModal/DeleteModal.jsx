import {Button, ButtonsWrapper, Error, Label, ModalBox} from "./DeleteModalComponents";
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";

const DeleteModal = ({book, isOpen, onClose, onConfirm, error}) => {
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const handleConfirmClick = () => {
        onConfirm(book.book_id);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
        >
            <ModalBox >
                <Label>Are you sure you want to delete this book?</Label>
                <ButtonsWrapper>
                    <Button onClick={handleConfirmClick}>Confirm</Button>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                </ButtonsWrapper>
                {errorMessage &&
                    <Error>{errorMessage}</Error>}
            </ModalBox>
        </Modal>
    )
}

export default DeleteModal;