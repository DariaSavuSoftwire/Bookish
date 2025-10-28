import React, {useEffect, useState} from "react";
import {useAuth} from "../authorization/AuthProvider";
import {getAllBooks} from "../ApiService";
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
    Title,
    UserActions,
} from "./HomeComponents";

const HomePage = () => {
    const {logout, isAdmin, token} = useAuth();
    const [books, setBooks] = useState([]);
    const [elementsPerPage, setElementsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [titleFilter, setTitleFilter] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await getAllBooks(token, elementsPerPage, currentPage, titleFilter, authorFilter);
                setBooks(response.books);
                const total = Math.ceil(response.metadata.total_elements / response.metadata.elements_per_page);
                setTotalPages(total);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };
        getBooks();
    }, [currentPage, elementsPerPage, token, titleFilter, authorFilter]);

    return (
        <PageContainer>
            <Header>
                <Title>All Books</Title>
                <UserActions>
                    {isAdmin && (
                        <AdminActions>
                            <Button>Add Book</Button>
                            <Button>Add User</Button>
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
                <BooksTable books={books}/>
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
        </PageContainer>
    );
};

export default HomePage;