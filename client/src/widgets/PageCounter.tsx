import { Pagination } from "@mui/material";
import { FunctionComponent } from "react";

interface PageCounterProps {
    count: number
    page: number
    setPage: Function
}
 
const PageCounter: FunctionComponent<PageCounterProps> = ({count, page, setPage}) => {
  return (
    <>
    <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{
          mt: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </>
)}
 
export default PageCounter;