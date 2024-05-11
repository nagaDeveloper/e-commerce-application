import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/userSlice';
import productReducer from '../slices/products/productSlices';
import categoryReducer from '../slices/categories/categorySlices';
import colorsReducer from '../slices/categories/colorsSlice';
import brandsReducer from '../slices/categories/brandsSlice';
//creating store

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
  },
});

export default store;
