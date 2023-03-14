import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import imageConstants from "../../constants/imageConstants";
import routes from "../../constants/routes";
import { activateTrial } from "../../utils/activateTrial";
import GetSvg from "../../utils/GetSvg";
import dayjs from "dayjs";
import { Country, State, City } from "country-state-city";
import { isEmpty, isNull, omit } from "lodash";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import useAuth from "../../utils/auth";
import { useToast } from "react-native-toast-notifications";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";
import getUsdRate from "../../utils/getUsdRate";
import AppConfig from "../../constants/appConfig";
import ApiConfig from "../../constants/ApiConfig";
import StripePaymentModal from "../../components/modals/StripePaymentModal";
import { usePaymentSheet, useStripe } from "@stripe/stripe-react-native";
import getIpData from "../../utils/getIpData";
import CustomDropDown from "../../components/molecules/CustomDropDown";

interface CheckoutProps {
  navigation: any;
  route: any;
}
const Checkout: React.FC<CheckoutProps> = ({ navigation, route }) => {
  const Plan = route?.params?.plan;
  const [isLoading, setIsLoading] = useState(false);
  const { token, auth, RefreshUser } = useAuth();
  const isYearly = Plan?.for === "Yearly";
  const [orderId, setOrderId] = useState<any>();
  const toast = useToast();
  const [usdRate, setUsdRate] = useState<any>();
  const [percentage, setPercantage] = useState<any>(null);
  const [intent, setIntent] = useState(null) as any;
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [payableAmount, setPayableAmount] = useState<any>();
  const [mainScroll, setMainScroll] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(null) as any;
  const [addressPayload, setPayload] = useState({
    name: null,
    address: null,
    taxno: null,
    zipcode: null,
  });
  const [couperCode, setCoupenCode] = useState({
    value: null,
    applied: false,
  });
  const xyz = omit(addressPayload, ["taxno"]);
  const isPayButtonDisable =
    Object.values(xyz).every((o) => !isNull(o) && !isEmpty(o)) &&
    Object.values(selectedOptions).every(
      (o: any) => !isNull(o?.value) && !isEmpty(o?.value)
    );
  console.log("ADDERS PAYLOAD", isPayButtonDisable);
  const [stateList, setStateList] = useState([]) as any;
  const [cityList, setCityList] = useState([]) as any;
  const [countryOptions, setCountryOptions] = useState([]) as any;
  const [stateOptions, setStateOptions] = useState([]) as any;
  const [cityOptions, setCityOptions] = useState([]) as any;

  useEffect(() => {
    HttpService.get(apiEndpoints.getCountries, { token: "" }).then(
      (res: any) => {
        res?.map((c: any) => {
          countryOptions?.push({
            value: c?.iso2,
            label: c?.name,
          });
        });
        getIpData((data: any) => {
          console.log("ANY:", data);
          setSelectedOptions({
            country: {
              label: data?.country,
              value: data?.country_code,
            },
            state: {
              label: data?.state,
              value: data?.state,
            },
            city: {
              label: data?.city,
              value: data?.city,
            },
          });
        });
      }
    );
  }, []);

  const getState = (country_code: string) => {
    HttpService.get(apiEndpoints.getStates(country_code), {
      token: "",
    }).then((res: any) => {
      if (res) {
        console.log(res);
        setStateList(res);
      }
    });
  };

  const getCity = (country_code: string, state_code: string) => {
    HttpService.get(apiEndpoints.getCities(country_code, state_code), {
      token: "",
    }).then((res: any) => {
      if (res) {
        setCityList(res);
      }
    });
  };

  useEffect(() => {
    console.log("CONSOLE STATE LIST:", stateList.length);
    stateList?.map((c: { iso2: any; name: any }, i: any) => {
      stateOptions?.push({
        value: c.iso2,
        label: c.name,
      });
    });
  }, [stateList]);

  useEffect(() => {
    cityList?.map((c: { name: any }, i: any) => {
      cityOptions?.push({
        value: c.name,
        label: c.name,
      });
    });
  }, [cityList]);

  const handleCountryChange = (event: any) => {
    console.log("COUNTRY:", event);
    setSelectedOptions({
      country: event?.option,
      state: null,
      city: null,
    });
    setStateOptions([]);
    setCityOptions([]);
    setStateList([]);
    getState(event?.option?.value);
  };

  const handleStateChange = (event: any) => {
    setSelectedOptions({
      country: selectedOptions?.country,
      state: event?.option,
      city: null,
    });
    setCityOptions([]);
    setCityList([]);
    getCity(selectedOptions?.country?.value, event?.option?.value);
  };

  const handleCityChange = (event: any) => {
    // setStateList([]);
    setSelectedOptions({
      country: selectedOptions?.country,
      state: selectedOptions?.state,
      city: event?.option,
    });
  };

  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading,
    confirmPaymentSheetPayment,
  } = usePaymentSheet();
  const { confirmPayment, retrievePaymentIntent, handleNextAction } =
    useStripe();
  const [stripeReady, setStripeReady] = useState(false);

  const customAppearance = {
    // font: {
    //   family:
    //     Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
    // },
    shapes: {
      borderRadius: 12,
      borderWidth: 0.5,
    },
    primaryButton: {
      shapes: {
        borderRadius: 20,
      },
      colors: {
        background: "#d10000",
        text: "#ffffff",
        // border: "none",
      },
    },
    colors: {
      primary: "#fcfdff",
      background: "#ffffff",
      componentBackground: "#f3f8fa",
      componentBorder: "#f3f8fa",
      componentDivider: "#000000",
      primaryText: "#000000",
      secondaryText: "#000000",
      componentText: "#000000",
      placeholderText: "#73757b",
    },
  };

  const initializeStripePaymentSheet = async (intent: any) => {
    const { error } = await initPaymentSheet({
      appearance: customAppearance,
      merchantDisplayName: AppConfig.APP_NAME,
      paymentIntentClientSecret: intent,
      allowsDelayedPaymentMethods: true,
      primaryButtonLabel: "Submit",
      style: "automatic",
    });
    if (error) {
      setStripeReady(false);
      Alert.alert("Something went wrong!");
    } else {
      setStripeReady(true);
    }
  };

  useEffect(() => {
    const existingStripeSheet = async () => {
      const { error, paymentOption } = await presentPaymentSheet();
      console.log("ERROR:", error?.message, error?.localizedMessage);
      console.log("RESPONSE:", paymentOption?.label, paymentOption?.image);
      if (error) {
        Alert.alert("Payment failed!");
      } else {
        const payment_intent = intent && intent.split("_secret_")?.[0];
        const verifyPayload = {
          transaction_id: payment_intent,
          transaction_mode: "STRIPE",
          transaction_method: "CARD",
          additional_fields: intent,
        };
        handleVerifyPayment(verifyPayload);
      }
    };
    if (stripeReady) {
      existingStripeSheet();
    }
  }, [stripeReady]);

  const handleFetchIntent = (order_id: any, amount: any) => {
    HttpService.post(apiEndpoints.fetchPaymentIntent(order_id, amount), {
      token: token,
      body: JSON.stringify({
        email: auth?.user?.email,
        name: auth?.user?.name,
      }),
    })
      .then(async (res) => {
        console.log("FETCH INTENT RES", res);
        if (res?.status) {
          setIntent(res?.client_secret);
          setIsLoading(false);
          console.log("LOADING STRIPE:", loading, presentPaymentSheet());
          await initializeStripePaymentSheet(res?.client_secret);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("FETCH PAYMENT INTENT ERR", err);
      });
  };

  const handleCheckout = () => {
    setIsLoading(true);
    getIpData((ipdata: any) => {
      const dataPayload = {
        plan_id: Plan?.id,
        isYearly: isYearly,
        couponcode: couperCode,
        amount: payableAmount,
        name: addressPayload?.name,
        taxno: addressPayload?.taxno,
        address: addressPayload?.address,
        zipcode: addressPayload?.zipcode,
        country: selectedOptions?.country?.value,
        state: selectedOptions?.state?.value,
        city: selectedOptions?.city?.value,
      };
      HttpService.post(apiEndpoints.getOrders, {
        token: token,
        body: JSON.stringify(dataPayload),
      })
        .then((res) => {
          if (res?.message) {
            toast.show(res?.message, { type: "error" });
          } else {
            setOrderId(res?.id);
            if (res?.id && usdRate) {
              if (ipdata?.country_code === "IN") {
                const amount = res?.amount * (usdRate ?? 0);
                const options: any = {
                  key: ApiConfig.RAZORPAY_KEY,
                  amount: amount * 100,
                  currency: "INR",
                  name: AppConfig.APP_NAME,
                  description: `payment for ${Plan?.name}`,
                  prefill: {
                    name: auth?.user.name as string,
                    contact: auth?.user.phone_number as string,
                    email: auth?.user.email as string,
                  },
                };
                //FOR INDIAN USER
                RazorpayCheckout.open(options)
                  .then((res) => {
                    const verifyPayload = {
                      transaction_id: res?.razorpay_payment_id,
                      transaction_mode: "RAZOR_PAY",
                      transaction_method: "CARD",
                      additional_fields: "RESPONSE",
                    };
                    handleVerifyPayment(verifyPayload);
                  })
                  .catch((err) => {
                    setIsLoading(false);
                    console.log("RAZORPAY ERR", err);
                  });
              } else {
                //FOR OTHER USERS
                handleFetchIntent(res?.id, res?.amount);
              }
            }
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("ORDER CREATION ERR PAYMENT GATEWAY", err);
        });
    });
  };

  const handleVerifyPayment = (payload: any) => {
    HttpService.post(apiEndpoints.verifyPayment(orderId), {
      token: token,
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res?.message) {
          toast.show(res?.message, { type: "success" });
        }
        setIsLoading(false);
        RefreshUser && RefreshUser(token);
        navigation.navigate(routes.Subscriptions);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("VERIFY PAYMENT ERR");
      });
  };

  const handleCoupenCode = () => {
    setIsLoading(true);
    HttpService.post(
      apiEndpoints.applyCoupenCode(couperCode?.value, Plan?.id),
      {
        token: token,
      }
    )
      .then((res: any) => {
        if (res?.message) {
          toast?.show(res?.message, { type: "error" });
          setCoupenCode((prev: any) => ({
            ...prev,
            applied: false,
            value: null,
          }));
          setIsLoading(false);
        } else {
          let differencevalue = (res?.discount / 100) * payableAmount;
          setCoupenCode((prev: any) => ({
            ...prev,
            applied: true,
          }));
          setPercantage(res?.discount);
          setPayableAmount(payableAmount - differencevalue);
          setIsLoading(false);
          toast?.show("Coupen code applied successfully", { type: "success" });
        }
      })
      .catch((err) => {
        console.log("APPLY COUPEN CODE ERR", err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getUsdRate(token, setUsdRate);
  }, []);

  useEffect(() => {
    setPayableAmount(
      isYearly
        ? Plan?.monthly_price * (12 - Plan?.yearly_discount)
        : Plan?.monthly_price
    );
  }, [Plan]);
  console.log(Plan?.monthly_price)
  return (
    <View className="w-full h-full items-center bg-white  ">
      <View className="w-full h-12 border-b border-gray-300 justify-between items-center flex flex-row   ">
        <Text className="text-base mx-5 font-semibold">{"Plans"}</Text>
        <Pressable
          onPress={() => {
            navigation.pop();
          }}
        >
          <GetSvg name="closeWithoutCircleIcon" classN="mx-3 w-5 h-5" />
        </Pressable>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        className="w-full max-w-lg "
        scrollEnabled={mainScroll}
      >
        <View className="w-full h-24 mx-auto   ">
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={imageConstants.eSignLogo}
          />
          <Text className="text-gray-900 font-semibold text-center text-xl">
            Review Order
          </Text>
        </View>

        <View className="w-full h-full  items-center mx-auto pb-5 my-8">
          <Text className="text-xs text-center text-gray-400 font-semibold my-2 w-full">
            Take a review of order and proceed{" "}
          </Text>

          <>
            <View className="w-[80%] my-2  max-h-max  border border-gray-300 rounded-xl  ">
              <View className="  p-2 w-full">
                <View className="w-full  justify-center items-center ">
                  <Text className=" text-gray-700 text-base my-2 font-semibold">
                    Plan Details{" "}
                  </Text>
                </View>
                <View className=" flex flex-row justify-between mx-2 my-1 ">
                  <Text className="font-semibold text-xs text-gray-600">
                    Purchase Date{" "}
                  </Text>
                  <Text className="font-semibold text-xs">
                    {dayjs().format("DD MMM , YYYY")}{" "}
                  </Text>
                </View>
                <View className=" flex flex-row justify-between mx-2 my-1 ">
                  <Text className="font-semibold text-xs text-gray-600">
                    Expiry Date{" "}
                  </Text>
                  <Text className="font-semibold text-xs">
                    {dayjs()
                      .add(isYearly ? 360 : 30, "days")
                      .format("DD MMM, YYYY")}{" "}
                  </Text>
                </View>
                <View className=" flex flex-row justify-between mx-2 my-1 ">
                  <Text className="font-semibold text-xs text-gray-600">
                    Plan Type{" "}
                  </Text>
                  <Text className="font-semibold text-xs">{Plan?.name} </Text>
                </View>
                <View className=" flex flex-row justify-between mx-2 my-1 ">
                  <Text className="font-semibold text-xs text-gray-600">
                    Envelope Sents{" "}
                  </Text>
                  <Text className="font-semibold text-xs">
                    {Plan?.total_envelopes_sents}
                  </Text>
                </View>
                <View className=" flex flex-row justify-between mx-2 my-1 ">
                  <Text className="font-semibold text-xs text-gray-600">
                    Plan Cost{" "}
                  </Text>
                  <Text className="font-semibold text-xs">
                    $
                    {isYearly
                      ? Plan?.monthly_price * (12 - Plan?.yearly_discount)
                      : Plan?.monthly_price} {" "}
                  </Text>
                </View>
                <View className=" flex flex-row justify-between mx-2 my-1 ">
                  <Text className="font-semibold text-xs text-gray-600">
                    Payable Cost{" "}
                  </Text>
                  <Text className="font-semibold text-xs">
                    ${payableAmount}{" "}
                  </Text>
                </View>
                <View className=" flex flex-col mb-1 mt-3 mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    Full Name *
                  </Text>
                  <TextInput
                    onChangeText={(e) => {
                      setPayload((prev: any) => ({
                        ...prev,
                        name: e,
                      }));
                    }}
                    className="border text-xs border-gray-300 p-1 px-2  rounded-lg   h-8"
                    keyboardType="default"
                  />
                </View>
                <View className=" flex flex-col my-1  mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    Tax No (optional)
                  </Text>
                  <TextInput
                    onChangeText={(e) => {
                      setPayload((prev: any) => ({
                        ...prev,
                        taxno: e,
                      }));
                    }}
                    className="border text-xs border-gray-300 p-1 px-2  rounded-lg   h-8"
                    keyboardType="default"
                  />
                </View>
                <View className=" flex flex-col my-1  mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    Address *
                  </Text>
                  <TextInput
                    onChangeText={(e) => {
                      setPayload((prev: any) => ({
                        ...prev,
                        address: e,
                      }));
                    }}
                    className="border text-xs border-gray-300 p-1 px-2  rounded-lg   h-8"
                    keyboardType="default"
                  />
                </View>
                <View className=" flex flex-col my-1  mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    Zip/Pin Code *
                  </Text>
                  <TextInput
                    onChangeText={(e) => {
                      setPayload((prev: any) => ({
                        ...prev,
                        zipcode: e,
                      }));
                    }}
                    className="border text-xs border-gray-300 p-1 px-2  rounded-lg   h-8"
                    keyboardType="default"
                  />
                </View>
                <View className=" flex flex-col my-1  mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    Country *
                  </Text>
                  {/* <TextInput
                    onChangeText={(e) => {
                      setPayload((prev: any) => ({
                        ...prev,
                        country: e,
                      }));
                    }}
                    className="border text-xs border-gray-300 p-1 px-2  rounded-lg   h-8"
                    keyboardType="default"
                  /> */}
                  <CustomDropDown
                    items={countryOptions}
                    onSelect={handleCountryChange}
                    selectedValue={selectedOptions?.country}
                    placeholder={""}
                    setMainScrollState={setMainScroll}
                    width={150}
                  />
                </View>
                <View className=" flex flex-col my-1  mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    State *
                  </Text>
                  {/* <TextInput
                    onChangeText={(e) => {
                      setPayload((prev: any) => ({
                        ...prev,
                        state: e,
                      }));
                    }}
                    className="border text-xs border-gray-300 p-1 px-2  rounded-lg   h-8"
                    keyboardType="default"
                  /> */}
                  <CustomDropDown
                    items={stateOptions}
                    onSelect={handleStateChange}
                    selectedValue={selectedOptions?.state}
                    placeholder={""}
                    setMainScrollState={setMainScroll}
                    width={150}
                  />
                </View>
                <View className=" flex flex-col my-1  mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    City *
                  </Text>
                  {/* <TextInput
                    onChangeText={(e) => {
                      setPayload((prev: any) => ({
                        ...prev,
                        city: e,
                      }));
                    }}
                    className="border text-xs border-gray-300 p-1 px-2  rounded-lg   h-8"
                    keyboardType="default"
                  /> */}
                  <CustomDropDown
                    items={cityOptions}
                    onSelect={handleCityChange}
                    selectedValue={selectedOptions?.city}
                    placeholder={""}
                    setMainScrollState={setMainScroll}
                    width={150}
                  />
                </View>
                <View className=" flex flex-col my-1   mx-2 ">
                  <Text className="font-semibold mx-1 my-1  text-[12px] ">
                    Coupon Code
                  </Text>
                  <View className="flex flex-row   border border-gray-300 w-full items-center   rounded-lg ">
                    <TextInput
                      onChangeText={(e) => {
                        setCoupenCode((prev: any) => ({
                          ...prev,
                          value: e,
                        }));
                      }}
                      className=" w-[85%] text-xs p-1 px-2 border-none   h-8"
                      keyboardType="default"
                      value={couperCode?.value ?? ""}
                    />

                    {couperCode.applied ? (
                      <TouchableOpacity
                        onPress={() => {
                          setCoupenCode({
                            value: null,
                            applied: false,
                          });
                          setPayableAmount(
                            isYearly
                              ? Plan?.monthly_price *
                                  (12 - Plan?.yearly_discount)
                              : Plan?.monthly_price
                          );
                        }}
                        className="w-full "
                      >
                        <GetSvg name="closeIcon" classN="w-[15%] h-5 " />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          console.log("tick press");
                          handleCoupenCode();
                        }}
                        className="w-full "
                      >
                        <GetSvg
                          name="tickIcon"
                          classN="w-[15%] h-5 "
                          color={!couperCode.applied ? "black" : "green"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View className="flex flex-row justify-around  mt-4 w-full">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    className={`w-32 h-8  mb-2   justify-center items-center  mx-auto flex flex-row 
                     bg-slate-800 rounded-full
                  `}
                  >
                    <Text className="text-center text-xs text-white">
                      Cancel{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (!isPayButtonDisable) {
                        return;
                      } else {
                        console.log(addressPayload);
                        handleCheckout();
                      }
                    }}
                    className={`w-32 h-8  mb-2   justify-center items-center rounded-full mx-auto flex flex-row 
                    ${!isPayButtonDisable ? "bg-[#d1000099]" : "bg-[#d10000]"}
                  `}
                  >
                    <Text className="text-center text-xs text-white w-full">
                      Proceed to Pay{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        </View>
      </ScrollView>
      {isLoading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
      {showStripeModal ? (
        <StripePaymentModal
          isOpen={showStripeModal}
          setIsOpen={setShowStripeModal}
          token={token ?? ""}
          intent={intent}
          addressPayload={addressPayload}
          user={auth?.user}
          setIsLoading={setIsLoading}
        />
      ) : null}
    </View>
  );
};

export default Checkout;
