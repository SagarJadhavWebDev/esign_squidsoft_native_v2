import ApiInstance from "./ApiInstance";
import apiEndpoint from "../constants/apiEndpoints";
import handleResponse from "./handleResponse";

const ResendVerifyLink = async (email: string, callback: any) => {
  ApiInstance.post(apiEndpoint.auth.resendEmail, { email })
    .then((response: any) => {
      const data = handleResponse(response as any);
      return callback(data);
    })
    .catch((err: any) => {
      return callback(false);
    });
};

const handleSendResetLink = (email: string, callback: (data: any) => void) => {
  ApiInstance.post(apiEndpoint.auth.sendForgotLink, {
    email,
  })
    .then((res: any) => {
      const data = handleResponse(res as any);
      return callback(data);
    })
    .catch((err: any) => {
      return callback(false);
    });
};

const handeleResetPassword = (payload: any, callback: (data: any) => void) => {
  ApiInstance.post(apiEndpoint.auth.forgotPassword, payload)
    .then((res: any) => {
      const data = handleResponse(res as any);
      return callback(data);
    })
    .catch((err: any) => {
      return callback(false);
    });
};

const handleGetProfile = (callback: (data: any) => void) => {
  ApiInstance.get(apiEndpoint.profile.getProfile)
    .then(async (res: any) => {
      const data = (await handleResponse(res as any)) as any;
      return callback(data?.user);
    })
    .catch((err: any) => {
      return callback(false);
    });
};

const AuthService = () => {
  return {
    ResendVerifyLink,
    handleSendResetLink,
    handeleResetPassword,
    handleGetProfile,
  };
};
export default {
  AuthService,
  ResendVerifyLink,
  handleSendResetLink,
  handeleResetPassword,
  handleGetProfile,
};
