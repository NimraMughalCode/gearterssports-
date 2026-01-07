import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "@/app/utils/adminAPI";



/**
 * Async Thunk
 * Will NOT refetch if data already exists
 */
export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, { getState }) => {
    const { categories } = getState().categories;

    // Prevent duplicate API call
    if (categories.length > 0) {
        console.log("Not Refetching");
        
      return categories;
    }
console.log("fetching");

    const response = await getCategories();
    console.log("Got this response", response);
    
    return response;
  }
);

const TestSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    fetched: false, // important flag
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.fetched = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default TestSlice.reducer;
