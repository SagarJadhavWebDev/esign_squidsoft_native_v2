import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleCreateOrganizations = (payload: any, callBack: any) => {
  ApiInstance.postForm(apiEndpoint.organizations.createOrganization, payload)
    .then(async (res) => {
      const data =  await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};

const handleGetOrganizations = (callBack: any) => {
  ApiInstance.get(apiEndpoint.organizations.getOrganization)
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};

const handleUpdateOrganizations = (id: number, payload: any, callBack: any) => {
  ApiInstance.postForm(apiEndpoint.organizations.updateOrganization(id), payload)
    .then(async (res) => {
      const data = await handleResponse(res as any);
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
