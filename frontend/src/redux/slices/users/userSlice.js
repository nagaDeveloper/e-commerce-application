import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL.js';
import { data } from 'autoprefixer';
//adding initialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

//login action
export const loginUserAction = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //http request for login
      const response = await axios.post(`${baseURL}users/login`, {
        email: payload?.email,
        password: payload?.password,
      });
      //storing user info in local storage
      localStorage.setItem('userInfo', JSON.stringify(response?.data));
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//users slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    //handle actions
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
  },
});

//reducers generation
const usersReducer = userSlice.reducer;

export default usersReducer;
