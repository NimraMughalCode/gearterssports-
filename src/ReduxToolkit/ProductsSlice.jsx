import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "@/app/utils/adminAPI";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { getState }) => {
    const { fetched, products } = getState().products;

    // ✅ HARD GUARD (prevents refetch)
    if (fetched && products.length > 0) {
      console.log("Products already fetched");
      return products;
    }

    console.log("Fetching Products");
    const data = await getProducts();
    console.log("Products fetched", data);
    return data;
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.fetched = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ProductsSlice.reducer;
