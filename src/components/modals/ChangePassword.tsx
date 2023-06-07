import React, { useEffect, useState } from "react";
import { Modal, View, Pressable, Text, TextInput } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import useAuth from "../../utils/auth";
import { useToast } from "react-native-toast-notifications";
import Svg, { Path } from "react-native-svg";
import WFullInputField from "../atoms/WFullInputField";
import Error from "../atoms/Error";
import { isEmpty } from "lodash";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import ProfileService from "../../services/ProfileService";

interface ChangePasswordModalProps {
  isOpen: boolean;
  setIsOpen: any;
  user: any;
}
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  setIsOpen,
  user,
}) => {
  const { token, UpdateUser, RefreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [passwordsValue, setPasswordsValue] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const [Showpasswords, setShowPasswords] = useState({
    old_password: true,
    password: true,
    password_confirmation: true,
  });
  const [showPasswordsValidation, setPasswordValidation] = useState({
    oneNumber: true,
    specialChar: false,
    lowerCase: false,
    eightChar: false,
    confirm_password: false,
    old_password: null,
  });
  useEffect(() => {
    const c = /^(?=.*[a-z])/;
    const lowerCase = c.test(passwordsValue?.password);
    const d = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const eightChar = d.test(passwordsValue?.password);
    const b = /^(?=.*\W)/;
    const specialChar = b.test(passwordsValue?.password);
    const p = /^(?=.*[0-9])/;
    const oneNumber = p.test(passwordsValue?.password);
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

  const handleSubmit = () => {
    setIsLoading(true);
    const payload = {
      current_password: passwordsValue.old_password,
      new_password: passwordsValue.password,
      new_confirm_password: passwordsValue.password_confirmation,
    };
    //console.log("payload", payload);

    // HttpService.post(apiEndpoints.changePassword, {
    //   token: token,
    //   body: JSON.stringify(payload),
    // })
    //   .then((res: any) => {
    //     if (res.status == true) {
    //       setIsLoading(false);
    //       toast.show(res?.message, { type: "success" });
    //       setIsOpen(false);
    //       RefreshUser && RefreshUser(token);
    //     } else {
    //       setIsLoading(false);
    //       setPasswordValidation((prev: any) => ({
    //         ...prev,
    //         old_password: res?.message,
    //       }));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("CHANGE PASSWORD ERR", err);
    //   });

    ProfileService.handleChangePassword(passwordsValue, toast, (data) => {
      if (data) {
        setIsLoading(false);
        setIsOpen(false);
      } else {
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={{
          position: "absolute",
          alignSelf: "center",
        }}
      >
        <View className="w-full h-full flex items-center justify-center bg-[#00000077]">
          <View className="w-[90%] max-w-md">
            <ScrollView>
              <View className=" relative rounded-2xl  bg-white ">
                <View className="  my-2 h-12 border-b border-gray-300 justify-between items-center flex flex-row    ">
                  <Text className="text-base mx-5 font-medium">
                    {"Change Password "}
                  </Text>

                  <Pressable
                    onPress={() => {
                      setIsOpen(false);
                    }}
                  >
                    <GetSvg name="closeIcon" classN="mx-3 w-7 h-7" />
                  </Pressable>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  className="my-2  rounded-2xl  px-5"
                >
                  {/* ############## PASSWORD INPUTS START ############## */}
                  <View className="">
                    <Text className=" mx-1 text-gray-400 font-medium text-xs">
                      Old password
                    </Text>
                    <WFullInputField
                      secureTextEntry={Showpasswords.old_password}
                      textContentType="password"
                      placeholder="Enter your old password"
                      onChangeText={(e: any) => {
                        setPasswordsValue((prev: any) => ({
                          ...prev,
                          old_password: e,
                        }));
                      }}
                      className="h-5 text-sm  "
                      svgIcon1={
                        <GetSvg
                          name="eyeCloseIcon"
                          classN="h-5 w-5 "
                          callBack={() => {
                           // console.log("SAGAR");
                            setShowPasswords((prev: any) => ({
                              ...prev,
                              old_password: !Showpasswords?.old_password,
                            }));
                          }}
                        />
                      }
                      svgIcon2={
                        <GetSvg
                          name="eyeOpenIcon"
                          classN="h-5 w-5 "
                          callBack={() => {
                            //console.log("SAGAR");
                            setShowPasswords((prev: any) => ({
                              ...prev,
                              old_password: !Showpasswords?.old_password,
                            }));
                          }}
                        />
                      }
                      toggleIcon={Showpasswords?.old_password}
                    />
                  </View>
                  <View className="">
                    <Text className=" mx-1 text-gray-400 font-medium text-xs">
                      New password
                    </Text>
                    <WFullInputField
                      onFocus={() => {
                        setShowErrorBox(true);
                      }}
                      secureTextEntry={Showpasswords.password}
                      textContentType="password"
                      placeholder="Enter your new password"
                      onChangeText={(e: any) => {
                        setPasswordsValue((prev: any) => ({
                          ...prev,
                          password: e,
                        }));
                      }}
                      className="h-5 text-sm  "
                      svgIcon1={
                        <GetSvg
                          name="eyeCloseIcon"
                          classN="h-5 w-5 "
                          callBack={() => {
                           // console.log("SAGAR");
                            setShowPasswords((prev: any) => ({
                              ...prev,
                              password: !Showpasswords?.password,
                            }));
                          }}
                        />
                      }
                      svgIcon2={
                        <GetSvg
                          name="eyeOpenIcon"
                          classN="h-5 w-5 "
                          callBack={() => {
                           // console.log("SAGAR");
                            setShowPasswords((prev: any) => ({
                              ...prev,
                              password: !Showpasswords?.password,
                            }));
                          }}
                        />
                      }
                      toggleIcon={Showpasswords?.password}
                    />
                  </View>
                  <View className="">
                    <Text className=" mx-1 text-gray-400 font-medium text-xs">
                      Confirm password
                    </Text>
                    <WFullInputField
                      secureTextEntry={Showpasswords.password_confirmation}
                      textContentType="password"
                      placeholder="Enter your confirm password"
                      onChangeText={(e: any) => {
                        setPasswordsValue((prev: any) => ({
                          ...prev,
                          password_confirmation: e,
                        }));
                      }}
                      className="h-5 text-sm  "
                      svgIcon1={
                        <GetSvg
                          name="eyeCloseIcon"
                          classN="h-5 w-5 "
                          callBack={() => {
                            //console.log("SAGAR");
                            setShowPasswords((prev: any) => ({
                              ...prev,
                              password_confirmation:
                                !Showpasswords?.password_confirmation,
                            }));
                          }}
                        />
                      }
                      svgIcon2={
                        <GetSvg
                          name="eyeOpenIcon"
                          classN="h-5 w-5 "
                          callBack={() => {
                            //console.log("SAGAR");
                            setShowPasswords((prev: any) => ({
                              ...prev,
                              password_confirmation:
                                !Showpasswords?.password_confirmation,
                            }));
                          }}
                        />
                      }
                      toggleIcon={Showpasswords?.password_confirmation}
                    />
                  </View>
                  {/* ############## PASSWORD INPUTS END ############## */}

                  {/* ############## PASSWORD VALIDATIONS START ############## */}
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
                  {/* ############## PASSWORD VALIDATIONS END ############## */}

                  {/* ############## SUBMIT SECTION START ############## */}

                  {/* ############## SUBMIT SECTION END ############## */}
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                      setIsOpen(false);
                    }}
                    className="p-2 bg-slate-800 w-24 text-center text-xs text-white rounded-full "
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      handleSubmit();
                    }}
                    className="p-2 bg-[#d10000] w-24 text-center text-xs text-white rounded-full mx-5"
                  >
                    {isLoading ? "Submiting..." : " Submit"}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
