import Checkout from "./components/Checkout";
import Cart from "./pages/Cart";
import CartDetail from "./pages/CartDetail";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";

const App = () => {
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
