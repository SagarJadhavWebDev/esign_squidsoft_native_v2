import { isEmpty, lowerCase } from "lodash";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import BackgroundWave2 from "../assets/svg/BackgroundWave2";
import IndeterminateProgressBar from "../components/atoms/IndeterminateProgressBar";
import WFullInputField from "../components/atoms/WFullInputField";
import WFullBlackButton from "../components/molecules/WFullBlackButton";
import routes from "../constants/routes";
import AuthController from "../controllers/AuthController";
import useAuth from "../utils/auth";
import CommonUtils from "../utils/CommonUtils";
import GetSvg from "../utils/GetSvg";
import ApiInstance from "../services/ApiInstance";
import apiEndpoint from "../constants/apiEndpoints";
import handleResponse from "../services/handleResponse";
import { useDispatch } from "react-redux";
interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { auth, SignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const useLoginFormState = () => {
    const [username, setUsername] = useState<any>("mobymat50@gmail.com");
    const [password, setPassword] = useState<any>("Sagar@8976");
    const [confirm_password, setConfirmPassword] = useState(null as any);
    const [isUsernameValid, setisUsernameValid] = useState(true);
    const [isPasswordValid, setisPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setisConfirmPasswordValid] = useState(true);
    const [userNameError, setuserNameError] = useState<any>(null);
    const [passwordError, setpasswordError] = useState<any>(null);
    const [confimPasswordError, setConfirmPasswordError] = useState<any>(null);

    const submit = (submitType: string, callback: Function) => {
      setisConfirmPasswordValid(true);
      setisPasswordValid(true);
      setisUsernameValid(true);
      setpasswordError(null);
      setuserNameError(null);
      setConfirmPasswordError(null);
      if (!CommonUtils.ValidateEmail(username)) {
        setisUsernameValid(false);
        setuserNameError("Please enter a valid email address");
        return;
      }

      if (submitType === "loadLogin" || submitType === "setPassword") {
        if (!CommonUtils.ValidatePassword(password)) {
          setisPasswordValid(false);
          setpasswordError("Please enter a valid password");
          return;
        }
        if (submitType === "setPassword") {
          if (!CommonUtils.ValidatePassword(confirm_password)) {
            setisConfirmPasswordValid(false);
            setConfirmPasswordError("Please enter a valid confirm password");
            return;
          }
          if (password !== confirm_password) {
            setisPasswordValid(false);
            setisConfirmPasswordValid(false);
            setpasswordError("Both password should match");
            setConfirmPasswordError("Both password should match");
            return;
          }
        }
      }

      switch (submitType) {
        case "profileCheck":
          if (!isEmpty(username)) {
            setIsLoading(true);
            AuthController.ProfileCheck(username)
              .then((result) => {
                //console.log("RESULT", result);
                if (result?.hasPassword) {
                  setIsLoading(false);
                  callback("loadLogin");
                } else if (result?.message) {
                  setIsLoading(false);
                  toast.show(result?.message, { type: "error" });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          break;
        case "loadLogin":
          if (!isEmpty(username) && !isEmpty(password)) {
            setIsLoading(true);
            ApiInstance.post(apiEndpoint.auth.login, {
              email: username,
              password: password,
            })
              .then(async (result) => {
                const data = await handleResponse(result as any, toast);
                // console.log("LOGIN",result);
                if (data) {
                  SignIn &&
                    SignIn(data?.token, () => {
                      setPassword(null);
                      setUsername(null);
                      dispatch(data?.user);
                      setIsLoading(false);
                      // navigation.navigate(routes.dashboard);
                    });
                } else {
                  setIsLoading(false);
                }
                // if (result?.message) {
                //   toast.show(result?.message, { type: "error" });
                //   setIsLoading(false);
                //   setPassword(null);
                // } else {
                //   setIsLoading(false);
                //   SignIn &&
                //     SignIn(result, () => {
                //       toast.show("Login successfully", { type: "success" });
                //       setPassword(null);
                //       setUsername(null);
                //       // navigation.navigate(routes.dashboard);
                //     });
                // }
              })
              .catch((err) => {
                setIsLoading(false);
              });
          }
          break;
        case "setPassword":
          if (
            !isEmpty(username) &&
            !isEmpty(password) &&
            !isEmpty(confirm_password)
          ) {
            setIsLoading(true);
            AuthController.SetPassword(username, password, confirm_password)
              .then((result) => {
                setPassword(null);
                setUsername(null);
                setConfirmPassword(null);
                setIsLoading(false);
                //console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          break;
        default:
          break;
      }
    };

    return {
      username: {
        value: username,
        set: setUsername,
        valid: isUsernameValid,
        error: userNameError,
      },
      password: {
        value: password,
        set: setPassword,
        valid: isPasswordValid,
        error: passwordError,
      },
      confirm_password: {
        value: confirm_password,
        set: setConfirmPassword,
        valid: isConfirmPasswordValid,
        error: confimPasswordError,
      },
      submit,
    };
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { username, password, confirm_password, submit } = useLoginFormState();
  const [loadComponent, setLoadComponent] = useState("loadLogin");

  return (
    <>
      <BackgroundWave2 className="w-full absolute" />
      <IndeterminateProgressBar
        loading={isLoading ?? false}
        innerColor="bg-white"
      />
      <SafeAreaView className="w-full h-full flex flex-col justify-evenly items-center p-4">
        <View className=" w-full flex flex-col justify-center items-center">
          <View className=" rounded-2xl bg-white shadow-2xl shadow-gray-500 p-2 m-8">
            <GetSvg name="SignInSquareIcon" />
          </View>
          <Text className="text-2xl font-black m-1 uppercase ">Sign In </Text>
          <Text className="text-sm opacity-30 font-semibold w-full text-center ">
            Access to your account
          </Text>
        </View>
        <View className=" w-full max-w-sm">
          {loadComponent === "loadLogin" ? (
            <>
              <WFullInputField
                placeholder={"Email"}
                onChangeText={(value) => {
                  username.set(value);
                }}
                className="text-base"
                value={username.value}
                error={!username.valid ? username.error : null}
                svgIcon1={<GetSvg name="userIcon" classN="w-5 h-5 m-auto" />}
              />
              {loadComponent === "loadLogin" ? (
                <>
                  <WFullInputField
                    secureTextEntry={!showPassword}
                    onChangeText={password.set}
                    value={password.value}
                    error={!password.valid ? password.error : null}
                    placeholder="Password"
                    autoFocus={true}
                    className="text-base w-11/12"
                    toggleIcon={!showPassword}
                    svgIcon1={
                      <GetSvg
                        name="eyeOpenIcon"
                        callBack={() => setShowPassword(!showPassword)}
                        classN="w-5 h-5 m-auto"
                      />
                    }
                    svgIcon2={
                      <GetSvg
                        name="eyeCloseIcon"
                        callBack={() => setShowPassword(!showPassword)}
                        classN="w-5 h-5 m-auto"
                      />
                    }
                  />
                  <Text
                    onPress={() => {
                      navigation.navigate(routes?.ForgotPassword);
                    }}
                    className="text-right my-3 text-xs text-blue-600 font-semibold"
                  >
                    Forgot Password
                  </Text>
                </>
              ) : (
                <></>
              )}

              <WFullBlackButton
                text={loadComponent === "loadLogin" ? "Sign In" : "Submit"}
                className="uppercase text-base"
                onPress={() => submit(loadComponent, setLoadComponent)}
              />
            </>
          ) : (
            <>
              <>
                <WFullInputField
                  className="text-base"
                  placeholder={"Username"}
                  onChangeText={username.set}
                  value={username.value}
                  error={!username.valid ? username.error : null}
                  svgIcon1={<GetSvg name="userIcon" classN="w-5 h-5 m-auto" />}
                />
                <WFullInputField
                  secureTextEntry={!showPassword}
                  onChangeText={password.set}
                  value={password.value}
                  error={!password.valid ? password.error : null}
                  placeholder="Password"
                  className="text-base w-11/12"
                  toggleIcon={!showPassword}
                  svgIcon1={
                    <GetSvg
                      name="eyeOpenIcon"
                      callBack={() => setShowPassword(!showPassword)}
                      classN="w-5 h-5 m-auto"
                    />
                  }
                  svgIcon2={
                    <GetSvg
                      name="eyeCloseIcon"
                      callBack={() => setShowPassword(!showPassword)}
                      classN="w-5 h-5 m-auto"
                    />
                  }
                />
                <WFullInputField
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={confirm_password.set}
                  value={confirm_password.value}
                  error={
                    !confirm_password.valid ? confirm_password.error : null
                  }
                  placeholder="Confirm Password"
                  className="text-base w-11/12"
                  toggleIcon={!showConfirmPassword}
                  svgIcon1={
                    <GetSvg
                      name="eyeOpenIcon"
                      callBack={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      classN="w-5 h-5 m-auto"
                    />
                  }
                  svgIcon2={
                    <GetSvg
                      name="eyeCloseIcon"
                      callBack={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      classN="w-5 h-5 m-auto"
                    />
                  }
                />
                <WFullBlackButton
                  text={"Sign In"}
                  className="uppercase text-base"
                  onPress={() => submit("setPassword", setLoadComponent)}
                />
              </>
            </>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.register);
            }}
          >
            <Text className="text-center my-3 text-sm font-semibold">
              Register / Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" w-full"></View>
      </SafeAreaView>
    </>
  );
};
export default Login;
