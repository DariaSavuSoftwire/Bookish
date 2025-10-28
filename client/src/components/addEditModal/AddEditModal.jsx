import {Label, Input, Button, ButtonsWrapper, Title, Error, ModalBox} from "./AddEditModalComponents";
import Modal from '@mui/material/Modal';

import {useEffect, useState} from "react";
import CreatableSelect from "react-select/creatable";

const AddEditModal = ({book, isOpen, onClose, onConfirm, error}) => {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [copiesOwned, setCopiesOwned] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [isbn, setIsbn] = useState('');

    useEffect(() => {
        if (book) {
            setCopiesOwned(book.copies_owned);
            setAuthors(book.authors.map((author) => ({
                value: author, label: author
            })));
            setTitle(book.book_title);
            setIsbn(book.book_id);
        }
    }, [book])

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const handleConfirmClick = () => {
        const authorNames = authors.map(author => author.value);
        onConfirm(isbn, title, authorNames, copiesOwned);
    }
    const handleAuthorsChange = (newAuthors) => {
        setAuthors(newAuthors || []);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
        >
            <ModalBox>
                {book ?
                    <Title>Edit a book</Title>
                    :
                    <Title>Add a book</Title>
                }

                <div>
                    <Label>ISBN:</Label>
                    <Input
                        id="book-id"
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        disabled={!!book}
                    />
                </div>
                <div>
                    <Label>Book title</Label>
                    <Input
                        id="book-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Book author(s)</Label>
                    <CreatableSelect
                        isMulti
                        onChange={handleAuthorsChange}
                        value={authors}
                        placeholder="Add authors..."
                    />
                </div>
                <div>
                    <Label>Copies owned:</Label>
                    <Input
                        id="copies-owned"
                        type="number"
                        min={1}
                        value={copiesOwned}
                        onChange={(e) => setCopiesOwned(Number(e.target.value))}
                    />
                </div>
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

export default AddEditModal;