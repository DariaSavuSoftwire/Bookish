import {Table, TableButton, TableWrapper, Td, Th, Tr} from "./BooksTableComponents";
import {useAuth} from "../authorization/AuthProvider";
import {useEffect, useState} from "react";
import LoanModal from "../loanModal/LoanModal";
import {deleteBook, editBook, loanBook} from "../ApiService";
import AddEditModal from "../addEditModal/AddEditModal";
import DeleteModal from "../deleteModal/DeleteModal";
import {DELETE_BOOK_MODAL, EDIT_BOOK_MODAL, LOAN_MODAL} from "../Constants";

const BooksTable = ({books, onModalActionSuccess}) => {
    const {isAdmin, token, username} = useAuth();
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [sortedColumnStatus, setSortedColumnStatus] = useState({key: null, direction: 'ascending'});
    const [error, setError] = useState("");

    const sortByKey = (key) => {
        const sortedBooks = [...books];
        const direction = sortedColumnStatus.key == null || sortedColumnStatus.key !== key
        || (sortedColumnStatus.key === key && sortedColumnStatus.direction === "descending") ? 'ascending' : 'descending';
        sortedBooks.sort((book1, book2) => {
            if (book2[key] === null || book1[key] < book2[key]) return direction === 'ascending' ? -1 : 1;
            if (book1[key] === null || book1[key] > book2[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setDisplayedBooks(sortedBooks);
        setSortedColumnStatus({key, direction});
    };

    useEffect(() => {
        setDisplayedBooks(books);
    }, [books])

    const getSortIndicator = (key) => {
        if (sortedColumnStatus.key !== key) return null;
        return sortedColumnStatus.direction === 'ascending' ? ' ▲' : ' ▼';
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalAction(null);
        setSelectedBook(null);
        setError("");
    }


    const handleConfirmLoan = async (days) => {
        try {
            await loanBook(token, username, selectedBook.book_id, days);
            onModalActionSuccess();
            handleModalClose();
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleConfirmEdit = async (book_id, title, authors, copies_owned) => {
        try {
            await editBook(token, book_id, title, authors, copies_owned);
            onModalActionSuccess();
            handleModalClose();
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleConfirmDelete = async (book_id) => {
        try {
            await deleteBook(token, book_id);
            onModalActionSuccess();
            handleModalClose();
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <>
            {isModalOpen && modalAction === LOAN_MODAL &&
                <LoanModal
                    book={selectedBook}
                    onConfirm={handleConfirmLoan}
                    isOpen={isModalOpen}
                    error={error}
                    onClose={handleModalClose}>
                </LoanModal>}
            {isModalOpen && modalAction === EDIT_BOOK_MODAL &&
                <AddEditModal book={selectedBook}
                              isOpen={isModalOpen}
                              onConfirm={handleConfirmEdit}
                              onClose={handleModalClose}
                              error={error}>
                </AddEditModal>}
            {isModalOpen && modalAction === DELETE_BOOK_MODAL &&
                <DeleteModal book={selectedBook}
                             isOpen={isModalOpen}
                             onConfirm={handleConfirmDelete}
                             onClose={handleModalClose}>
                </DeleteModal>}
            <TableWrapper>
                <Table>
                    <thead>
                    <tr>
                        <Th onClick={() => sortByKey('book_title')}>Title{getSortIndicator('book_title')}</Th>
                        <Th onClick={() => sortByKey('authors')}>Author(s){getSortIndicator('authors')}</Th>
                        <Th onClick={() => sortByKey('copies_owned')}>Owned
                            Copies{getSortIndicator('copies_owned')}</Th>
                        <Th onClick={() => sortByKey('copies_available')}>Available
                            Copies{getSortIndicator('copies_available')}</Th>
                        <Th onClick={() => sortByKey('return_date')}>Next Return
                            Date{getSortIndicator('return_date')}</Th>
                        <Th onClick={() => sortByKey('user_to_return')}>Next User To
                            Return{getSortIndicator('user_to_return')}</Th>
                        <Th>Actions</Th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedBooks && displayedBooks.map((book) => (
                        <Tr key={book.book_id}>
                            <Td>{book.book_title}</Td>
                            <Td>{book.authors.join(', ')}</Td>
                            <Td>{book.copies_owned}</Td>
                            <Td>{book.copies_available}</Td>
                            <Td>{book.return_date ?? "-"}</Td>
                            <Td>{book.user_to_return ?? "-"}</Td>
                            <Td>
                                {isAdmin &&
                                    <>
                                        <TableButton
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setModalAction(EDIT_BOOK_MODAL);
                                                setSelectedBook(book);
                                            }}>
                                            Edit
                                        </TableButton>
                                        <TableButton
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setModalAction(DELETE_BOOK_MODAL);
                                                setSelectedBook(book);
                                            }}>
                                            Delete
                                        </TableButton>
                                    </>
                                }
                                <TableButton onClick={() => {
                                    setIsModalOpen(true);
                                    setModalAction(LOAN_MODAL);
                                    setSelectedBook(book);

                                }} disabled={book.copies_available <= 0}
                                >
                                    Loan
                                </TableButton>
                            </Td>
                        </Tr>
                    ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </>
    )
}

export default BooksTable;