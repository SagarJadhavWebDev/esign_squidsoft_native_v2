import apiEndpoints from "../constants/apiEndpoints";
import { RegisterPayLoad } from "../screens/Register";
import { getAuthToken } from "../utils/auth";
import HttpService from "../utils/HttpService";

const ProfileCheck = async (email: string) => {
  const response = await HttpService.post(apiEndpoints.profileCheck, {
    body: JSON.stringify({
      domain: HttpService.getHostName(),
      email: email,
    }),
  });
  return response;
};

const Login = async (username: string, password: string) => {
  const response = await HttpService.post(apiEndpoints.login, {
    body: JSON.stringify({
      email: username,
      password: password,
      domain: HttpService.getHostName(),
    }),
  });
  return response;
};
const Register = async (payload: RegisterPayLoad) => {
  const response = await HttpService.post(apiEndpoints.register, {
    body: JSON.stringify(payload),
  });
  return response;
};

const SetPassword = async (
  username: string,
  password: string,
  confirm_password: string
) => {
  const response = await HttpService.post(apiEndpoints.setPassword, {
    body: JSON.stringify({
      email: username,
      password: password,
      password_confirmation: confirm_password,
    }),
  });
  return response;
};

const Logout = async () => {
  const response = await HttpService.delete(apiEndpoints.logout, {
    token: getAuthToken() as any,
  });
  return {};
};

const AuthController = {
  Login,
  Register,
  SetPassword,
  Logout,
  ProfileCheck,
};
export default AuthController;
