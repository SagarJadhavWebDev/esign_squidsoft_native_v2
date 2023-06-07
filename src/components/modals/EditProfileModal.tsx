import React, { ReactNode, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, Button, Image } from "react-native";
import ApiConfig from "../../constants/ApiConfig";
import GetSvg from "../../utils/GetSvg";
import DocumentPicker, { types } from "react-native-document-picker";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { isEmpty, isNull, omit } from "lodash";
import WFullInputField from "../atoms/WFullInputField";
import WFullInputFieldCC from "../atoms/WFullInputFieldCC";
import useAuth from "../../utils/auth";
import { useToast } from "react-native-toast-notifications";
import Error from "../atoms/Error";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import IndeterminateProgressBar from "../atoms/IndeterminateProgressBar";
import { useDispatch } from "react-redux";
import ProfileService from "../../services/ProfileService";
import { setUser } from "../../redux/reducers/userSlice";
import { setIsLoading } from "../../redux/reducers/uiSlice";
import { useIsLoading } from "../../utils/useReduxUtil";
import RNFetchBlob from "rn-fetch-blob";
interface EditProfileModalProps {
  isOpen: boolean;
  setIsOpen: any;
  user: any;
  userProfilePicture: any;
  setUserProfilePicture: any;
}
const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  setIsOpen,
  user,
  userProfilePicture,
  setUserProfilePicture,
}) => {
  //bg-[#00000077]
  const { token, UpdateUser, RefreshUser } = useAuth();
  const [file, setFile] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = useIsLoading();
  const [errors, setErrors] = useState<any>({
    countryCode: null,
    phoneNumber: null,
    file: null,
    userName: null,
  });
  const [payload, setPayload] = useState<any>({
    name: user?.name,
    email: user?.email,
    phone_number: user?.phone_number ?? "",
    profile_picture: user?.profile_picture,
    local_profile_picture: null,
    country_code: null,
    isEdit: false,
  });
  useEffect(() => {
    if (user) {
      setPayload((prev: any) => ({
        ...prev,
        name: user?.name,
        email: user?.email,
        phone_number: user?.phone_number ?? "",
        profile_picture: user?.profile_picture,
        country_code: user?.phone_number_country_code,
      }));
    }
  }, [user]);
  const toast = useToast();
  const handleFileSelect = async () => {
    try {
      const pickerResult = (await DocumentPicker.pickSingle({
        type: [types.images],
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
      })) as any;

      if (pickerResult?.size > 1000000) {
        setErrors((prev: any) => ({
          ...prev,
          file: "Max allowed size is 1MB for Profile Picture",
        }));
      } else {
        setFile({
          name: pickerResult?.name,
          filename: pickerResult?.name,
          type: pickerResult?.type,
          uri: pickerResult?.uri,
          size: pickerResult?.size,
        });
        setUserProfilePicture(pickerResult?.uri);
        setPayload((prev: any) => ({
          ...prev,
          local_profile_picture: pickerResult?.uri,
          profile_picture: pickerResult?.uri,
        }));
        setErrors((prev: any) => ({
          ...prev,
          file: null,
        }));
      }
    } catch (e) {
      // handleError(e);
    }
  };

  // const handleUpdateProfile = () => {
  //   setIsLoading(true);
  //   let formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("name", userName ?? user?.name);
  //   formData.append("phone_number", phoneNumber ?? user?.phone_number);
  //   formData.append("country_code", countryCode ?? user?.country_code);
  //   HttpService.postFile(apiEndpoints.updateProfile, {
  //     token: token,
  //     formData: formData,
  //   })
  //     .then((res) => {
  //       console.log("PROFILE UPDATE ", res);
  //       const data = CryptoHandler.response(res, token ?? "");
  //       if (data?.user) {
  //         setIsLoading(false);
  //         setUserProfilePicture(
  //           ApiConfig.FILES_URL +
  //             "profile-pictures/" +
  //             user?.id +
  //             ".jpg?" +
  //             Date.now()
  //         );
  //         UpdateUser &&
  //           UpdateUser(res, token, () => {
  //             setIsOpen(false);
  //             toast.show("Profile updated successfully", { type: "success" });
  //             RefreshUser && RefreshUser(token);
  //           });
  //       } else {
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.log("PROFILE UPDATE ERR", err);
  //     });
  // };

  const dispatch = useDispatch();
  const handleUpdateProfile = async () => {
    dispatch(setIsLoading(true));
    const formPayload = new FormData();
   // console.log("STRING", typeof payload?.phone_number?.toString());
    formPayload.append("name", payload?.name);
    formPayload.append("phone_number", payload?.phone_number?.toString() ?? "");
    formPayload.append("country_code", payload?.country_code);
    if (!isEmpty(payload?.local_profile_picture)) {
      formPayload.append("profile_picture", payload?.local_profile_picture);
    }
   // console.log("PAYLOAD", payload);
    ProfileService.handleUpdateProfile(formPayload, toast, (data) => {
      if (data) {
        // console.log("DATA:", data);
        dispatch(setUser(data?.user));
        setIsOpen(false);
      } else {
      }
      dispatch(setIsLoading(false));
      // setIsLoading(false);
    });
  };

  // handle user name changes
  useEffect(() => {
    if (isEmpty(payload?.name)) {
      setErrors((prev: any) => ({
        ...prev,
        name: "Please enter user name",
      }));
    } else {
      setErrors((prev: any) => ({
        ...prev,
        name: null,
      }));
    }
  }, [payload?.name]);

  // handle phone number changes
  // useEffect(() => {
  //   if (isEmpty(phoneNumber)) {
  //     setErrors((prev: any) => ({
  //       ...prev,
  //       phoneNumber: "Please enter valid phone number",
  //     }));
  //   } else {
  //     setErrors((prev: any) => ({
  //       ...prev,
  //       phoneNumber: null,
  //     }));
  //   }
  // }, [phoneNumber]);

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
          zIndex: 11,
          position: "absolute",
          alignSelf: "center",
        }}
      >
        <View className="w-full h-full flex items-center justify-center bg-[#00000077]">
          <View className="w-[90%] max-w-md">
            <ScrollView>
              <View className="relative rounded-2xl  bg-white ">
                <View className="  my-2 h-12 border-b border-gray-300 justify-between items-center flex flex-row   ">
                  <Text className="text-base mx-5 font-medium">
                    {"Edit Profile "}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setIsOpen(false);
                    }}
                  >
                    <GetSvg name="closeIcon" classN="mx-3 w-7 h-7" />
                  </Pressable>
                </View>
                <ScrollView className="rounded-2xl ">
                  <View className=" justify-start items-center flex flex-col  px-4  ">
                    {/* {"PROFILE PICTURE CHANGE START"} */}
                    <Pressable
                      onPress={() => {
                        handleFileSelect();
                      }}
                    >
                      {userProfilePicture ? (
                        <View className="w-20 my-5 h-20 rounded-full border border-gray-300 justify-center items-center relative">
                          <Image
                            resizeMode="cover"
                            className="w-full h-full rounded-full"
                            source={{
                              uri: userProfilePicture,
                            }}
                            onError={() => {
                              setUserProfilePicture(null);
                            }}
                          />
                          <Pressable className="bg-[#3471fa] p-2 w-6 h-6 absolute bottom-0 right-0 rounded-full justify-center items-center">
                            <GetSvg
                              name="pencilSquare"
                              color="white"
                              classN="w-3 h-3"
                            />
                          </Pressable>
                        </View>
                      ) : (
                        <View className="w-20 my-5 h-20 border relative border-gray-300 rounded-full justify-center items-center">
                          <GetSvg
                            name="userIcon"
                            classN="w-8 h-8  "
                            color="#374151"
                          />
                          <Pressable
                            onPress={() => {
                              handleFileSelect();
                            }}
                            className="bg-[#3471fa] p-2 w-6 h-6 absolute bottom-0 right-0 rounded-full justify-center items-center"
                          >
                            <GetSvg
                              name="pencilSquare"
                              color="white"
                              classN="w-3 h-3"
                            />
                          </Pressable>
                        </View>
                      )}
                    </Pressable>

                    {errors?.file ? (
                      <Error
                        text={errors?.file}
                        classN="text-center items-center mb-5"
                      />
                    ) : null}

                    {/* {"PROFILE PICTURE CHANGE END"} */}

                    <View className="w-full">
                      <Text className=" mx-1 text-gray-400 font-medium text-xs">
                        Full Name *
                      </Text>
                      <WFullInputField
                        textContentType="emailAddress"
                        placeholder="Enter your name"
                        onChangeText={(e: any) => {
                          setPayload((prev: any) => ({
                            ...prev,
                            name: e,
                          }));
                        }}
                        value={payload?.name}
                        className="h-5 text-sm"
                      />
                      {errors?.name ? (
                        <Error
                          text={errors?.name}
                          classN="text-center items-center mb-5"
                        />
                      ) : null}
                    </View>
                    <View className="my-1 w-full">
                      <Text className=" mx-1 text-gray-400 font-medium text-xs">
                        Email *
                      </Text>
                      <WFullInputField
                        textContentType="emailAddress"
                        placeholder="Email"
                        editable={false}
                        className="h-5 text-sm "
                        value={user?.email}
                      />
                    </View>
                    <View className="my-1  mx-0 w-full ">
                      <Text className=" mx-1  text-gray-400 font-medium text-xs">
                        Phone number *
                      </Text>
                      <WFullInputFieldCC
                        defaultValue={user.phone_number}
                        value={payload?.phone_number ?? ""}
                        setCountryCode={(e: any) => {
                          setPayload((prev: any) => ({
                            ...prev,
                            country_code: e,
                          }));
                        }}
                        setPhoneNumber={(e: any) => {
                          setPayload((prev: any) => ({
                            ...prev,
                            phone_number: e,
                          }));
                        }}
                        setPhoneNumberLength={() => {}}
                        placeholder="Phone Number"
                        className="w-full"
                        height={10}
                        phoneCodeFontSize={15}
                      />
                      {errors?.phoneNumber ? (
                        <Error
                          text={errors?.phoneNumber}
                          classN="text-center items-center mb-5"
                        />
                      ) : null}
                      {errors?.countryCode ? (
                        <Error
                          text={errors?.countryCode}
                          classN="text-center items-center mb-5"
                        />
                      ) : null}
                    </View>
                  </View>
                </ScrollView>
                <View className=" my-5 flex flex-row justify-end items-end    ">
                  <Text
                    onPress={() => {
                      setIsOpen(false);
                    }}
                    className=" bg-slate-800  p-2 w-24 text-center text-xs text-white rounded-full "
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      if (isNull(errors?.name && isNull(errors?.phoneNumber))) {
                        handleUpdateProfile();
                      }
                    }}
                    className={` ${
                      !isEmpty(errors?.name)
                        ? "bg-[#f19b9b]"
                        : !isEmpty(errors?.phoneNumber)
                        ? "bg-[#f19b9b]"
                        : "bg-[#d10000]"
                    }  mx-5  p-2 w-24 text-center text-xs text-white rounded-full`}
                  >
                    {!isLoading ? "Update" : "Updating..."}
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
export default EditProfileModal;
