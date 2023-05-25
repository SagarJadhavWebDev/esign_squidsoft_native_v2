import React, { ReactNode, useEffect, useRef, useState } from "react";
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
import {
  setIsLoading,
  setLoadingModal,
  setModalType,
} from "../../redux/reducers/uiSlice";
import {
  useCitiesList,
  useCountryList,
  useIsLoading,
  useOrganization,
  useStateList,
  useUser,
} from "../../utils/useReduxUtil";
import RNFetchBlob from "rn-fetch-blob";
import CountryService from "../../services/CountryService";
import {
  setCitiesData,
  setStatesData,
} from "../../redux/reducers/countrySelectorSlice";
import OrganizationsService from "../../services/OrganizationsService";
import { setOrganization } from "../../redux/reducers/ListOrganizationSlice";
import CustomDropDown from "../molecules/CustomDropDown";
interface EditOrganizationModalProps {
  isOpen: boolean;
  setIsOpen: any;
}
const EditOrganizationModal: React.FC<EditOrganizationModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useDispatch();
  const user = useUser();
  const [isLoading, setIsLoading] = useState<any>();
  const [file, setFile] = useState<any>(null);
  const [errors, setErrors] = useState<any>({
    countryCode: null,
    phoneNumber: null,
    file: null,
    userName: null,
  });
  const countryList = useCountryList();
  const StateList = useStateList();
  const citieList = useCitiesList();
  const Organization = useOrganization();
  const inputRef = useRef();
  const [payload, setPayload] = useState<any>({
    name: Organization?.name ?? null,
    address_line: Organization?.address_line ?? null,
    street: Organization?.street ?? null,
    city: Organization?.city ?? null,
    state: Organization?.state ?? null,
    country: Organization?.country ?? null,
    country_code: Organization?.country_code ?? null,
    postal_code: Organization?.postal_code ?? null,
    logo: Organization?.logo ?? null,
    local_profile_picture: null,
  });

  const handleCountryChange = (countryCode: string) => {
    CountryService.handleGetStatesCity(countryCode, (data) => {
      dispatch(setStatesData(data));
    });
  };

  const handleCityChange = (countryCode: string, stateCode: string) => {
    CountryService.handleGetCities(countryCode, stateCode, (data) => {
      dispatch(setCitiesData(data));
    });
  };
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
        setPayload((prev: any) => ({
          ...prev,
          local_profile_picture: pickerResult?.uri,
          logo: pickerResult?.uri,
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
  const handleSubmit = () => {
    setIsLoading(true);
    console.log("SAGAR", payload);
    if (!isEmpty(Organization)) {
      const formPayload = new FormData();
      formPayload.append("name", payload?.name);
      formPayload.append("address_line", payload?.address_line);
      formPayload.append("street", payload?.street);
      formPayload.append("city", payload?.city);
      formPayload.append("state", payload?.state);
      formPayload.append("country", payload?.country);
      formPayload.append("country_code", payload?.country_code);
      formPayload.append("postal_code", payload?.postal_code);
      if (payload?.local_profile_picture) {
        formPayload.append("logo", file);
      }
      OrganizationsService.handleUpdateOrganizations(
        Organization?.id,
        formPayload,
        (data: any) => {
          if (data) {
            dispatch(setOrganization(data));
            dispatch(setLoadingModal(false));
            dispatch(setModalType(""));
            setIsOpen(false);
            setIsLoading(false);
          } else {
            dispatch(setLoadingModal(false));
            dispatch(setModalType(""));
            setIsOpen(false);
            setIsLoading(false);
          }
        }
      );
    } else {
      const formPayload = new FormData();
      formPayload.append("name", payload?.name);
      formPayload.append("address_line", payload?.address_line);
      formPayload.append("street", payload?.street);
      formPayload.append("city", payload?.city);
      formPayload.append("state", payload?.state);
      formPayload.append("country", payload?.country);
      formPayload.append("country_code", payload?.country_code);
      formPayload.append("postal_code", payload?.postal_code);
      if (payload?.local_profile_picture) {
        formPayload.append("logo", file);
      }
      OrganizationsService.handleCreateOrganizations(
        formPayload,
        (data: any) => {
          if (data) {
            dispatch(setOrganization(data));
            dispatch(setLoadingModal(false));
            dispatch(setModalType(""));
            setIsOpen(false);
            setIsLoading(false);
          } else {
            dispatch(setLoadingModal(false));
            dispatch(setModalType(""));
            setIsOpen(false);
            setIsLoading(false);
          }
        }
      );
    }
  };
  useEffect(() => {
    setPayload((prev: any) => ({
      ...prev,
      name: Organization?.name ?? null,
      address_line: Organization?.address_line ?? null,
      street: Organization?.street ?? null,
      city: Organization?.city ?? null,
      state: Organization?.state ?? null,
      country: Organization?.country ?? null,
      country_code: Organization?.country_code ?? null,
      postal_code: Organization?.postal_code?.toString() ?? null,
      logo: Organization?.logo ?? null,
      isEdit: isEmpty(Organization),
      local_profile_picture: null,
    }));
  }, [Organization]);

  useEffect(() => {
    if (Organization?.country_code) {
      handleCountryChange(Organization?.country_code);
    }
  }, [Organization?.country_code]);

  useEffect(() => {
    if (Organization?.country_code && Organization?.state && StateList) {
      const stateCode = StateList?.find(
        (s) => s?.name === Organization?.state
      )?.iso2;

      if (stateCode) handleCityChange(Organization?.country_code, stateCode);
    }
  }, [StateList]);
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
                  <Text className="text-base mx-5 w-full font-medium">
                    {` ${Organization ? "Update " : "Create "} Organization   `}
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
                      {payload?.logo ? (
                        <View className="w-20 my-5 h-20 rounded-full border border-gray-300 justify-center items-center relative">
                          <Image
                            resizeMode="cover"
                            className="w-full h-full rounded-full"
                            source={{
                              uri: payload?.logo,
                            }}
                            onError={() => {
                              ///setUserProfilePicture(null);
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

                    {errors?.logo ? (
                      <Error
                        text={errors?.logo}
                        classN="text-center items-center mb-5"
                      />
                    ) : null}

                    {/* {"PROFILE PICTURE CHANGE END"} */}

                    <View className="w-full">
                      <Text className=" mx-1 text-gray-400 font-medium text-xs">
                        Name *
                      </Text>
                      <WFullInputField
                        textContentType="name"
                        placeholder="Enter name "
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
                        Address line *
                      </Text>
                      <WFullInputField
                        onChangeText={(e: any) => {
                          setPayload((prev: any) => ({
                            ...prev,
                            address_line: e,
                          }));
                        }}
                        textContentType="streetAddressLine1"
                        placeholder="Enter Address line"
                        className="h-5 text-sm "
                        value={payload?.address_line}
                      />
                    </View>
                    <View className="my-1  mx-0 w-full ">
                      <Text className=" mx-1  text-gray-400 font-medium text-xs">
                        Street *
                      </Text>
                      <WFullInputField
                        textContentType="fullStreetAddress"
                        placeholder="Enter street "
                        className="h-5 text-sm "
                        value={payload?.street}
                        onChangeText={(e: any) => {
                          setPayload((prev: any) => ({
                            ...prev,
                            street: e,
                          }));
                        }}
                      />
                      {/* {errors?.phoneNumber ? (
                        <Error
                          text={errors?.phoneNumber}
                          classN="text-center items-center mb-5"
                        />
                      ) : null} */}
                      {/* {errors?.countryCode ? (
                        <Error
                          text={errors?.countryCode}
                          classN="text-center items-center mb-5"
                        />
                      ) : null} */}
                    </View>
                    <View className="w-full">
                      <Text className=" mx-1 mb-1 text-gray-400 font-medium text-xs">
                        Select country
                      </Text>
                      <CustomDropDown
                        items={[
                          ...(countryList ?? []),
                          { lable: "Select Country", value: "" },
                        ]?.map((s: any) => {
                          return { value: s?.iso2, label: s?.name };
                        })}
                        onSelect={(e: any) => {
                          const selectedCountry = e?.option;
                          handleCountryChange(selectedCountry?.value);
                          setPayload((prev: any) => ({
                            ...prev,
                            country_code: selectedCountry?.value,
                            country: selectedCountry?.label,
                          }));
                        }}
                        selectedValue={{
                          label: payload?.country ?? "Select country",
                        }}
                        placeholder={"sad"}
                        setMainScrollState={true}
                        width={150}
                      />
                      {errors?.country ? (
                        <Error
                          text={errors?.country}
                          classN="text-center items-center mb-5"
                        />
                      ) : null}
                    </View>
                    <View className="w-full my-3">
                      <Text className=" mx-1 mb-1 text-gray-400 font-medium text-xs">
                        Select state
                      </Text>
                      <CustomDropDown
                        items={[
                          ...(StateList ?? []),
                          { lable: "Select State", value: "" },
                        ]?.map((s: any) => {
                          return { value: s?.iso2, label: s?.name };
                        })}
                        onSelect={(e: any) => {
                          const selectedState = e?.option;
                          console.log("selectedState", selectedState);
                          handleCityChange(
                            payload?.country_code ?? "",
                            selectedState?.value
                          );
                          setPayload((prev: any) => ({
                            ...prev,
                            state: selectedState?.label,
                          }));
                        }}
                        selectedValue={{
                          label: payload?.state ?? "Select state",
                        }}
                        placeholder={"sad"}
                        setMainScrollState={true}
                        width={150}
                      />
                      {errors?.country ? (
                        <Error
                          text={errors?.country}
                          classN="text-center items-center mb-5"
                        />
                      ) : null}
                    </View>
                    <View className="w-full my-1">
                      <Text className=" mx-1 mb-1 text-gray-400 font-medium text-xs">
                        Select city
                      </Text>
                      <CustomDropDown
                        items={[
                          ...(citieList ?? []),
                          { lable: "Select City", value: "" },
                        ]?.map((s: any) => {
                          return { value: s?.iso2, label: s?.name };
                        })}
                        onSelect={(e: any) => {
                          const selectedState = e?.option;
                          console.log("selectedState", selectedState);

                          setPayload((prev: any) => ({
                            ...prev,
                            city: selectedState?.label,
                          }));
                        }}
                        selectedValue={{
                          label: payload?.city ?? "Select city",
                        }}
                        placeholder={"sad"}
                        setMainScrollState={true}
                        width={150}
                      />
                      {errors?.city ? (
                        <Error
                          text={errors?.city}
                          classN="text-center items-center mb-5"
                        />
                      ) : null}
                    </View>
                    <View className="my-2  mx-0 w-full ">
                      <Text className=" mx-1  text-gray-400 font-medium text-xs">
                        Postal code *
                      </Text>
                      <WFullInputField
                        textContentType="postalCode"
                        placeholder="Enter postal code "
                        className="h-5 text-sm "
                        value={payload?.postal_code}
                        onChangeText={(e: any) => {
                          setPayload((prev: any) => ({
                            ...prev,
                            postal_code: e,
                          }));
                        }}
                      />
                      {/* {errors?.phoneNumber ? (
                        <Error
                          text={errors?.phoneNumber}
                          classN="text-center items-center mb-5"
                        />
                      ) : null} */}
                      {/* {errors?.countryCode ? (
                        <Error
                          text={errors?.countryCode}
                          classN="text-center items-center mb-5"
                        />
                      ) : null} */}
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
                      handleSubmit();
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
export default EditOrganizationModal;
