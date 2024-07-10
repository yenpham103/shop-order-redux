import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_API } from "../../utils/urlUtils";

export const getProducts = createAsyncThunk(
  "getProducts",
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${SERVER_API}/products?limit=${limit}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "getProduct",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_API}/products/${_id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
