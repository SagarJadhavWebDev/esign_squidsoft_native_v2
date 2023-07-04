import { useDispatch, useSelector } from "react-redux";
import {
  useAddresses,
  useCheckoutData,
  useUser,
} from "../../utils/useReduxUtil";
import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import getIpData from "../../utils/getIpData";
import Plans from "../Plans/Plans";
import { isEmpty, isNull } from "lodash";
import RazorpayCheckout from "react-native-razorpay";
import ApiConfig from "../../constants/ApiConfig";
import AppConfig from "../../constants/appConfig";
import {
  setPaymentIntent,
  setCurrentOrderId,
  setPaymentPending,
} from "../../redux/reducers/CheckoutSlice";
import { setSubscription } from "../../redux/reducers/SubscriptionSlice";
import {
  setIsLoading,
  showAddressModal,
  showStripeModal,
} from "../../redux/reducers/uiSlice";
import SubscriptionService from "../../services/SubscriptionService";
import auth from "../../utils/auth";
import WFullInputField from "../../components/atoms/WFullInputField";
import routes from "../../constants/routes";
import { Alert, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import GetSvg from "../../utils/GetSvg";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { ApplicationState } from "../../redux/store";
import AuthService from "../../services/AuthService";
import { setUser } from "../../redux/reducers/userSlice";
import { useToast } from "react-native-toast-notifications";
import React from "react";
import ManageAddress from "../Address/Address";
import AddAddressModal from "../../components/modals/AddAddressModal";
import Addressservice from "../../services/AddressService";
import { setAddresses } from "../../redux/reducers/AddressesSlice";
import apiEndpoint from "../../constants/apiEndpoints";
import { TextInput } from "react-native-gesture-handler";
interface CheckoutCardProps {
  navigation: any;
  route: any;
}
const CheckoutCard: React.FC<CheckoutCardProps> = ({ navigation, route }) => {
  const Plan = route?.params?.plan;
  const checkoutData = Plan;
  const dispatch = useDispatch();
  const user = useUser();
  const address = useAddresses();
  const [loading, setLoadiing] = useState(false);
  const [checkoutLoading, seCheckouttLoadiing] = useState(false);
  const toast = useToast();
  const [couponCode, setCouponCode] = useState<any>({
    coupon_code: null,
    discount: null,
    final_amount: null,
    gstin: user?.gstin ?? null,
    company_name: user?.company_name ?? null,
  });
  const [order, setOrder] = useState(null);

  const defaultAddress = address?.find((add) => add?.default);
  const discountPrice =
    checkoutData?.type === "Monthly"
      ? checkoutData?.price
      : checkoutData?.price -
        checkoutData?.price * (checkoutData?.discount / 100);
  const handleApplyCouponCode = () => {
    //console.log("CJECKOUT");
    if (defaultAddress) {
      setLoadiing(true);
      const payload = {
        type: "PLAN",
        id: Plan?.id,
        couponCode: couponCode?.coupon_code,
      };
      //console.log("COUPON CODE", payload);
      OrderService.handleApplyCoupnCode(payload, (data) => {
        if (data) {
          setCouponCode((prev: any) => ({
            ...prev,
            ...data,
          }));
          setLoadiing(false);
        } else {
          setCouponCode({
            coupon_code: null,
            discount: null,
            final_amount: null,
            gstin: user?.gstin ?? null,
            company_name: user?.company_name ?? null,
          });
          setLoadiing(false);
          toast.show("INVALID COUPON CODE ", { type: "error" });
        }
      });
    } else {
      // console.log("Please add address before checkout");
    }
  };
  const [errors, setErrors] = useState<any>(null);
  const [stripeReady, setStripeReady] = useState(false);
  const [intent, setIntent] = useState(null) as any;
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
  //const location = useLocation();
  // console.log("LOCATION", location?.state);
  //{"transaction_mode":"RAZORPAY","transaction_id":"pay_LPOe0mLPV2KDl6"}
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
      // console.log("sjwks", error);
    } else {
      setStripeReady(true);
    }
  };
  useEffect(() => {
    const existingStripeSheet = async () => {
      const { error, paymentOption } = await presentPaymentSheet();
      // console.log("ERROR:", error?.message, error?.localizedMessage);
      // console.log("RESPONSE:", paymentOption?.label, paymentOption?.image);
      if (error) {
        Alert.alert("Payment failed!");
        // console.log("sjwks", error);
      } else {
        dispatch(setPaymentPending(true));
        setStripeReady(false);
      }
    };
    if (stripeReady) {
      existingStripeSheet();
    }
  }, [stripeReady]);
  const handleActiveSubscription = async () => {
    seCheckouttLoadiing(true);

    await getIpData((ipData: any) => {
      // console.log("IP DATA", ipData);
      const payload = {
        type: "PLAN",
        plan_id: checkoutData?.id,
        billing_address_id: defaultAddress?.id,
        coupon_code: couponCode?.coupon_code,
        currency: ipData?.country_code === "IN" ? "INR" : "USD",
        subscription_id: null,
        gstin: couponCode?.gstin ?? null,
        company_name: couponCode?.company_name ?? null,
      };
      const validate = !isEmpty(couponCode?.gstin)
        ? isEmpty(couponCode?.gstin) && isEmpty(couponCode?.company_name)
        : true;
      if (ipData) {
        OrderService.handleCreateOrder(payload, async (data) => {
          setOrder(data);
          seCheckouttLoadiing(false);
          if (data && user) {
            // console.log("RAZR PAY PAYMENT ERR", data);
            seCheckouttLoadiing(false);
            setIntent(data?.payment_intent_id);
            const options: any = {
              key: ApiConfig.RAZORPAY_KEY,
              order_id: data?.payment_intent_id,
              currency: "INR",
              name: AppConfig.APP_NAME,
              description: `payment for ${Plan?.name}`,
              prefill: {
                name: user?.name,
                contact: user?.phone_number,
                email: user?.email,
              },
            };

            switch (data?.payment_intent_mode) {
              case "RAZORPAY":
                return RazorpayCheckout.open(options)
                  .then((res) => {
                    if (res?.razorpay_payment_id) {
                      const payload = {
                        id: order?.id,
                        transaction_mode: order?.payment_intent_mode,
                        transaction_id: res?.razorpay_payment_id,
                      };
                      OrderService.handleVerifyOrder(payload, (data) => {
                        if (data) {
                          SubscriptionService.handleGetSubscription((data) => {
                            dispatch(setSubscription(data));
                          });
                          AuthService.handleGetProfile((data) => {
                            if (data) {
                              dispatch(setUser(data));
                            }
                          });
                          navigation.navigate(routes.Subscriptions);
                        }
                      });
                    } else {
                      console.log("RAZR PAY PAYMENT ERR", res);
                    }
                  })
                  .catch((e) => {
                    console.log("RAZORPAY PAYMENT", e);
                  });

              case "STRIPE":
                dispatch(setCurrentOrderId(data?.id));
                dispatch(setPaymentIntent(data?.payment_intent_id));
                await initializeStripePaymentSheet(data?.payment_intent_id);
              default:
                return null;
            }
          } else {
            seCheckouttLoadiing(false);
          }
        });
      }
    });
  };
  const amount = (theform: any) => {
    console.log("AMOUNT", theform);
    let with2Decimals = theform?.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    return with2Decimals;
  };
  const paymentIntent = useSelector(
    (state: ApplicationState) => state?.checkoutData?.paymentIntent
  );
  const isPaymentSuccess = useSelector(
    (state: ApplicationState) => state?.checkoutData?.stripePaymentSuccess
  );
  const orderId = useSelector(
    (state: ApplicationState) => state?.checkoutData?.currentOrderId
  );
  useEffect(() => {
    if (isPaymentSuccess) {
      const payload = {
        id: orderId,
        transaction_mode: "STRIPE",
        transaction_id: paymentIntent,
      };
      OrderService.handleVerifyOrder(payload, (data) => {
        if (data) {
          //setIsVerified(true);
          setTimeout(() => {
            dispatch(setPaymentPending(false));
            // navigate(routes.Subscriptions);
          }, 2000);
        }
      });
    }
  }, [isPaymentSuccess]);
  const addressList = useAddresses();
  //console.log("addressList", addressList);
  return (
    <React.Fragment>
      <View className="w-[90%] mt-3 h-fit rounded-xl bg-gray-100 p-3 flex ">
        <View className="w-full p-2 flex flex-row justify-between   items-center">
          <Text className=" text-gray-500 font-semibold text-xs">
            Plan Name{" "}
          </Text>
          <Text className=" text-gray-800 font-bold text-xs">
            {Plan?.name + " "}
          </Text>
        </View>
        <View className="w-full p-2 flex flex-row justify-between   items-center">
          <Text className=" text-gray-500 font-semibold text-xs">
            Plan Duration{"  "}
          </Text>
          <Text className=" text-gray-800 font-bold text-xs">
            1 {checkoutData?.type === "Monthly" ? "Month " : "Year "}
          </Text>
        </View>
        {!isNull(couponCode?.discount) ? (
          <View className="w-full p-2 flex flex-row justify-between   items-center">
            <Text className=" text-gray-500 font-semibold text-xs">
              Discount{"  "}
            </Text>
            <Text className=" text-gray-800 font-bold text-xs">
              ${discountPrice - couponCode?.final_amount}{" "}
            </Text>
          </View>
        ) : null}
        {!isNull(couponCode?.discount) ? (
          <View className="w-full p-2 flex flex-row justify-between   items-center">
            <Text className=" text-gray-500 font-semibold text-xs">
              Discount Percentage{"  "}
            </Text>
            <Text className=" text-gray-800 font-bold text-xs">
              {couponCode?.discount}%{" "}
            </Text>
          </View>
        ) : null}
        <View className="w-full p-2 flex flex-row justify-between   items-center">
          <Text className=" text-gray-500 font-semibold text-xs">
            Total Cost{"  "}
          </Text>
          <Text className=" text-gray-800 font-bold text-xs">
            $
            {!isNull(couponCode?.final_amount)
              ? amount(couponCode?.final_amount)
              : amount(discountPrice)}
          </Text>
        </View>
        {/* <View className="w-full h-20 flex flex-row justify-center items-center">
           <View className="w-[80%]">
            <Text className=" mx-1 text-gray-400 font-medium text-xs">
              Coupon Code
            </Text>
            <WFullInputField
              // secureTextEntry={Showpasswords.old_password}

              placeholder="Enter coupon code"
              onChangeText={(e: any) => {
                setCouponCode((prev: any) => ({
                  ...prev,
                  coupon_code: e,
                }));
              }}
              value={couponCode?.coupon_code}
              className="h-5 text-sm  "
            />
          </View>
          <View className="w-[15%] flex justify-center items-center">
            <TouchableOpacity
              onPress={() => {
                if (!isNull(couponCode?.final_amount)) {
                  setCouponCode({
                    coupon_code: null,
                    discount: null,
                    final_amount: null,
                    gstin: user?.gstin ?? null,
                    company_name: user?.company_name ?? null,
                  });
                } else {
                  handleApplyCouponCode();
                }
              }}
            >
              {!isNull(couponCode?.final_amount) ? (
                <GetSvg
                  name="closeIcon"
                  color={"red"}
                  className="w-3.5 h-3.5 "
                />
              ) : (
                <GetSvg
                  name="tickIconRounded"
                  color={"green"}
                  className="w-3.5 h-3.5 "
                />
              )}
            </TouchableOpacity>
          </View> 
          
        </View> */}
        <View className="w-full p-2 flex flex-row justify-center   items-center">
          <WFullInputField
            // secureTextEntry={Showpasswords.old_password}

            placeholder="Enter coupon code"
            onChangeText={(e: any) => {
              setCouponCode((prev: any) => ({
                ...prev,
                coupon_code: e,
              }));
            }}
            value={couponCode?.coupon_code}
            className="h-5 w-[80%] text-sm  "
          />
          <TouchableOpacity
            onPress={() => {
              if (!isNull(couponCode?.final_amount)) {
                setCouponCode({
                  coupon_code: null,
                  discount: null,
                  final_amount: null,
                  gstin: user?.gstin ?? null,
                  company_name: user?.company_name ?? null,
                });
              } else {
                handleApplyCouponCode();
              }
            }}
            className="mx-3 bg-[#d10000] rounded-full  p-1.5 px-4"
          >
            {!isNull(couponCode?.final_amount) ? (
              <Text className="text-white text-xs font-extrabold ">
                Remove{" "}
              </Text>
            ) : (
              <Text className="text-white text-xs font-extrabold">Apply</Text>
            )}

            {/* <GetSvg name="rightArrowIcon" classN="w-3 h-3" color="white" /> */}
          </TouchableOpacity>
        </View>
        <View className=" w-full mt-5 flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              // navigation.push(routes.dashboard);
              navigation.pop();
            }}
            className=" bg-slate-800  rounded-full p-1.5 px-4"
          >
            <Text className="text-white text-xs font-extrabold ">Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (defaultAddress) {
                // console.log("NEXT", defaultAddress);
                handleActiveSubscription();
              } else {
                toast.show("Please add address before checkout", {
                  type: "error",
                });
              }
            }}
            className=" bg-[#d10000] rounded-full  p-1.5 px-4"
          >
            <Text className="text-white text-xs font-extrabold">Next </Text>
            {/* <GetSvg name="rightArrowIcon" classN="w-3 h-3" color="white" /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-[90%] mt-3 h-fit rounded-xl bg-gray-50 px-5 py-3 flex ">
        <Text className="text-gray-600 mb-3 text-xs font-semibold">
          Select your billing address
        </Text>
        <View className="w-full flex gap-y-3">
          {addressList?.map((a: any) => {
            return (
              <View
                key={a?.id}
                className="w-full flex flex-col border  border-gray-300  p-4 rounded-xl"
              >
                <View className="w-full flex flex-row gap-x-2 justify-start items-center  ">
                  <GetSvg
                    className="text-gray-900 h-7 w-[10%] my-3 rounded-full"
                    name="locationIcon"
                    strokeWidth={1.5}
                  />
                  <Text className="text-[12px]   font-medium text-gray-900 pl-1 w-[70%] ">
                    {a?.address_line} , {a?.street} , {a?.state} , {a?.country}{" "}
                    , {a?.postal_code}
                  </Text>
                  <View className=" w-[20%] flex flex-row justify-between items-center md:cursor-pointer">
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setIsLoading(true));
                        Addressservice.handleSetDefaultAddresses(
                          a?.id,
                          toast,
                          (data) => {
                            dispatch(setAddresses(data));
                            dispatch(setIsLoading(false));
                            toast.show("address set to default successfully", {
                              type: "success",
                            });
                          }
                        );
                      }}
                    >
                      <GetSvg
                        name="tickIconRounded"
                        color={a?.default ? "green" : "black"}
                        className="w-3.5 h-3.5 "
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setIsLoading(true));
                        Addressservice.handleDeleteAddresses(
                          a?.id,
                          toast,
                          (data) => {
                            // setAddress(data);
                            dispatch(setAddresses(data));
                            dispatch(setIsLoading(false));
                            toast.show("address deleted successfully", {
                              type: "success",
                            });
                          }
                        );
                      }}
                      //title="Delete Address"
                      className="p-1 rounded-full hover:bg-gray-300 "
                    >
                      <GetSvg name="deleteIcon" className="w-3.5 h-3.5" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <TouchableOpacity className="flex  mt-3 flex-row justify-center items-center rounded-xl bg-red-500 p-2">
          <Text
            onPress={() => {
              dispatch(showAddressModal(true));
              //setIsOpen(true);
            }}
            className="text-white text-xs w-full text-center font-semibold"
          >
            Add New Address{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <AddAddressModal />
    </React.Fragment>
  );
};
export default CheckoutCard;
