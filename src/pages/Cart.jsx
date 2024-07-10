import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { formatVnd } from "../utils/formatter";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { addCart, clearCart } from "../redux/slices/cartSlice";
import { removeCart, deleteCart } from "../redux/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRedux = useSelector((state) => state.carts.items);
  const { data } = useSelector((state) => state.products.listProduct);
  const currentProducts = data?.data?.listProduct.filter((product) =>
    cartRedux.some((item) => item._id === product._id)
  );
  const productsWithRemainingQuantity = currentProducts?.map((product) => ({
    ...product,
    remainingQuantity:
      product.quantity -
      (cartRedux?.find((item) => item._id === product._id).quantity || 0),
  }));
  //
  const totalPrice = cartRedux.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleAddCart = (product) => {
    dispatch(addCart(product));
    toast.success("Đã thêm 1 sản phẩm");
  };
  const handleDeleteCart = (_id) => {
    dispatch(removeCart(_id));
    toast.warning("Đã xóa 1 sản phẩm");
  };
  const handleDeleteAllCart = (_id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không"
    );
    if (confirmDelete) {
      dispatch(deleteCart(_id));
      toast.error("Đã xóa thành công");
    }
  };

  const handleCheckOut = () => {
    localStorage.clear();
    dispatch(clearCart());
    navigate("/cart-checkout");
  };
  const handleGoToCartDetail = (_id) => {
    navigate(`/product-detail/${_id}`);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          p: 8,
        }}
      >
        {cartRedux.length === 0 ? (
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Cart Empty
          </Typography>
        ) : (
          cartRedux.map((product, index) => (
            <Card key={index} sx={{ width: "60%" }}>
              <CardMedia
                sx={{ cursor: "pointer" }}
                component="img"
                alt="green iguana"
                height="240"
                image={product.image}
                onClick={() => handleGoToCartDetail(product._id)}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.brand}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="black"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {formatVnd(product.price)}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 24,
                      color: "#c0392b",
                    }}
                  >
                    VND
                  </Typography>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: 24 }}
                >
                  Còn lại:
                  {productsWithRemainingQuantity?.[index].remainingQuantity}
                </Typography>
              </CardContent>

              <CardActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      onClick={() => handleDeleteCart(product._id)}
                      variant="contained"
                      size="small"
                    >
                      -
                    </Button>
                    <Button variant="contained" size="small">
                      {product.quantity}
                    </Button>
                    <Button
                      onClick={() => handleAddCart(product)}
                      variant="contained"
                      size="small"
                    >
                      +
                    </Button>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h6"
                      color="black"
                      sx={{
                        fontWeight: "bold",
                        fontSize: 24,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {formatVnd(product.price * product.quantity)}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          fontSize: 24,
                          color: "#c0392b",
                        }}
                      >
                        VND
                      </Typography>
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "red",
                        fontSize: 24,
                      }}
                      onClick={() => handleDeleteAllCart(product._id)}
                      startIcon={
                        <DeleteOutlineOutlinedIcon
                          sx={{
                            fontSize: 24,
                            ml: 1,
                          }}
                        />
                      }
                    />
                  </Box>
                </Box>
              </CardActions>
            </Card>
          ))
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Total: {formatVnd(totalPrice)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: 24,
                color: "#c0392b",
              }}
            >
              VND
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link to="/">
              <Button variant="contained">Go Home</Button>
            </Link>
            <Button
              disabled={cartRedux.length === 0}
              onClick={handleCheckOut}
              variant="contained"
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer position="bottom-right" />
    </>
  );
}
