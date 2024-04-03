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

export const uploadBucketFiles = async (body, formData) => {
  try {
    const url = `file/uploadFiles?bucketName=${body.bucketName}&bucketId=${body.bucketId}&tags=${body.tags}`;
    let res = await axiosInstance.post(url, formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUploadedFiles = async (body) => {
  try {
    let url = `file/fetchUploadedFiles?bucketName=${body.bucketName}&bucketId=${body.bucketId}`;
    const res = await axiosInstance.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const downloadUploadedFiles = async (body, typeOfFile) => {
  try {
    let url = `file/download?bucketName=${body.bucketName}&bucketId=${body.bucketId}&fileName=${body.fileName}&originalFileName=${body.originalFileName}&contentType=${body.typeOfFile}`;
    let res = await axiosInstance.get(url);
    // console.log("Download", res?.data?.data, typeOfFile);
    // const blob = new Blob([res?.data?.data], { type: typeOfFile });
    // const blobUrl = window.URL.createObjectURL(blob);
    const fileName = body.originalFileName;
    let link = document.createElement('a');
    link.href = `data:${typeOfFile};base64,${res?.data?.data}`;
    link.download = fileName;
    link.click();
    // window.URL.revokeObjectURL(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
