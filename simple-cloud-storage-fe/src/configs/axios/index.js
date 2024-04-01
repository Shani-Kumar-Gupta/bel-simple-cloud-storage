import axios from 'axios';
import store from '../../redux/store';
import { isEmpty } from 'lodash';
import {setErrorMessage, setIsUserAuthenticated } from '../../redux/slice/userSCSSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/simple-cloud-storage/v1/',
});

axiosInstance.interceptors.request.use((config) => {
  if (isEmpty(config.headers) || isEmpty(config.headers.Authorization)) {
    const { simpleCloudStorage } = store.getState();
    config.headers.Authorization = simpleCloudStorage.userSCSData.accessToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response", response);
    store.dispatch(setIsUserAuthenticated({
      loginInfo: response
    }));
    return response;
  },
  (error) => {
    if (error) {
      store.dispatch(setErrorMessage(
        {
          errorMessage: error.message || ""
        }
      ));
      return error;
    }
  }
);

export default axiosInstance;
