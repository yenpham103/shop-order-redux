import Checkout from "./components/Checkout";
import Cart from "./pages/Cart";
import CartDetail from "./pages/CartDetail";
import HomePage from "./pages/HomePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const cartRedux = useSelector((state) => state.carts.items);
  const navigate = useNavigate();
  useEffect(() => {
    if (cartRedux.length === 0) {
      navigate("/");
      return;
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-detail/:id" element={<CartDetail />} />
        <Route path="/cart-checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
