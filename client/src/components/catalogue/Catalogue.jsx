import React, {useCallback, useEffect, useState} from "react";
import {useAuth} from "../authorization/AuthProvider";
import {addBook, addUser, getAllBooks} from "../ApiService";
import BooksTable from "../booksTable/BooksTable";
import {
    AdminActions,
    Button,
    Content,
    Controls,
    Header,
    Input,
    Label,
    PageContainer,
    PaginationContainer,
    SearchBar,
    UserActions,
    Error, NavTitleButton, NavContainer
} from "./CatalogueComponents";
import AddEditModal from "../addEditModal/AddEditModal";
import {ADD_BOOK_MODAL, ADD_USER_MODAL} from "../Constants";
import AddUserModal from "../addUserModal/AddUserModal";
import {useNavigate} from "react-router-dom";

const Catalogue = () => {
    const {logout, isAdmin, token} = useAuth();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [elementsPerPage, setElementsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [titleFilter, setTitleFilter] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalError, setModalError] = useState("");

    const getBooks = useCallback(async () => {
        try {
            const response = await getAllBooks(token, elementsPerPage, currentPage, titleFilter, authorFilter);
            setBooks(response.books);
            const total = Math.ceil(response.metadata.total_elements / response.metadata.elements_per_page);
            setTotalPages(total);
            setError("");
        } catch (error) {
            setError(error.response.data.message);
        }
    }, [token, elementsPerPage, currentPage, titleFilter, authorFilter]);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalType(null);
        setModalError("");
    }

    const handleAddBookConfirm = async (book_id, title, authors, copies_owned) => {
        try {
            await addBook(token, book_id, title, authors, copies_owned);
            handleModalClose();
            await getBooks();
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleAddUserConfirm = async (name, username, role, password) => {
        try {
            await addUser(token, name, username, role, password);
            handleModalClose();
            await getBooks();
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    useEffect(() => {
        getBooks();
    }, [getBooks]);


    return (
        <PageContainer>
            {isModalOpen && modalType === ADD_BOOK_MODAL &&
                <AddEditModal
                    isOpen={isModalOpen}
                    error={modalError}
                    onClose={handleModalClose}
                    onConfirm={handleAddBookConfirm}
                />
            }
            {isModalOpen && modalType === ADD_USER_MODAL &&
                <AddUserModal
                    isOpen={isModalOpen}
                    error={modalError}
                    onClose={handleModalClose}
                    onConfirm={handleAddUserConfirm}
                />
            }
            <Header>
                <NavContainer>
                    <NavTitleButton
                        onClick={() => navigate('/home')}
                        isActive={false}
                    >
                        Your Books
                    </NavTitleButton>
                    <NavTitleButton
                        onClick={() => navigate('/catalogue')}
                        isActive={true}
                    >
                        All Books
                    </NavTitleButton>
                </NavContainer>
                <UserActions>
                    {isAdmin && (
                        <AdminActions>
                            <Button
                                onClick={() => {
                                    setModalType(ADD_BOOK_MODAL);
                                    setIsModalOpen(true);
                                }}>
                                Add Book
                            </Button>
                            <Button
                                onClick={() => {
                                    setModalType(ADD_USER_MODAL);
                                    setIsModalOpen(true);
                                }}>
                                Add User
                            </Button>
                        </AdminActions>
                    )}
                    <Button onClick={logout}>Logout</Button>
                </UserActions>
            </Header>

            <Controls>
                <SearchBar>
                    <Input
                        placeholder="Search by title..."
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                    />
                    <Input
                        placeholder="Search by author..."
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                    />
                </SearchBar>
                <div>
                    <Label htmlFor="elements-per-page">Items per page:</Label>
                    <Input
                        id="elements-per-page"
                        type="number"
                        value={elementsPerPage}
                        min={1}
                        variant="elements"
                        onChange={(e) => setElementsPerPage(Number(e.target.value))}
                    />
                </div>
            </Controls>

            <Content>
                <BooksTable books={books} onModalActionSuccess={getBooks}/>
            </Content>

            <PaginationContainer>
                <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}>
                    Next
                </Button>
            </PaginationContainer>
            {error && <Error>{error}</Error>}
        </PageContainer>
    );
};

export default Catalogue;