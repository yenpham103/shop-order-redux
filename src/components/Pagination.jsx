import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export default function PaginationPage({ onChangePage, current }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSelector((state) => state.products.listProduct);
  const totalPage = data?.data?.totalPage || 1;
  useEffect(() => {
    if (currentPage !== 1) {
      onChangePage(currentPage);
    }
  }, [currentPage, onChangePage]);
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Pagination
        onChange={(e, page) => handleChangePage(page)}
        count={totalPage}
        page={current}
        boundaryCount={2}
        color="primary"
      />
    </>
  );
}
PaginationPage.propTypes = {
  onChangePage: PropTypes.func,
  current: PropTypes.number,
};
