import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const getAllNotifications = (callBack: (data:any) => void) => {
  ApiInstance.get(apiEndpoint.notifications.getAllNotifications).then((res) => {
    const data = handleResponse(res as any);
    return callBack(data);
  });
};
const readAllNotifications = (callBack: (data:any) => void) => {
  ApiInstance.get(apiEndpoint.notifications.readAllNotifications).then(
    (res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    }
  );
};
export default { getAllNotifications, readAllNotifications };
