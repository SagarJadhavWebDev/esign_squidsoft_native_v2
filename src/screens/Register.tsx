import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useToast } from "react-native-toast-notifications";
import BackgroundWave from "../assets/svg/BackgroundWave";
import IndeterminateProgressBar from "../components/atoms/IndeterminateProgressBar";
import WFullInputField from "../components/atoms/WFullInputField";
import WFullBlackButton from "../components/molecules/WFullBlackButton";
import routes from "../constants/routes";
import useAuth from "../utils/auth";
import GetSvg from "../utils/GetSvg";
import ApiInstance from "../services/ApiInstance";
import apiEndpoint from "../constants/apiEndpoints";
import handleResponse from "../services/handleResponse";
import InputTextBox from "../components/atoms/InputTextBox";
import { RegisterTypes } from "../types/AuthTypes";
import { useValidateObjectValues } from "../utils/useReduxUtil";
import { useDispatch } from "react-redux";
import RegisterValidations from "../validations/RegisterValidations";
import serializeYupErrors from "../utils/SerializeErrors";
import HttpService from "../utils/HttpService";

interface RegisterProps {
  navigation: any;
}
export interface RegisterPayLoad {
  name: string | null;
  email: string | null;
  password: string | null;
  terms_accepted?: boolean;
}

interface RegisterPayLoadValidation {
  name: boolean;
  email: boolean;
  password: boolean;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const toast = useToast();
  const { SignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, SetErrors] = useState<any>();
  const [payload, setPayload] = useState<RegisterTypes>({
    name: "",
    email: "",
    password: "",
    terms_accepted: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [passwordsValue, setPasswordsValue] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [showPasswordsValidation, setPasswordValidation] = useState({
    oneNumber: true,
    specialChar: false,
    lowerCase: false,
    eightChar: false,
  });
  useEffect(() => {
    const c = /^(?=.*[a-z])/;
    const lowerCase = c.test(passwordsValue?.new_password);
    const d = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const eightChar = d.test(passwordsValue?.new_password);
    const b = /^(?=.*\W)/;
    const specialChar = b.test(passwordsValue?.new_password);
    const p = /^(?=.*[0-9])/;
    const oneNumber = p.test(passwordsValue?.new_password);
    setPasswordValidation((prev: any) => ({
      ...prev,
      oneNumber: oneNumber,
      specialChar: specialChar,
      lowerCase: lowerCase,
      eightChar: eightChar,
    }));
  }, [passwordsValue.new_password]);
  const isValidPassword = Object.values(showPasswordsValidation).every(
    (o: any) => o === true
  );
  const [focusId, setFocusId] = useState("name");
  const dispatch = useDispatch();
  const validate = useValidateObjectValues(showPasswordsValidation, false);
  // console.log("isValidPassword",isValidPassword,showPasswordsValidation)
  const handleRegister = () => {
    
      setIsLoading(true);
      RegisterValidations.validate(payload, {
        abortEarly: false,
      })
        .catch((err) => {
          SetErrors(serializeYupErrors(err));
          console.log("serializeYupErrors(err)", serializeYupErrors(err));
          setIsLoading(false);
        })
        .then((res) => {
          if (res !== undefined && validate) {
            SetErrors(null);
            HttpService.post(apiEndpoint.auth.register, {
              body: JSON.stringify(payload),
            }).then((res) => {
              console.log("RESULt", res);
              toast.show(res?.message, {
                type: res?.success ? "success" : "error",
              });
              setIsLoading(false);
              if (res?.success) {
                navigation.navigate(routes.emailSent, {
                  email: payload?.email,
                  type: "VERIFY_EMAIL",
                });
              }
            });
          }
        });
  
  };
  return (
    <>
      <ScrollView>
        <BackgroundWave className="w-full absolute" />
        <IndeterminateProgressBar
          loading={isLoading ?? false}
          innerColor="bg-white"
        />
        <SafeAreaView className="w-full h-full max-w-md mx-auto flex flex-col justify-evenly items-center p-4">
          <View className="w-full flex flex-col justify-center items-center my-8">
            <View className=" rounded-2xl bg-white shadow-2xl shadow-gray-500 p-2 m-8">
              <Svg
                className="w-[70px] h-[70px]"
                fill={"none"}
                stroke="#d10000" //'#D71A1A'
                viewBox="0 0 24 24"
                // xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </Svg>
            </View>
            <Text className="text-2xl font-black m-1 w-full text-center uppercase">
              Sign Up
            </Text>
            <Text className="text-sm opacity-30 font-semibold w-full text-center ">
              Fast, Efficient & Secured eSign App
            </Text>
          </View>
          <View className=" w-full">
            <InputTextBox
              editingState={focusId === "name"}
              placeholder="Full Name"
              className="text-base"
              onFocus={() => {
                setFocusId("name");
              }}
              onSubmitEditing={() => {
                setFocusId("email");
              }}
              onChangeText={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  name: e,
                }));
              }}
              value={payload?.name ?? ""}
              error={errors?.name ? errors?.name : null}
              svgIcon1={<GetSvg name="userIcon" classN="w-5 h-5 m-auto" />}
            />
            <InputTextBox
              editingState={focusId === "email"}
              textContentType="emailAddress"
              onFocus={() => {
                setFocusId("email");
              }}
              placeholder="Email"
              className="text-base"
              onChangeText={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  email: e,
                }));
              }}
              value={payload.email}
              onSubmitEditing={() => {
                setFocusId("password");
              }}
              error={errors?.email ? errors?.email : null}
              svgIcon1={
                <Svg
                  // xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-5 h-5 m-auto"
                >
                  <Path
                    strokeLinecap="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                  />
                </Svg>
              }
            />

            <InputTextBox
              editingState={focusId === "password"}
              secureTextEntry={!showPassword}
              onChangeText={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  password: e,
                }));
                setPasswordsValue((prev: any) => ({
                  ...prev,
                  new_password: e,
                }));
              }}
              onFocus={() => {
                setFocusId("password");
                setShowErrorBox(true);
              }}
              onSubmitEditing={() => {
                handleRegister();
              }}
              value={payload?.password ?? ""}
              error={errors?.password ? errors?.password : null}
              placeholder="Password"
              className="text-base"
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
              </View>
            ) : null}
            <WFullBlackButton
              text="Sign Up"
              className={
                isValidPassword ? "uppercase text-base" : "uppercase text-base "
              }
              onPress={() => {
                handleRegister();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.push(routes.login);
              }}
            >
              <Text className="text-center my-3 text-sm">
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
          <View className=" w-full"></View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};
export default Register;
