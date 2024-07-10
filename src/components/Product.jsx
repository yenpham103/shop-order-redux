import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PropTypes from "prop-types";
import { formatVnd } from "../utils/formatter";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Loading from "./Loading";
import { addCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
export default function Product() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.products.listProduct);
  const handleAddCart = (product) => {
    dispatch(addCart(product));
    toast.success("Add cart success");
  };
  return (
    <>
      {status === "pending" ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          {data?.data?.listProduct?.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ width: "100%" }}>
                <CardActionArea>
                  <Link to={`/product-detail/${product._id}`}>
                    <CardMedia
                      sx={{ p: 1 }}
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
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
                      <ShoppingCartOutlinedIcon
                        sx={{ color: "green", fontSize: 32 }}
                        onClick={() => handleAddCart(product)}
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
Product.propTypes = {
  product: PropTypes.object,
};
