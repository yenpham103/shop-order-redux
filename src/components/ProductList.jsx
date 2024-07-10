import Product from "./Product";
import Box from "@mui/material/Box";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/middlewares/productMiddleware";
import Loading from "../components/Loading";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PaginationPage from "./Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = Number(searchParams.get("page") || 1);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products.listProduct);
  useEffect(() => {
    dispatch(getProducts({ limit: 16, page: currentPage }));
  }, [dispatch, currentPage]);

  const handleChangePage = useCallback(
    (page) => {
      setSearchParams({ page });
      navigate(`/product/?page=${page}`, { replace: true });
    },
    [navigate, setSearchParams]
  );

  if (status === "failed") {
    return (
      <>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Đã có lỗi xảy ra
        </Alert>
        <Loading />
      </>
    );
  }
  return (
    <>
      {status === "pending" ? (
        <Loading />
      ) : (
        status === "success" && (
          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Product />
            <PaginationPage
              onChangePage={handleChangePage}
              current={currentPage}
              sx={{ marginTop: 2 }}
            />
          </Box>
        )
      )}
    </>
  );
}
