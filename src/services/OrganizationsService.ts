import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleCreateOrganizations = (payload: any, callBack: any) => {
  ApiInstance.post(apiEndpoint.organizations.createOrganization, payload)
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};

const handleGetOrganizations = (callBack: any) => {
  ApiInstance.get(apiEndpoint.organizations.getOrganization)
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};

const handleUpdateOrganizations = (id: number, payload: any, callBack: any) => {
  ApiInstance.post(apiEndpoint.organizations.updateOrganization(id), payload)
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};

export default {
  handleCreateOrganizations,
  handleGetOrganizations,
  handleUpdateOrganizations,
};
