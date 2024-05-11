import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import {
  resetErrorAction,
  resetSuccessAction,
} from '../globalActions/globalActions';
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create category action
export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, file } = payload;
      //fromData
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', file);

      //token extraction for auhenticate
      console.log(getState());
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //make reqest
      const { data } = await axios.post(
        `${baseURL}/categories`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch categories
export const fetchCategoryAction = createAsyncThunk(
  'category/fetch All',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //token extraction for auhenticate
      console.log(getState());
      // const token = getState().users?.userAuth?.userInfo?.token;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      //make reqest
      const { data } = await axios.get(`${baseURL}/categories`);
      console.log(data, 'dats');
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// create slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all
    builder.addCase(fetchCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action?.payload;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.error = action.payload;
    });

    //Reset err
    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });
    //Reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
