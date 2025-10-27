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

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await getAllBooks(token, currentPage, elementsPerPage, titleFilter, authorFilter);
                setBooks(response.books);
            } catch (error) {
                console.log(error);
            }
        }

        getBooks();
    }, [])

    return (
        <HomeDiv>
            {isAdmin && <>
                <Button>Add Book</Button>
                <Button>Delete Book</Button>
            </>
            }
            <BooksTable>
                {books}
            </BooksTable>
        </HomeDiv>
    );

}
export default HomePage;
