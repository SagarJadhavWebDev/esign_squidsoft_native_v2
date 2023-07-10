import ApiConfig from "../constants/ApiConfig";
import SP from "../types/LocalStorageType";
import useAuth from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getHostName = () => {
  return "me";
};

const get = async (url: string, { token = "" }) => {
  var response = await fetch(ApiConfig.API_URL + url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json);

  return response;
};
const post = async (url: string, { body }: any) => {
  //console.log(ApiConfig.API_URL + url);
  const token = (await AsyncStorage.getItem(SP.AUTHTOKEN)) as any;
  var response = await fetch(ApiConfig.API_URL + url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: body,
  })
    .then((response) => response.json())
    .then((json) => json);
  return response;
};
const postFile = async (url: string, { formData }: any) => {
  const token = (await AsyncStorage.getItem(SP.AUTHTOKEN)) as any;
  var response = await fetch(ApiConfig.API_URL + url, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((json) => json);
  return response;
};
const uploadFiles = (
  url: any,
  { formData, token = "" }: any,
  onProgress: any
) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (e) =>
      onProgress(e.loaded / e.total)
    );
    xhr.addEventListener("load", () =>
      resolve({ status: xhr.status, body: xhr.responseText })
    );
    xhr.addEventListener("error", () =>
      reject(new Error("File upload failed"))
    );
    xhr.addEventListener("abort", () =>
      reject(new Error("File upload aborted"))
    );
    xhr.timeout = 1000 * 180; //3 minutes TimeOut Set

    xhr.open("POST", ApiConfig.API_URL + url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);

    xhr.send(formData);
  });
const putFile = async (url: string, { formData }: any) => {
  const token = (await AsyncStorage.getItem(SP.AUTHTOKEN)) as any;
  var response = await fetch(ApiConfig.API_URL + url, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((json) => json);
  return response;
};
const put = async (url: string, { body }: any) => {
  const token = (await AsyncStorage.getItem(SP.AUTHTOKEN)) as any;
  var response = await fetch(ApiConfig.API_URL + url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "PUT",
    body: body,
  })
    .then((response) => response.json())
    .then((json) => json);
  return response;
};
const deleteRequest = async (url: string) => {
  const token = (await AsyncStorage.getItem(SP.AUTHTOKEN)) as any;
  var response = await fetch(ApiConfig.API_URL + url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => json);
  return response;
};
const download = async (url: any, { token = "" }) => {
  var response = await fetch(ApiConfig.API_URL + url, {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "POST",
  })
    .then((res) => res.blob())
    .then((blob) => blob);

  return response;
};
const HttpService = {
  getHostName,
  get,
  post,
  postFile,
  uploadFiles,
  putFile,
  put,
  delete: deleteRequest,
  download,
};

export default HttpService;
