import apiEndpoints from "../constants/apiEndpoints";
import HttpService from "./HttpService";

const getUsdRate = (token: any, callBack: any) => {
  HttpService.get(apiEndpoints.getUSDRate, { token: token ?? "" }).then(
    (res) => {
      if (res) {
        callBack(res?.rate);
      }
    }
  );
};

export default getUsdRate;
