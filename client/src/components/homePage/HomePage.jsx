import React, {useEffect} from "react";
import {
    HomeDiv,
    HomeTitleTag,
    HomeTitleContainer,
} from "./HomeComponents";
import {useAuth} from "../authorization/AuthProvider";
import {Button} from "reactstrap";
import {getAllBooks} from "../ApiService";

const HomePage = () => {
    const {logout, isAdmin} = useAuth();
    const [books, setBooks] = React.useState([]);
    const {token} = useAuth();

    useEffect(() => {
        async function getBooks() {
            try {
                const books = await getAllBooks(token);
                setBooks(books);
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
            <Table>
                books.map()
            </Table>
        </HomeDiv>
    );

}
export default HomePage;
