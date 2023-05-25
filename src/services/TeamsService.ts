import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleCreateTeam = (payload: any, callBack: any) => {
  ApiInstance.post(apiEndpoint.teams.createTeam, payload)
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      callBack(false);
    });
};
const handleUpdateTeam = (id: number, payload: any, callBack: any) => {
  ApiInstance.put(apiEndpoint.teams.updateTeam(id), payload)
    .then( async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      callBack(false);
    });
};

const handleAddUser = (payload: any, toast: any, callBack: any) => {
  ApiInstance.post(apiEndpoint.teams.addUser, payload)
    .then(async (res) => {
      const data = await handleResponse(res as any, toast);
      return callBack(data ?? res);
    })
    .catch((err) => {
      callBack(false);
    });
};
const handleRemoveUser = (payload: any, callBack: any) => {
  ApiInstance.post(apiEndpoint.teams.removeUser, payload)
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      callBack(false);
    });
};

export default {
  handleCreateTeam,
  handleUpdateTeam,
  handleAddUser,
  handleRemoveUser,
};
