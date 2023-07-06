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
import { setUser } from "../redux/reducers/userSlice";
import InputTextBox from "../components/atoms/InputTextBox";
import HttpService from "../controllers/HttpService";
interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { auth, SignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const useLoginFormState = () => {
    const [username, setUsername] = useState<any>();
    const [password, setPassword] = useState<any>();
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
            const payload = {
              email: username,
              password: password,
            };
            HttpService.post(apiEndpoint.auth.login, {
              body: JSON.stringify(payload),
            })
              .then((res) => {
                toast.hideAll();
                toast.show(res?.message, {
                  type: res?.success ? "success" : "error",
                });
                setIsLoading(false);
                if (res?.data) {
                  SignIn &&
                    SignIn(res?.data?.token, () => {
                      setPassword(null);
                      setUsername(null);
                      dispatch(setUser(res?.data?.user));
                      setIsLoading(false);
                      // navigation.navigate(routes.dashboard);
                    });
                }
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
  const [focusId, setFocusId] = useState("email");
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
              <InputTextBox
                editingState={focusId === "email"}
                placeholder={"Email"}
                onChangeText={(value) => {
                  username.set(value);
                }}
                onFocus={() => {
                  setFocusId("email");
                }}
                className="text-base"
                autoFocus
                value={username.value}
                onSubmitEditing={() => {
                  setFocusId("password");
                }}
                error={!username.valid ? username.error : null}
                svgIcon1={<GetSvg name="userIcon" classN="w-5 h-5 m-auto" />}
              />
              {loadComponent === "loadLogin" ? (
                <>
                  <InputTextBox
                    onFocus={() => {
                      setFocusId("password");
                    }}
                    editingState={focusId === "password"}
                    secureTextEntry={!showPassword}
                    onChangeText={password.set}
                    value={password.value}
                    error={!password.valid ? password.error : null}
                    placeholder="Password"
                    className="text-base w-11/12"
                    toggleIcon={!showPassword}
                    onSubmitEditing={() => {
                      submit(loadComponent, setLoadComponent);
                    }}
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
                <InputTextBox
                  editingState={focusId === "name"}
                  className="text-base"
                  placeholder={"Username"}
                  onChangeText={username.set}
                  value={username.value}
                  onPressIn={() => {}}
                  onSubmitEditing={() => {
                    setFocusId("password");
                  }}
                  error={!username.valid ? username.error : null}
                  svgIcon1={<GetSvg name="userIcon" classN="w-5 h-5 m-auto" />}
                />
                <InputTextBox
                  editingState={focusId === "password"}
                  secureTextEntry={!showPassword}
                  onChangeText={password.set}
                  value={password.value}
                  error={!password.valid ? password.error : null}
                  placeholder="Password"
                  onSubmitEditing={() => {
                    setFocusId("cpassword");
                  }}
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
                <InputTextBox
                  editingState={focusId === "cpassword"}
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={confirm_password.set}
                  value={confirm_password.value}
                  error={
                    !confirm_password.valid ? confirm_password.error : null
                  }
                  placeholder="Confirm Password"
                  className="text-base w-11/12"
                  onSubmitEditing={() => {
                    submit("setPassword", setLoadComponent);
                  }}
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
