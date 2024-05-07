import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/userSlice';
import productReducer from '../slices/products/productSlices';
import categoryReducer from '../slices/categories/categorySlices';
//creating store

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
