import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import routes from "../../constants/routes";
import { calcDate, convertDate } from "../../utils/dateConvertor";
import { Subscription } from "../../types/SubscriptionTypes";
import getLocalDate from "../../utils/getLocalDate";
import { order } from "../../types/OrderTypes";

interface OrderCardProps {
  order: order;
  type: "subscription" | "orders";
  navigation: any;
  handleCancelOrder: any;
}
const OrderCard: React.FC<OrderCardProps> = ({
  order,
  type,
  navigation,
  handleCancelOrder,
}) => {
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
        <View className="w-1/3 flex justify-center items-center ">
          <TouchableOpacity
            className={`bg-[#d10000] p-2  rounded-full px-5  mr-0.5  `}
          >
            <Text className="text-white w-full text-[10px] font-semibold">
              Purchase{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full flex flex-row my-1">
        <View className="w-1/3 ">
          <Text className="text-[10px] text-gray-600">Plan Type :</Text>

          <Text className="text-sm font-medium text-gray-900">
            {order.associated_plan.type} - {order?.id ?? order?.id}
          </Text>
        </View>
        <View className="w-1/3 "></View>
        <View className={`w-1/3  flex flex-row items-end  justify-center `}>
          <TouchableOpacity className="p-2 px-6 mr-0.5 bg-slate-800 rounded-full ">
            <Text className="text-white w-full text-[10px] font-semibold">
              Cancel{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
