import axiosInstance from '../../configs/axios';

export const userLogin = async (body) => {
  try {
    const url = 'userAuth/login';
    let payload = {
      email: body.emailId,
      password: body.password,
    };
    const res = await axiosInstance.post(url, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const userSignup = async (body) => {
  try {
    const url = 'userAuth/signup';
    let payload = {
      name: body.fullName,
      email: body.emailId,
      password: body.password,
    };
    let res = await axiosInstance.post(url, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsersList = async (userId) => {
  try {
    const url = `userAuth/fetchUsersList/${userId}`;
    let res = await axiosInstance.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createBucket = async (body) => {
  try {
    const url = 'bucket/createBucket';
    const payload = {
      userId: body.userId,
      bucketName: body.bucketName,
      bucketSize: body.bucketSize,
      tags: body.tags ? body.tags?.split(',') : [],
    };
    let res = await axiosInstance.post(url, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBucketList = async () => {
  try {
    const url = `bucket/fetchBucketList`;
    let res = await axiosInstance.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBucketById = async (bucketId) => {
  try {
    const url = `bucket/fetchBucketById/${bucketId}`;
    let res = await axiosInstance.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
