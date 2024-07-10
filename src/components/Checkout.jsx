import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
export default function Checkout() {
  useEffect(() => {
    toast.success("Đã thanh toán thành công");
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        SHOPPING CART
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        There is no product in your cart
      </Typography>
      <Link to="/">
        <Button sx={{ mt: 2 }} variant="contained">
          Go Home
        </Button>
      </Link>
      <ToastContainer />
    </Box>
  );
}
