import Box from "@mui/material/Box";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const cartRedux = useSelector((state) => state.carts.items);
  const totalCartItem = cartRedux.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const handleGoToCart = () => {
    if (cartRedux.length === 0) return;
    navigate("/cart");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 4,
        px: 8,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#ecf0f1",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          sx={{ color: "black", "&:hover": { color: "#2ecc71" } }}
        >
          Order
        </Typography>
      </Link>

      <Button
        onClick={handleGoToCart}
        sx={{
          py: 1.25,
          px: 2.5,
        }}
        disabled={cartRedux.length === 0}
        startIcon={
          <ShoppingBasketOutlinedIcon
            sx={{ color: "white", cursor: "pointer" }}
            fontSize="large"
          />
        }
        variant="contained"
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "16px",
          }}
          variant="body2"
        >
          {totalCartItem}
        </Typography>
      </Button>
    </Box>
  );
};

export default Header;
