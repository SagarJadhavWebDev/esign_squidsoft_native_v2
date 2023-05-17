import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleUpdateProfile = (payload: any, callback: (data:any) => void) => {
  ApiInstance.postForm(apiEndpoint.profile.updateProfile, payload)
    .then(async (res) => {
      // console.log("UPDATE RES", res,payload)
      const data = await handleResponse(res as any);
      return callback(data);
    })
    .catch((err) => {
      console.log("UPDATE ERR", err)
      return callback(false);
    });
};

const handleChangePassword = (payload: any, callback: (data:any) => void) => {
  ApiInstance.post(apiEndpoint.profile.changePassword, payload)
    .then((res) => {
      const data = handleResponse(res as any);
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
