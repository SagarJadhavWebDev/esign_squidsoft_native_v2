import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import routes from "../../constants/routes";
import { calcDate, convertDate } from "../../utils/dateConvertor";
import { Subscription } from "../../types/SubscriptionTypes";
import getLocalDate from "../../utils/getLocalDate";
import { order } from "../../types/OrderTypes";
import RazorpayCheckout from "react-native-razorpay";
import ApiConfig from "../../constants/ApiConfig";
import AppConfig from "../../constants/appConfig";
import { useUser } from "../../utils/useReduxUtil";
import SubscriptionService from "../../services/SubscriptionService";
import { useDispatch } from "react-redux";
import { setSubscription } from "../../redux/reducers/SubscriptionSlice";
import AuthService from "../../services/AuthService";
import { setUser } from "../../redux/reducers/userSlice";
import {
  setCurrentOrderId,
  setPaymentIntent,
  setPaymentPending,
} from "../../redux/reducers/CheckoutSlice";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { setIsLoading } from "../../redux/reducers/uiSlice";
import OrderService from "../../services/OrderService";
import { setOrders } from "../../redux/reducers/OrdersSlice";

interface OrderCardProps {
  order: order;
  type: "subscription" | "orders";
  navigation: any;
}
const OrderCard: React.FC<OrderCardProps> = ({ order, type, navigation }) => {
  const user = useUser();
  const dispatch = useDispatch();
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
      //console.log("ERROR:", error?.message, error?.localizedMessage);
      //console.log("RESPONSE:", paymentOption?.label, paymentOption?.image);
      if (error) {
        Alert.alert("Payment failed!");
      } else {
        dispatch(setPaymentPending(true));
      }
    };
    if (stripeReady) {
      existingStripeSheet();
    }
  }, [stripeReady]);
  const handleCancelOrder = (currentOrder: any) => {
    //dispatch(setshowConfirmDeleteModal(false));
    dispatch(setIsLoading(true));
    OrderService.handleCancelOrder(currentOrder?.id, (data) => {
      if (data) {
        dispatch(setOrders(data));
        dispatch(setIsLoading(false));
      } else {
        dispatch(setIsLoading(false));
      }
    });
  };
  return (
    <View className="rounded-xl border w-full border-gray-300 bg-white p-2 px-3 my-1">
      <View className="w-full flex flex-row my-1">
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Created at :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {getLocalDate(order?.created_at).format("DD/MM/YYYY")}
          </Text>
        </View>

        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Plan Name :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {order?.associated_plan?.name}
          </Text>
        </View>
        {order?.status === "FULFILLED" ? (
          <View className="w-1/3 flex justify-center items-center ">
            <TouchableOpacity
              className={`bg-green-400 p-2 rounded-full px-5 mr-0.5 `}
            >
              <Text className="text-white w-full text-[10px] font-semibold">
                {order?.status + " "}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="w-1/3 flex justify-center items-center ">
            <TouchableOpacity
              onPress={async () => {
                const options: any = {
                  key: ApiConfig.RAZORPAY_KEY,
                  order_id: order?.payment_intent_id,
                  currency: "INR",
                  name: AppConfig.APP_NAME,
                  description: `payment for ${order?.associated_plan?.name}`,
                  prefill: {
                    name: user?.name,
                    contact: user?.phone_number,
                    email: user?.email,
                  },
                };

                switch (order?.payment_intent_mode) {
                  case "RAZORPAY":
                    return RazorpayCheckout.open(options)
                      .then((res) => {
                        // console.log("RAZORPAY PAYMENT", res);
                        SubscriptionService.handleGetSubscription((data) => {
                          dispatch(setSubscription(data));
                        });
                        AuthService.handleGetProfile((data) => {
                          if (data) {
                            dispatch(setUser(data));
                          }
                        });
                      })
                      .catch((e) => {
                        //console.log("RAZORPAY PAYMENT", e);
                      });

                  case "STRIPE":
                    dispatch(setCurrentOrderId(order?.id));
                    dispatch(setPaymentIntent(order?.payment_intent_id));
                    await initializeStripePaymentSheet(
                      order?.payment_intent_id
                    );
                  default:
                    return null;
                }
              }}
              className={`bg-[#d10000] p-2 rounded-full px-5 mr-0.5 `}
            >
              <Text className="text-white w-full text-[10px] font-semibold">
                Purchase{" "}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="w-full flex flex-row my-1">
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Plan Type :</Text>

          <Text className="text-sm font-medium text-gray-900">
            {order.associated_plan.type} - {order?.id ?? order?.id}
          </Text>
        </View>
        <View className="w-1/3 ">
          <Text>{order.status}</Text>
        </View>
        {order?.status === "FULFILLED" ? null : (
          <View className={`w-1/3  flex flex-row items-end  justify-center `}>
            <TouchableOpacity
              onPress={() => {
                handleCancelOrder(order);
              }}
              className="p-2 px-6 mr-0.5 bg-slate-800 rounded-full "
            >
              <Text className="text-white w-full text-[10px] font-semibold">
                Cancel{" "}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderCard;
