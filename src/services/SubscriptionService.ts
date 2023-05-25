import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetSubscription = (callBack: (data: any) => void) => {
  ApiInstance.get(apiEndpoint.subscriptions.getAllSubscriptions).then(
    async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    }
  );
};

const handlegetAllAddons = (callBack: (data: any) => void) => {
  ApiInstance.get(apiEndpoint.addOns.getAllAddons).then(async(res) => {
    const data = await handleResponse(res as any);
    return callBack(data);
  });
};

const SubscriptionService = {
  handleGetSubscription,
  handlegetAllAddons,
};

export default SubscriptionService;
