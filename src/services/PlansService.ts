import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetPlans = (callback: (data:any) => void) => {
  ApiInstance.get(apiEndpoint.plans.getPlans).then(async (res) => {
    const data = await handleResponse(res as any);
    console.log("RESPON PLANS", data)
    return callback(data);
  });
};



export default { handleGetPlans };
