import React, {useEffect} from "react";
import {
    HomeDiv
} from "./HomeComponents";
import {useAuth} from "../authorization/AuthProvider";
import {Button} from "reactstrap";
import {getAllBooks} from "../ApiService";
import BooksTable from "../booksTable/BooksTable";

const HomePage = () => {
    const {logout, isAdmin} = useAuth();
    const [books, setBooks] = React.useState([]);
    const [elementsPerPage, setElementsPerPage] = React.useState(5);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [titleFilter, setTitleFilter] = React.useState("");
    const [authorFilter, setAuthorFilter] = React.useState("");
    const {token} = useAuth();

    async function getBooks() {
        try {
            const response = await getAllBooks(token, currentPage, elementsPerPage, titleFilter, authorFilter);
            console.log(response);
            setBooks(response.books);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBooks();
    }, [currentPage, elementsPerPage]);

    return (
        <HomeDiv>
            {isAdmin && <>
                <Button>Add Book</Button>
                <Button>Delete Book</Button>
            </>
            }
            <BooksTable books={books} />
        </HomeDiv>
    );

}
export default HomePage;
