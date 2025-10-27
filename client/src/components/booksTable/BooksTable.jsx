import {Table, TableWrapper, Td, Th, Tr} from "./BooksTableComponents";
import {useEffect} from "react";

const BooksTable = ({books}) => {
    return (<TableWrapper>
        <Table>
            <thead>
            <tr>
                <Th>Title</Th>
                <Th>Author(s)</Th>
                <Th>Owned Copies</Th>
                <Th>Available Copies</Th>
                <Th>Next Return Date</Th>
                <Th>Next User To Return</Th>
            </tr>
            </thead>
            <tbody>
            {books && books.map((book) => (
                <Tr key={book.book_id}>
                    <Td>{book.book_title}</Td>
                    <Td>{book.authors.join(', ')}</Td>
                    <Td>{book.copies_owned}</Td>
                    <Td>{book.copies_available}</Td>
                    <Td>{book.return_date ?? ""}</Td>
                    <Td>{book.user_to_return ?? ""}</Td>
                </Tr>
            ))}
            </tbody>
        </Table>
    </TableWrapper>)
}

export default BooksTable;