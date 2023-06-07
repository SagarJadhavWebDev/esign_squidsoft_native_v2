import { isEmpty, lowerCase } from "lodash";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
import AuthService from "../services/AuthService";
import EmailSentCard from "./VerifyEmail/EmailSentCard";
interface ForgotPasswordProps {
  navigation: any;
  route: any;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  navigation,
  route,
}) => {
  const { auth, SignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);

  const toast = useToast();
  const [otp, setOtp] = useState<any>(null);
  const [passwordsValue, setPasswordsValue] = useState({
    email: null,
    token: null,
    password: null,
    password_confirmation: null,
  });

  const [showPasswordsValidation, setPasswordValidation] = useState({
    oneNumber: false,
    specialChar: false,
    lowerCase: false,
    eightChar: false,
    confirm_password: false,
    old_password: null,
  });
  useEffect(() => {
    const c = /^(?=.*[a-z])/;
    const lowerCase = c.test(passwordsValue?.password ?? "");
    const d = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const eightChar = d.test(passwordsValue?.password ?? "");
    const b = /^(?=.*\W)/;
    const specialChar = b.test(passwordsValue?.password ?? "");
    const p = /^(?=.*[0-9])/;
    const oneNumber = p.test(passwordsValue?.password ?? "");
    setPasswordValidation((prev: any) => ({
      ...prev,
      oneNumber: oneNumber,
      specialChar: specialChar,
      lowerCase: lowerCase,
      eightChar: eightChar,
      confirm_password:
        passwordsValue.password_confirmation === passwordsValue.password &&
        !isEmpty(passwordsValue.password) &&
        !isEmpty(passwordsValue.password_confirmation),
    }));
  }, [passwordsValue.password, passwordsValue.password_confirmation]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadComponent, setLoadComponent] = useState(
    route?.params?.token ? "" : "profileCheck"
  );
  const [email, setEmail] = useState<any>(null);

  const handleCheckUser = () => {
    setIsLoading(true);
    AuthService.handleSendResetLink(email, toast, () => {
      setIsLoading(false);
      navigation.navigate(routes.emailSent, {
        email: email,
        type: "FORGOT_PASSWORD",
      });
    });
  };

  const handleValidateOtp = () => {
    //console.log("OPT FUN");
    setIsLoading(true);
    AuthController.validateOtp(email, otp).then((res) => {
      // console.log("OPT FUN", res);
      if (!res?.status) {
        toast.show(res?.message, { type: "error" });
        setIsLoading(false);
      } else {
        toast.show(res?.message, { type: "success" });
        setLoadComponent("changePassword");
        setIsLoading(false);
      }
    });
  };
  const validated = Object.values(showPasswordsValidation).every(
    (i) => i !== false
  );
  const handleResetPassword = () => {
    if (validated) {
      setIsLoading(true);
     // console.log("passwordsValue",passwordsValue)
      // AuthController.ResetPassword(
      //   email,
      //   passwordsValue.password,
      //   passwordsValue.password_confirmation,
      //   otp
      // ).then((res) => {
      //   if (res?.status) {
      //     setIsLoading(false);
      //     toast.show(res?.message, { type: "success" });
      //     navigation.navigate(routes.login);
      //   } else {
      //     toast.show(res?.message, { type: "error" });
      //     setIsLoading(false);
      //   }
      // });
      AuthService.handeleResetPassword(passwordsValue, () => {
        navigation.navigate(routes.login);
        setIsLoading(false);
      });
    } else {
      toast.show("Please enter password in given format", { type: "error" });
     // console.log(showPasswordsValidation);
    }
  };
  useEffect(() => {
    if (!isEmpty(route?.params?.token)) {
      setPasswordsValue((prev: any) => ({
        ...prev,
        email: route?.params?.token
          ?.slice(route?.params?.token?.indexOf("=") + 1)
          ?.split("&")?.[0],
        token: route?.params?.token
          ?.slice(route?.params?.token?.indexOf("token") + 1)
          ?.split("=")?.[1],
      }));
      console.log(
        "EMIAL",
        route?.params?.token
          ?.slice(route?.params?.token?.indexOf("=") + 1)
          ?.split("&")?.[0]
      );
      console.log(
        "TOKEN",
        route?.params?.token
          ?.slice(route?.params?.token?.indexOf("token") + 1)
          ?.split("=")?.[1]
      );
      setLoadComponent("");
    }
  }, [route?.params?.token]);

  return (
    <>
      <BackgroundWave2 className="w-full absolute" />
      <IndeterminateProgressBar
        loading={isLoading ?? false}
        innerColor="bg-white"
      />
      <SafeAreaView className="w-full h-full flex flex-col justify-evenly items-center p-4">
        <View className="mt-16 w-full flex flex-col justify-center items-center">
          <View className=" rounded-2xl bg-white shadow-2xl shadow-gray-500 p-2 m-8">
            <GetSvg name="SignInSquareIcon" />
          </View>
          <Text className="text-xl font-black m-1 uppercase ">
            Forgot Password{" "}
          </Text>
          <Text className="text-xs  opacity-30 font-semibold w-full text-center ">
            Please enter your email to send reset password link
          </Text>
        </View>
        <ScrollView className="mt-10 w-full">
          <View className=" w-full max-w-sm">
            {loadComponent === "profileCheck" ? (
              <>
                <WFullInputField
                  className="text-sm"
                  placeholder={"Please enter your email"}
                  onChangeText={setEmail}
                  svgIcon1={<GetSvg name="userIcon" classN="w-5 h-5 m-auto" />}
                />

                <WFullBlackButton
                  text={"Send"}
                  className="uppercase text-base"
                  onPress={() => handleCheckUser()}
                />
              </>
            ) : (
              <>
                <>
                  <WFullInputField
                    onFocus={() => {
                      setShowErrorBox(true);
                    }}
                    secureTextEntry={!showPassword}
                    onChangeText={(e) => {
                      setPasswordsValue((prev: any) => ({
                        ...prev,
                        password: e,
                      }));
                    }}
                    //   value={password.value}
                    //   error={!password.valid ? password.error : null}
                    placeholder="Enter new password"
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
                    onChangeText={(e) => {
                      setPasswordsValue((prev: any) => ({
                        ...prev,
                        password_confirmation: e,
                      }));
                    }}
                    //   value={confirm_password.value}
                    //   error={
                    //     !confirm_password.valid ? confirm_password.error : null
                    //   }
                    placeholder="Enter confirm password"
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
                    text={"Submit"}
                    className="uppercase text-base"
                    onPress={() => handleResetPassword()}
                  />
                </>
              </>
            )}
            {showErrorBox ? (
              <View className="w-full">
                <View className="h-8 flex flex-row w-full items-center ">
                  {showPasswordsValidation?.lowerCase ? (
                    <GetSvg
                      name="tickIconRounded"
                      classN="w-5 h-5 "
                      color="#67DAA3"
                    />
                  ) : (
                    <GetSvg
                      name="closeIcon"
                      color="#d10000"
                      classN="w-5 h-5 "
                    />
                  )}
                  <Text className="mx-2  text-xs text-gray-500 w-full">
                    At least 1 lowercase letter
                  </Text>
                </View>
                <View className="h-8 flex flex-row w-full items-center ">
                  {showPasswordsValidation?.specialChar ? (
                    <GetSvg
                      name="tickIconRounded"
                      classN="w-5 h-5 "
                      color="#67DAA3"
                    />
                  ) : (
                    <GetSvg
                      name="closeIcon"
                      color="#d10000"
                      classN="w-5 h-5 "
                    />
                  )}
                  <Text className="mx-2  text-xs text-gray-500 w-full">
                    At least 1 special character
                  </Text>
                </View>
                <View className="h-8 flex flex-row w-full items-center ">
                  {showPasswordsValidation?.oneNumber ? (
                    <GetSvg
                      name="tickIconRounded"
                      classN="w-5 h-5 "
                      color="#67DAA3"
                    />
                  ) : (
                    <GetSvg
                      name="closeIcon"
                      color="#d10000"
                      classN="w-5 h-5 "
                    />
                  )}
                  <Text className="mx-2  text-xs text-gray-500 w-full">
                    At least 1 number
                  </Text>
                </View>
                <View className="h-8 flex flex-row w-full items-center ">
                  {showPasswordsValidation?.eightChar ? (
                    <GetSvg
                      name="tickIconRounded"
                      classN="w-5 h-5 "
                      color="#67DAA3"
                    />
                  ) : (
                    <GetSvg
                      name="closeIcon"
                      color="#d10000"
                      classN="w-5 h-5 "
                    />
                  )}
                  <Text className="mx-2  text-xs text-gray-500 w-full">
                    Password should be in minimum 8 characters
                  </Text>
                </View>
                <View className="h-8 flex flex-row w-full items-center ">
                  {showPasswordsValidation?.confirm_password ? (
                    <GetSvg
                      name="tickIconRounded"
                      classN="w-5 h-5 "
                      color="#67DAA3"
                    />
                  ) : (
                    <GetSvg
                      name="closeIcon"
                      color="#d10000"
                      classN="w-5 h-5 "
                    />
                  )}
                  <Text className="mx-2  text-xs text-gray-500 w-full">
                    Confirm password should match new password
                  </Text>
                </View>
                {showPasswordsValidation?.old_password ? (
                  <View className="h-8 flex flex-row w-full items-center ">
                    <GetSvg
                      name="closeIcon"
                      color="#d10000"
                      classN="w-5 h-5 "
                    />

                    <Text className="mx-2  text-xs text-gray-500">
                      {showPasswordsValidation?.old_password}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
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
        </ScrollView>
        <View className=" w-full"></View>
      </SafeAreaView>
      {isLoading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
    </>
  );
};
export default ForgotPassword;
