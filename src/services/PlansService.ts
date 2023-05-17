import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetPlans = (callback: (data:any) => void) => {
  ApiInstance.get(apiEndpoint.plans.getPlans).then((res) => {
    const data = handleResponse(res as any);
    console.log("RESPON PLANS", data)
    return callback(data);
  });
};



export default { handleGetPlans };
