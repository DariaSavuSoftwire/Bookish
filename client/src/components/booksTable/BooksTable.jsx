import {Table, TableWrapper, Td, Th, Tr} from "./BooksTableComponents";

const BooksTable = ({books}) => {
    return (<TableWrapper>
        <Table>
            <thead>
            <tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Owned Copies</Th>
                <Th>Available Copies</Th>
                <Th></Th>
                <Th></Th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <Tr key={book.id}>
                    <Td>{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.genre}</Td>
                    <Td>{book.year}</Td>
                </Tr>
            ))}
            </tbody>
        </Table>
    </TableWrapper>)
}

export default BooksTable;