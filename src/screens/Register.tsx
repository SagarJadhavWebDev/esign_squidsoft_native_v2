import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useToast } from "react-native-toast-notifications";
import Toast from "react-native-toast-notifications/lib/typescript/toast";
import BackgroundWave from "../assets/svg/BackgroundWave";
import IndeterminateProgressBar from "../components/atoms/IndeterminateProgressBar";
import WFullInputField from "../components/atoms/WFullInputField";
import WFullInputFieldCC from "../components/atoms/WFullInputFieldCC";
import WFullBlackButton from "../components/molecules/WFullBlackButton";
import routes from "../constants/routes";
import AuthController from "../controllers/AuthController";
import useAuth from "../utils/auth";
import GetSvg from "../utils/GetSvg";

interface RegisterProps {
  navigation: any;
}
export interface RegisterPayLoad {
  name: string | null;
  email: string | null;
  phone_number_country_code: string | null;
  phone_number: string | null;
  password: string | null;
  password_confirmation: string | null;
}

interface RegisterPayLoadValidation {
  name: boolean;
  email: boolean;
  phone_number_country_code: boolean;
  phone_number: boolean;
  password: boolean;
  password_confirmation: boolean;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const toast = useToast();
  const { SignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const useRegisterFormState = () => {
    const [payload, setPayload] = useState<RegisterPayLoad>({
      name: null,
      email: null,
      phone_number_country_code: null,
      phone_number: null,
      password: null,
      password_confirmation: null,
    });

    const [validate, setValidate] = useState<RegisterPayLoadValidation>({
      name: true,
      email: true,
      phone_number_country_code: true,
      phone_number: true,
      password: true,
      password_confirmation: true,
    });

    const [error, setError] = useState<RegisterPayLoad>({
      name: null,
      email: null,
      phone_number_country_code: null,
      phone_number: null,
      password: null,
      password_confirmation: null,
    });

    const handleErrorValidation = () => {
      setValidate({
        name: true,
        email: true,
        phone_number_country_code: true,
        phone_number: true,
        password: true,
        password_confirmation: true,
      });
      setError({
        name: null,
        email: null,
        phone_number_country_code: null,
        phone_number: null,
        password: null,
        password_confirmation: null,
      });
      console.log("Submit");
      let validated = true;
      if (isEmpty(payload.name)) {
        setValidate((prev) => ({
          ...prev,
          name: false,
        }));
        setError((prev) => ({
          ...prev,
          name: "Name is Required",
        }));
        validated = false;
      }
      if (isEmpty(payload.email)) {
        setValidate((prev) => ({
          ...prev,
          email: false,
        }));
        setError((prev) => ({
          ...prev,
          email: "Email is Required",
        }));
        validated = false;
      }
      if (isEmpty(payload.phone_number)) {
        setValidate((prev) => ({
          ...prev,
          phone_number: false,
        }));
        setError((prev) => ({
          ...prev,
          phone_number: "Phone Number is Required",
        }));
        validated = false;
      }
      if (isEmpty(payload.phone_number_country_code)) {
        setValidate((prev) => ({
          ...prev,
          phone_number_country_code: false,
        }));
        setError((prev) => ({
          ...prev,
          phone_number_country_code: "Country Code is Required",
        }));
        validated = false;
      }
      if (isEmpty(payload.password)) {
        setValidate((prev) => ({
          ...prev,
          password: false,
        }));
        setError((prev) => ({
          ...prev,
          password: "Password is Required",
        }));
        validated = false;
      }
      if (isEmpty(payload.password_confirmation)) {
        setValidate((prev) => ({
          ...prev,
          password_confirmation: false,
        }));
        setError((prev) => ({
          ...prev,
          password_confirmation: "Confirm Password is Required",
        }));
        validated = false;
      }
      if (payload.password !== payload.password_confirmation) {
        console.log("SETTING FALSE");
        setValidate((prev) => ({
          ...prev,
          password_confirmation: false,
        }));
        setError((prev) => ({
          ...prev,
          password_confirmation: "Password should match confirm password",
        }));
        setValidate((prev) => ({
          ...prev,
          password: false,
        }));
        setError((prev) => ({
          ...prev,
          password: "Password should match confirm password",
        }));
        validated = false;
      }
      return validated;
    };

    const handleSubmit = () => {
      const v = handleErrorValidation();
      if (
        v &&
        validate.name &&
        validate.email &&
        validate.password &&
        validate.password_confirmation &&
        validate.phone_number_country_code &&
        validate.phone_number
      ) {
        console.log("PAYLOAD:", payload);
        setIsLoading(true);
        AuthController.Register(payload).then((result) => {
          console.log("Rgister:", result);
          setIsLoading(false);
          if (result?.e_payload) {
            SignIn &&
              SignIn(result, () => {
                toast.show("register successfully", { type: "success" });
              });
            //navigation.navigate(routes.dashboard);
          } else {
            toast.show(result?.message, { type: "error" });
          }
        });
      }
    };

    return {
      name: {
        value: payload.name,
        set: (value: string) =>
          setPayload((prev) => ({ ...prev, name: value })),
        valid: validate.name,
        error: error.name,
      },
      email: {
        value: payload.email,
        set: (value: string) =>
          setPayload((prev) => ({ ...prev, email: value })),
        valid: validate.email,
        error: error.email,
      },
      phone_number_country_code: {
        value: payload.phone_number_country_code,
        set: (value: string) =>
          setPayload((prev) => ({ ...prev, phone_number_country_code: value })),
        valid: validate.phone_number_country_code,
        error: error.phone_number_country_code,
      },
      phone_number: {
        value: payload.phone_number,
        set: (value: string) =>
          setPayload((prev) => ({ ...prev, phone_number: value })),
        valid: validate.phone_number,
        error: error.phone_number,
      },
      password: {
        value: payload.password,
        set: (value: string) =>
          setPayload((prev) => ({ ...prev, password: value })),
        valid: validate.password,
        error: error.password,
      },
      password_confirmation: {
        value: payload.password_confirmation,
        set: (value: string) =>
          setPayload((prev) => ({ ...prev, password_confirmation: value })),
        valid: validate.password_confirmation,
        error: error.password_confirmation,
      },
      submit: handleSubmit,
    };
  };
  const {
    email,
    name,
    password,
    password_confirmation,
    phone_number,
    phone_number_country_code,
    submit,
  } = useRegisterFormState();
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
    confirm_password: false,
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
      confirm_password:
        passwordsValue.confirm_password === passwordsValue.new_password &&
        !isEmpty(passwordsValue.new_password) &&
        !isEmpty(passwordsValue.confirm_password),
    }));
  }, [passwordsValue.new_password, passwordsValue.confirm_password]);
  const isValidPassword = Object.values(showPasswordsValidation).every(
    (o: any) => o === true
  );
  console.log("isValidPassword",isValidPassword,showPasswordsValidation)
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
            <WFullInputField
              placeholder="Full Name"
              className="text-base"
              onChangeText={name.set}
              value={name.value ?? ""}
              error={!name.valid ? name.error : null}
              svgIcon1={<GetSvg name="userIcon" classN="w-5 h-5 m-auto" />}
            />
            <WFullInputField
              textContentType="emailAddress"
              placeholder="Email"
              className="text-base"
              onChangeText={email.set}
              value={email.value ?? ""}
              error={!email.valid ? email.error : null}
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
            <WFullInputFieldCC
              value={phone_number.value ?? ""}
              error={!phone_number.valid ? phone_number.error : null}
              setCountryCode={phone_number_country_code.set}
              setPhoneNumber={phone_number.set}
              setPhoneNumberLength={() => {}}
              phoneCodeFontSize={16}
              className="text-base"
              placeholder="Phone Number"
              svgIcon1={<GetSvg name="phoneIcon" classN="w-5 h-5 m-auto" />}
            />
            <WFullInputField
              secureTextEntry={!showPassword}
              onChangeText={(e) => {
                password.set(e);
                setPasswordsValue((prev: any) => ({
                  ...prev,
                  new_password: e,
                }));
              }}
              onFocus={() => {
                setShowErrorBox(true);
              }}
              value={password.value ?? ""}
              error={!password.valid ? password.error : null}
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

            <WFullInputField
              className="text-base"
              secureTextEntry={!showConfirmPassword}
              onChangeText={(e) => {
                password_confirmation.set(e);
                setPasswordsValue((prev: any) => ({
                  ...prev,
                  confirm_password: e,
                }));
              }}
              value={password_confirmation.value ?? ""}
              error={
                !password_confirmation.valid
                  ? password_confirmation.error
                  : null
              }
              placeholder="Confirm Password"
              toggleIcon={!showConfirmPassword}
              svgIcon1={
                <GetSvg
                  name="eyeOpenIcon"
                  callBack={() => setShowConfirmPassword(!showConfirmPassword)}
                  classN="w-5 h-5 m-auto"
                />
              }
              svgIcon2={
                <GetSvg
                  name="eyeCloseIcon"
                  callBack={() => setShowConfirmPassword(!showConfirmPassword)}
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
                
              </View>
            ) : null}
            <WFullBlackButton
              text="Sign Up"
              className={
                isValidPassword
                  ? "uppercase text-base"
                  : "uppercase text-base "
              }
              onPress={() => {
                if (isValidPassword) {
                  submit();
                }
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
