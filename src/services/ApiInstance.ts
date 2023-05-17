import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiConfig from "../constants/ApiConfig";
import SP from "../types/LocalStorageType";
const ApiInstance = axios.create({
  baseURL: ApiConfig.API_URL,
  timeout: 30 * 1000, // API request timeout set to 30s
});
// abort duplicate request
// const pending = {};
// const CancelToken = axios.CancelToken;
// const removePending = (config: any, f?: any) => {
//   // make sure the url is same for both request and response
//   const url = config?.url?.replace(config?.baseURL, "/");
//   // stringify whole RESTful request with URL params
//   const flagUrl =
//     url + "&" + config?.method + "&" + JSON.stringify(config?.params);
//   if (flagUrl in pending) {
//     if (f) {
//       f(); // abort the request
//     } else {
//       //@ts-ignore
//       delete pending[flagUrl];
//     }
//   } else {
//     if (f) {
//       //@ts-ignore
//       pending[flagUrl] = f; // store the cancel function
//     }
//   }
// };
ApiInstance.interceptors.request.use(
  async function (config) {
    const token = (await AsyncStorage.getItem(SP.AUTHTOKEN)) as any;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    // you can apply cancel token to all or specific requests
    // e.g. except config.method == 'options'
    // config.cancelToken = new CancelToken((c) => {
    //   removePending(config, c);
    // });
    return config;
  },
  function (error) {
    // Do something with request error
    return null; // Promise.reject(error);
  }
);

// Add a response interceptor
ApiInstance.interceptors.response.use(
  function (response) {
    // removePending(response.config);
    return response;
  },
  async function (error) {
    console.log("API ERROR CODES", error);
    if (error?.response?.status === 401) {
      console.log("API ERROR CODES", error);
      // toast.error(error?.response?.data?.message ?? error?.message);
      // localStorage.removeItem("token");
      const token = (await AsyncStorage.getItem(SP.AUTHTOKEN)) as any;
      AsyncStorage.removeItem(SP.AUTHTOKEN, token);
      //window.location.replace(UnProtectedRoutes.SIGNIN);
      return null;
    }
    // removePending(error.config);
    if (!axios.isCancel(error)) {
      //toast.error(error?.response?.data?.message);
      return null; //Promise.reject(error);
    } else {
      // return empty object for aborted request
      console.log("API ERROR CODES", error);
      return null; //Promise.resolve({});
    }
  }
);

export default ApiInstance;
