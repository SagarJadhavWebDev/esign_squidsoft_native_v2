import ApiInstance from "./ApiInstance";
import apiEndpoint from "../constants/apiEndpoints";
import handleResponse from "./handleResponse";

const ResendVerifyLink = async (email: string, toast: any, callback: any) => {
  ApiInstance.post(apiEndpoint.auth.resendEmail, { email })
    .then(async (response: any) => {
      const data = await handleResponse(response as any, toast);
      return callback(data);
    })
    .catch((err: any) => {
      return callback(false);
    });
};

const handleSendResetLink = (
  email: string,
  toast: any,
  callback: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.auth.sendForgotLink, {
    email,
  })
    .then(async (res: any) => {
      const data = await handleResponse(res as any, toast);
      return callback(data);
    })
    .catch(async (err: any) => {
      const data = await handleResponse(err as any, toast);
      return callback(false);
    });
};

const handeleResetPassword = (payload: any, callback: (data: any) => void) => {
  ApiInstance.post(apiEndpoint.auth.forgotPassword, payload)
    .then(async (res: any) => {
      const data = await handleResponse(res as any);
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
