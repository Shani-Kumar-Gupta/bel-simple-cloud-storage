import axiosInstance from '../../configs/axios';

export const userLogin = async (body) => {
  try {
    let url = 'userAuth/login';
    let payload = {
      email: body.emailId,
      password: body.password
    }
    const res = await axiosInstance.post(url, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
