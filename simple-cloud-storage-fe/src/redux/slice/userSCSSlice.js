/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const userSCSSlice = createSlice({
  name: 'userSCSSlice',
  initialState: {
    state: {
      isFetching: false,
    },
    userSCSData: {
      isAuthenticated: false,
      accessToken: '',
      errorMessage: '',
      email: '',
      name: '',
      userId: '',
    },
  },
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    setIsUserAuthenticated: (state, action) => {
      state.userSCSData = { ...state.userSCSData, ...action.payload?.loginInfo?.data?.userData };
      state.userSCSData.errorMessage = "";
      state.userSCSData.isAuthenticated = true;
      state.userSCSData.accessToken = action.payload?.loginInfo?.data?.accessToken;
      console.log("User is authenticated", action);
    },
    setErrorMessage: (state, action) => {
      state.userSCSData = { ...state.userSCSData };
      state.userSCSData.errorMessage = action.payload.errorMessage;
    }
  },
});

export const { setIsFetching, setIsUserAuthenticated, setErrorMessage } =
  userSCSSlice.actions;

export default userSCSSlice.reducer;
