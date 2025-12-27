import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Hello from Gearter Sports Redux 🚀",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = testSlice.actions;
export default testSlice.reducer;
