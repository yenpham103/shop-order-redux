import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProduct } from "../middlewares/productMiddleware";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    listProduct: {
      data: [],
      status: "idle",
    },
    productDetail: {
      data: [],
      status: "idle",
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.listProduct.status = "pending";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.listProduct.data = action.payload;
      state.listProduct.status = "success";
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.listProduct.status = "failed";
    });

    // getProduct
    builder.addCase(getProduct.pending, (state) => {
      state.productDetail.status = "pending";
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productDetail.data = action.payload;
      state.productDetail.status = "success";
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.productDetail.status = "failed";
    });
  },
});
