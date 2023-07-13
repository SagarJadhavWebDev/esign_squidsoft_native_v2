import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import GetSvg from "../../utils/GetSvg";
import WFullInputField from "../atoms/WFullInputField";
import CustomDropDown from "../molecules/CustomDropDown";
import { useEffect, useState } from "react";
import CountryService from "../../services/CountryService";
import { isEmpty } from "lodash";
import Addressservice from "../../services/AddressService";
import { setAddresses } from "../../redux/reducers/AddressesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, showAddressModal } from "../../redux/reducers/uiSlice";
import { ApplicationState } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import AddressValidations from "../../validations/AddressValidations";
import serializeYupErrors from "../../utils/SerializeErrors";
import Error from "../atoms/Error";

interface AddAddressModalProps {}
const AddAddressModal: React.FC<AddAddressModalProps> = ({}) => {
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.showAddressModal
  );
  const [mainScroll, setMainScroll] = useState(true);
  const [countryList, setcountryList] = useState<any>([]);
  const [StateList, setStateList] = useState<any>([]);
  const [citieList, setcitieList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const countryList = useCountryList();
  // const StateList = useStateList(); //[{ name: "Select State", iso2: "" }, ...useStateList()];
  // const citieList = useCitiesList(); //[{ name: "Select State", iso2: "" }, ...useCitiesList()];
  const [errors, setErrors] = useState<any>(null);
  const [payload, setPayload] = useState({
    address_line: null,
    street: null,
    city: null,
    state: null,
    country: null,
    country_code: null,
    postal_code: null,
  });
  const handleGetCountry = () => {
    CountryService.handleGetCountry((data) => {
      setcountryList(data);
    });
  };
  const handleCountryChange = (countryCode: string) => {
    CountryService.handleGetStatesCity(countryCode, (data) => {
      setStateList(data);
    });
  };

  const handleCityChange = (countryCode: string, stateCode: string) => {
    CountryService.handleGetCities(countryCode, stateCode, (data) => {
      setcitieList(data);
    });
  };
  useEffect(() => {
    handleGetCountry();
  }, []);
  //console.log("VALUES", payload);
  const dispatch = useDispatch();
  const toast = useToast();
  return (
    <Modal
      key={"EDITPROFILE"}
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        dispatch(showAddressModal(false));
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
                <Text className="text-base mx-5 font-medium">Add Address </Text>

                <Pressable
                  onPress={() => {
                    dispatch(showAddressModal(false));
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
                    Address Line
                  </Text>
                  <WFullInputField
                    // secureTextEntry={Showpasswords.old_password}
                    textContentType="fullStreetAddress"
                    placeholder="Enter your Address Line"
                    onChangeText={(e: any) => {
                      // console.log("SAGAR", e);
                      setPayload((prev) => ({
                        ...prev,
                        address_line: e,
                      }));
                    }}
                    className="h-5 text-sm  "
                    error={errors?.address_line}
                  />
                </View>
                <View className="">
                  <Text className=" mx-1 text-gray-400 font-medium text-xs">
                    Street
                  </Text>
                  <WFullInputField
                    textContentType="streetAddressLine1"
                    // secureTextEntry={Showpasswords.old_password}
                    placeholder="Enter your Street"
                    // onChangeText={(e: any) => {
                    //   setPasswordsValue((prev: any) => ({
                    //     ...prev,
                    //     old_password: e,
                    //   }));
                    // }}
                    onChangeText={(e: any) => {
                      setPayload((prev) => ({
                        ...prev,
                        street: e,
                      }));
                    }}
                    className="h-5 text-sm  "
                    error={errors?.street}
                  />
                </View>
                <View className="mb-1">
                  <Text className=" mx-1 my-1 text-gray-400 font-medium text-xs">
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
                      setPayload((prev) => ({
                        ...prev,
                        country_code: selectedCountry?.value,
                        country: selectedCountry?.label,
                      }));
                    }}
                    selectedValue={{
                      label: payload?.country ?? "Select country",
                    }}
                    placeholder={"sad"}
                    setMainScrollState={setMainScroll}
                    width={150}
                  />
                  {errors?.country ? <Error text={errors?.country} /> : null}
                </View>
                <View className="">
                  <Text className=" mx-1 text-gray-400 font-medium text-xs">
                    Country Code
                  </Text>
                  <WFullInputField
                    // secureTextEntry={Showpasswords.old_password}
                    textContentType="fullStreetAddress"
                    placeholder="Enter your Street"
                    // onChangeText={(e: any) => {
                    //   setPasswordsValue((prev: any) => ({
                    //     ...prev,
                    //     old_password: e,
                    //   }));
                    // }}
                    className="h-5 text-sm  "
                    value={payload?.country_code ?? ""}
                    editable={false}
                    error={errors?.country_code}
                  />
                </View>
                <View className="mb-1">
                  <Text className=" mx-1 my-1 text-gray-400 font-medium text-xs">
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
                      // console.log("selectedState", selectedState);
                      handleCityChange(
                        payload?.country_code ?? "",
                        selectedState?.value
                      );
                      setPayload((prev) => ({
                        ...prev,
                        state: selectedState?.label,
                      }));
                    }}
                    selectedValue={{
                      label: payload?.state ?? "Select state",
                    }}
                    placeholder={"sad"}
                    setMainScrollState={setMainScroll}
                    width={150}
                  />
                  {errors?.state ? <Error text={errors?.state} /> : null}
                </View>
                <View className="mb-1">
                  <Text className=" mx-1 my-1 text-gray-400 font-medium text-xs">
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
                      //console.log("selectedState", selectedState);

                      setPayload((prev) => ({
                        ...prev,
                        city: selectedState?.label,
                      }));
                    }}
                    selectedValue={{ label: payload?.city ?? "Select city" }}
                    placeholder={"sad"}
                    setMainScrollState={setMainScroll}
                    width={150}
                  />
                   {errors?.city ? <Error text={errors?.city} /> : null}
                  
                </View>
                <View className="">
                  <Text className=" mx-1 text-gray-400 font-medium text-xs">
                    Postal Code
                  </Text>
                  <WFullInputField
                    // secureTextEntry={Showpasswords.old_password}
                    textContentType="postalCode"
                    placeholder="Enter your postal code"
                    onChangeText={(e: any) => {
                      setPayload((prev) => ({
                        ...prev,
                        postal_code: e,
                      }));
                    }}
                    className="h-5 text-sm  "
                    error={errors?.postal_code}
                  />
                </View>
              </ScrollView>
              <View className="w-full justify-end items-center flex flex-row my-4 ">
                <Text
                  onPress={() => {
                    dispatch(showAddressModal(false));
                  }}
                  className="p-2 bg-slate-800 w-24 text-center text-xs text-white rounded-full "
                >
                  Cancel
                </Text>
                <Text
                  onPress={() => {
                    setIsLoading(true);

                    AddressValidations.validate(payload, { abortEarly: false })
                      .catch((err) => {
                        setErrors(serializeYupErrors(err));
                        console.log("ERR", err);
                        setIsLoading(false);
                      })
                      .then((res) => {
                        if (res !== undefined) {
                          Addressservice.handleCreateAddresses(
                            payload,
                            toast,
                            (data) => {
                              if (data) {
                                dispatch(showAddressModal(false));
                                setIsLoading(false);
                                //setAddresses(datae);
                                dispatch(setAddresses(data));
                              } else {
                                setIsLoading(false);
                                //dispatch(setIsLoading(false));
                              }
                            }
                          );
                        }
                      });
                  }}
                  className="p-2 bg-[#d10000] w-24 text-center text-xs text-white rounded-full mx-5"
                >
                  {isLoading ? " Submiting" : " Submit"}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddAddressModal;
