import styled from "styled-components";
export const TableWrapper = styled.div`
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

export const Th = styled.th`
  background-color: #6b73ff;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 500;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f7f8ff;
  }
`;