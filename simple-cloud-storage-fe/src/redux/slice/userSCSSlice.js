/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: {
    isFetching: false,
  },
  userSCSData: {
    isAuthenticated: false,
    accessToken: '',
  },
};

const userSCSSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    setIsUserAuthenticated: (state, payload) => {
      state.userSCSData.isAuthenticated = true;
      state.userSCSData.accessToken = payload.accessToken;
    },
  },
});

const { setIsFetching, setIsUserAuthenticated } = userSCSSlice.actions;

export default userSCSSlice.reducer;
