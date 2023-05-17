import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetInvitations = (page:number, perPage:number, callBack: any) => {
  ApiInstance.get(
    apiEndpoint.invitationRequestes.RequestesList(page, perPage)
  ).then((res) => {
    const data = handleResponse(res as any);
    return callBack(data);
  });
};
const handleCancelInvitations = (id: number, callBack: any) => {
  ApiInstance.delete(apiEndpoint.invitationRequestes.cancelRequest(id)).then(
    (res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    }
  );
};

export default { handleGetInvitations, handleCancelInvitations };
