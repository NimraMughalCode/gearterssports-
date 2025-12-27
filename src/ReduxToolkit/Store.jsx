import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./TestSlice";
import CategoriesReducer from "./CategoriesSlice";
import productsReducer from "./ProductsSlice";

const store = configureStore({
  reducer: {
    test: testReducer,
    categories: CategoriesReducer,
    products: productsReducer,
  },
});

export default store;
