import Container from "@mui/material/Container";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <Header />
        <ProductList />
        <ToastContainer position="bottom-right" />
      </Container>
    </>
  );
};

export default HomePage;
