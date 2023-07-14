import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import routes from "../../constants/routes";
import { calcDate, convertDate } from "../../utils/dateConvertor";
import { Subscription } from "../../types/SubscriptionTypes";
import getLocalDate from "../../utils/getLocalDate";

interface SubscriptionCardProps {
  subscription: Subscription;
  type: "subscription" | "orders";
  navigation: any;
  handleCancelOrder: any;
}
const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  type,
  navigation,
  handleCancelOrder,
}) => {
  //console.log("subscription?.plan?.for", subscription?.plan);
  return (
    <View className="rounded-xl border w-full border-gray-300 bg-white p-2 px-3 my-1">
      <View className="w-full flex flex-row my-1">
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Purchase Date :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {getLocalDate(subscription?.start_date).format("DD/MM/YYYY")}
          </Text>
        </View>

        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Expiry Date :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {getLocalDate(subscription?.end_date).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Days :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {type === "orders"
              ? calcDate(
                  subscription?.start_date,
                  subscription?.end_date,
                  "day"
                )
              : calcDate(Date.now(), subscription?.end_date)}

            {type === "orders"
              ? calcDate(
                  subscription?.start_date,
                  subscription?.end_date,
                  "day"
                ) === 1 || 0
                ? " Day"
                : " Days"
              : subscription?.plan?.type === "yearly"
              ? calcDate(
                  Date.now(),
                  subscription?.end_date ?? subscription?.end_date
                ) == 1
                ? " Day left"
                : " Days left"
              : calcDate(
                  Date.now(),
                  subscription?.end_date ?? subscription?.end_date
                ) == 1
              ? " Day left"
              : " Days left"}
          </Text>
        </View>
      </View>
      <View className="w-full flex flex-row my-1">
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Plan Type :</Text>

          <Text className="text-sm font-medium text-gray-900">
            {subscription?.plan?.name} {subscription?.id ?? subscription?.id}
          </Text>
        </View>
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Envelopes Sents :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {subscription.subscription_benifit?.envelope_sent_count ?? 0} of{" "}
            {subscription?.subscription_benifit?.envelope_total_count ?? 0}
          </Text>
        </View>
        <View className={`w-1/3  flex flex-row items-end  justify-center `}>
          <TouchableOpacity
            onPress={() => {
              if (subscription?.plan?.name === "Personal") {
                return null;
              }
              navigation.navigate(routes.Checkout, {
                plan: subscription?.plan,
                subscriptionId: subscription?.id,
              });
            }}
            className={`bg-[#d10000] p-2  rounded-full px-5  mr-0.5 ${
              subscription?.plan?.name === "Personal" ? "opacity-70" : ""
            } `}
          >
            <Text className="text-white w-full text-[10px] font-semibold">
              {subscription?.plan?.name === "Personal"
                ? "Activated "
                : "Renew "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionCard;
