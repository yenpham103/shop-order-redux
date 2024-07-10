import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatVnd } from "../utils/formatter";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { getProduct } from "../redux/middlewares/productMiddleware";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addCart } from "../redux/slices/cartSlice";
export default function CartDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.products.productDetail);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  const handleAddCart = () => {
    dispatch(addCart(data?.data));
  };

  return (
    <>
      {status === "pending" ? (
        <Loading />
      ) : (
        status === "success" && (
          <>
            <Header />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 8,
              }}
            >
              <Card
                sx={{
                  maxWidth: 600,
                  boxShadow: "0 1px 2px 3px rgba(0,0,0,0.24)",
                }}
              >
                <CardMedia
                  sx={{ height: 300 }}
                  image={data?.data?.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data?.data?.brand}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {data?.data?.name}
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
                    {formatVnd(data?.data?.price)}
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
                  <Typography variant="body2" color="text.secondary">
                    {data?.data?.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      sx={{ py: 1, px: 2 }}
                      variant="contained"
                      size="small"
                    >
                      Go Home
                    </Button>
                  </Link>
                  <Button
                    sx={{ py: 1, px: 2 }}
                    variant="contained"
                    size="small"
                    onClick={handleAddCart}
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </>
        )
      )}
    </>
  );
}
