import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import routes from "../../constants/routes";
import { calcDate, convertDate } from "../../utils/dateConvertor";

interface SubscriptionCardProps {
  subscription: any;
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
  console.log("subscription?.plan?.for", subscription?.plan);
  return (
    <View className="rounded-xl border w-full border-gray-300 bg-white p-2 px-3 my-1">
      <View className="w-full flex flex-row my-1">
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Purchase Date :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {type === "orders"
              ? convertDate(
                  new Date(subscription?.start_date).toLocaleString(),
                  "date"
                )
              : subscription?.plan.for === "Yearly"
              ? convertDate(
                  new Date(subscription?.order?.start_date).toLocaleString() ??
                    new Date(subscription?.start_date).toLocaleString(),
                  "date"
                )
              : convertDate(
                  new Date(subscription?.start_date).toLocaleString(),
                  "date"
                )}
          </Text>
        </View>

        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Expiry Date :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {type === "orders"
              ? convertDate(
                  new Date(subscription?.end_date).toLocaleString(),
                  "date"
                )
              : subscription?.plan.for === "Yearly"
              ? convertDate(
                  new Date(subscription?.order?.end_date).toLocaleString() ??
                    new Date(subscription?.end_date).toLocaleString(),
                  "date"
                )
              : convertDate(
                  new Date(subscription?.end_date).toLocaleString(),
                  "date"
                )}
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
              : subscription?.plan?.for?.toLowerCase() === "yearly"
              ? calcDate(Date.now(), subscription?.subscription?.end_date)
              : calcDate(Date.now(), subscription?.end_date)}

            {type === "orders"
              ? calcDate(
                  subscription?.start_date,
                  subscription?.end_date,
                  "day"
                ) === 1 || 0
                ? " Day"
                : " Days"
              : subscription?.plan?.for?.toLowerCase() === "yearly"
              ? calcDate(
                  Date.now(),
                  subscription?.subscription?.end_date ??
                    subscription?.subscription?.end_date
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
            {subscription?.plan?.name}{" "}
            {subscription?.subscription?.id ?? subscription?.id}
          </Text>
        </View>
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Envelopes Sents :</Text>
          <Text className="text-sm font-medium text-gray-900">
            {subscription.envelopeSended ?? 0} of{" "}
            {subscription?.plan?.total_envelopes_sents ?? 0}
          </Text>
        </View>
        <View
          className={`w-1/3  flex flex-row items-end ${
            subscription?.deleted_at === null
              ? "justify-start"
              : "justify-center"
          }  `}
        >
          {subscription?.status == "1" || subscription?.status == "2" ? (
            <>
              {subscription?.plan?.for === "Trial" ? null : subscription?.plan
                  ?.name === "Personal" ? null : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(routes.Checkout, {
                      plan: subscription?.plan,
                    });
                  }}
                  className="bg-[#d10000] p-1 rounded-full px-2  mr-0.5"
                >
                  <Text className="text-white text-[10px]">Renew </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(routes.Plans);
                }}
                className="bg-gray-800  p-1 rounded-full px-2  "
              >
                <Text className="text-white text-[10px]">Upgrade </Text>
              </TouchableOpacity>
            </>
          ) : subscription?.deleted_at !== null ? (
            <View className="bg-gray-100  p-1 rounded-full px-2 w-full justify-center items-center ">
              <Text className="text-gray-500 w-full text-[10px] text-center">
                Payment Cancelled{" "}
              </Text>
            </View>
          ) : subscription?.plan?.for === "Trial" ? null : (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(routes.Checkout, {
                    plan: subscription?.plan,
                  });
                }}
                className="bg-[#d10000] p-1 rounded-full px-2  mr-0.5 "
              >
                <Text className="text-white text-[10px]">Checkout </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleCancelOrder(subscription?.id);
                }}
                className="bg-gray-800  p-1 rounded-full px-2  "
              >
                <Text className="text-white text-[10px]">Cancel </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default SubscriptionCard;
