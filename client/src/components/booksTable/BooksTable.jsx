import {Table, TableButton, TableWrapper, Td, Th, Tr} from "./BooksTableComponents";
import {useAuth} from "../authorization/AuthProvider";
import {useEffect, useState} from "react";

const BooksTable = ({books}) => {
    const {isAdmin} = useAuth();
    const [displayedBooks, setDisplayedBooks] = useState([]);

    const [sortedColumnStatus, setSortedColumnStatus] = useState({key: null, direction: 'ascending'});
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


    return (<TableWrapper>
        <Table>
            <thead>
            <tr>
                <Th onClick={() => sortByKey('book_title')}>Title{getSortIndicator('book_title')}</Th>
                <Th onClick={() => sortByKey('authors')}>Author(s){getSortIndicator('authors')}</Th>
                <Th onClick={() => sortByKey('copies_owned')}>Owned Copies{getSortIndicator('copies_owned')}</Th>
                <Th onClick={() => sortByKey('copies_available')}>Available
                    Copies{getSortIndicator('copies_available')}</Th>
                <Th onClick={() => sortByKey('return_date')}>Next Return Date{getSortIndicator('return_date')}</Th>
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
                        {isAdmin && <TableButton>Edit</TableButton>}
                        <TableButton>Loan</TableButton>
                    </Td>
                </Tr>
            ))}
            </tbody>
        </Table>
    </TableWrapper>)
}

export default BooksTable;