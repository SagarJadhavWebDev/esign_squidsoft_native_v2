import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const getUsdToInrService = (callBack: (data:any) => void) => {
  ApiInstance.get(apiEndpoint.utils.usdToInr).then((res) => {
    const data = handleResponse(res as any);
    return callBack(data);
  });
};

export default getUsdToInrService;
