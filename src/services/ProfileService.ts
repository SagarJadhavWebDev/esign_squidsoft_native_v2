import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleUpdateProfile = (
  payload: any,
  toast: any,
  callback: (data: any) => void
) => {
  ApiInstance.postForm(apiEndpoint.profile.updateProfile, payload)
    .then(async (res) => {
      console.log("UPDATE RES", res);
      const data = await handleResponse(res as any, toast);
      return callback(data);
    })
    .catch((err) => {
      console.log("UPDATE ERR", err);
      return callback(false);
    });
};

const handleChangePassword = (
  payload: any,
  toast: any,
  callback: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.profile.changePassword, payload)
    .then(async (res) => {
      const data = await handleResponse(res as any, toast);
      return callback(data);
    })
    .catch((err) => {
      return callback(false);
    });
};

const ProfileService = () => {
  return { handleUpdateProfile, handleChangePassword };
};

export default { ProfileService, handleUpdateProfile, handleChangePassword };
