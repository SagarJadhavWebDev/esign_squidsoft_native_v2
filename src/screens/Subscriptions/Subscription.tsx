import { isEmpty, isNull, times } from "lodash";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NoDataFound from "../../components/atoms/NoDataFound";
import apiEndpoints from "../../constants/apiEndpoints";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import HttpService from "../../utils/HttpService";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionService from "../../services/SubscriptionService";
import { setSubscription } from "../../redux/reducers/SubscriptionSlice";
import { useDispatch } from "react-redux";
import { useOrders, useSubscription } from "../../utils/useReduxUtil";
import OrderService from "../../services/OrderService";
import { setOrders } from "../../redux/reducers/OrdersSlice";
import OrderCard from "./OrderCard";
import routes from "../../constants/routes";

interface SubscriptionsProps {
  navigation: any;
}
const Subscriptions: React.FC<SubscriptionsProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [tabType, setTabType] = useState<any>("subscription"); //"biilings"
  const subscriptions = useSubscription();
  const { orders } = useOrders();
  const [loading, setLoading] = useState(false);
  //const [orders, setOrders] = useState<any>();
  const dispatch = useDispatch();
  const getSubscriptions = () => {
    setLoading(true);

    SubscriptionService.handleGetSubscription((data) => {
      dispatch(setSubscription(data));
      setLoading(false);
    });
  };

  const getOrders = () => {
    setLoading(true);
    OrderService.handleGetAllOrder(1, 10, (data) => {
      if (data) {
        // dispatch(setIsLoading(false));
        dispatch(setOrders(data));
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    // HttpService.get(apiEndpoints.getOrders, {
    //   token: token ?? "",
    // })
    //   .then((res) => {
    //     const data = CryptoHandler.response(res, token ?? "");
    //     setOrders(data?.[0]);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log("GET SUBSCRIPTION ERR", err);
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    getSubscriptions();
  }, []);
  const handleCancelOrder = (id: any) => {
    setLoading(true);
    // HttpService.post(apiEndpoints.cancelSubscription(id), {
    //   token: token ?? "",
    // })
    //   .then((res) => {
    //     console.log("AFTER DELETE ", res);
    //     setLoading(false);
    //     setOrders(res);
    //   })
    //   .catch((err) => {
    //     console.log("CANCEL ORDER ERR");
    //   });
  };
  const mapData: any =
    tabType === "subscription" ? subscriptions : orders?.data?.data;
  //console.log("ORDERS", orders);
  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <View className="w-full h-full items-center bg-white ">
      <View className="w-[90%] my-3 h-10 bg-white border border-gray-300 rounded-full items-center justify-center flex flex-row">
        <TouchableOpacity
          onPress={() => {
            setTabType("subscription");
            getSubscriptions();
          }}
          className="w-1/2"
        >
          <View className="justify-center items-center w-full h-full">
            <View
              className={`w-full h-full  rounded-full justify-center items-center ${
                tabType === "subscription" ? "bg-[#d10000]" : "bg-white"
              } `}
            >
              <Text
                className={` text-sm w-full text-center font-semibold ${
                  tabType === "subscription" ? "text-white" : "text-gray-700"
                }`}
              >
                Subscriptions
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTabType("orders");
            getOrders();
          }}
          className="w-1/2"
        >
          <View className="justify-center items-center w-full h-full">
            <View
              className={`w-full h-full  rounded-full justify-center items-center ${
                tabType === "orders" ? "bg-[#d10000]" : "bg-white"
              } `}
            >
              <Text
                className={` text-sm w-full text-center font-semibold ${
                  tabType === "orders" ? "text-white" : "text-gray-700"
                }`}
              >
                Orders
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-full h-full px-2">
        <ScrollView
          style={{
            paddingHorizontal: 8,
            marginBottom: 70,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                if (tabType === "orders") {
                  getOrders();
                } else {
                  getSubscriptions();
                }
              }}
            />
          }
          className="bg-white"
        >
          {loading ? (
            <ActivityIndicator
              className="text-4xl"
              size="large"
              color="#d10000"
            />
          ) : isEmpty(mapData) || isNull(mapData) ? (
            <View className=" h-full justify-center items-center my-7">
              <NoDataFound
                title={
                  tabType === "subscription"
                    ? "No subscriptions found yet! "
                    : "No billing history found yet!  "
                }
                subTitle={
                  tabType === "subscription"
                    ? "Please activate your trial plan "
                    : " "
                }
                height={200}
                width={200}
              />
            </View>
          ) : loading ? null : tabType === "subscription" ? (
            <View className="flex flex-col justify-center items-center">
              {mapData?.map((subscription: any) => {
                return (
                  <SubscriptionCard
                    subscription={subscription}
                    key={subscription?.id}
                    type={tabType}
                    navigation={navigation}
                    handleCancelOrder={handleCancelOrder}
                  />
                );
              })}
              {mapData?.length !== 3 ? (
                <View className="flex flex-col my-5 justify-center items-center rounded-2xl w-[95%] h-[150px]  border border-gray-300  p-10   ">
                  <View className="w-full h-full flex flex-col justify-center items-center gap-y-5 ">
                    <Text className="text-greay-500 w-full text-sm font-semibold">
                      You can add upto 3 Subscriptions
                    </Text>
                    <Text
                      onPress={() => {
                        navigation.navigate(routes.Plans);
                      }}
                      className="bg-red-600  text-white text-sm font-semibold p-1.5 px-5 rounded-lg"
                    >
                      Add New Plan 🚀{" "}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          ) : (
            mapData?.map((subscription: any) => {
              return (
                <OrderCard
                  order={subscription}
                  key={subscription?.id}
                  type={tabType}
                  navigation={navigation}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Subscriptions;
