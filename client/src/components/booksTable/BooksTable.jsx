import {Table, TableButton, TableWrapper, Td, Th, Tr} from "./BooksTableComponents";
import {useAuth} from "../authorization/AuthProvider";

const BooksTable = ({books}) => {
    const {isAdmin} = useAuth();
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
                <Th>Actions</Th>
            </tr>
            </thead>
            <tbody>
            {books && books.map((book) => (
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