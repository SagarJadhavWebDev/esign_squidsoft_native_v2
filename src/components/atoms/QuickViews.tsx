import React from "react";
import { useDispatch } from "react-redux";
import { useEnvelopesCount } from "../../utils/useReduxUtil";
import { ICONTYPE } from "../../types/IconTypes";
import { setCurrentTab, setManageList } from "../../redux/reducers/ManageSlice";
import routes from "../../constants/routes";
import GetSvg from "../../utils/GetSvg";
import { Text, TouchableOpacity, View } from "react-native";
import { setFilter } from "../../redux/reducers/uiSlice";
import { setCurrentPage } from "../../redux/reducers/PaginationSlice";

interface cardType {
  name: string;
  icon: ICONTYPE;
  count: number;
  iconClass: string;
  bgColor: string;
  iconColor: string;
  link?: string;
}
interface QuickViewsProps {
  navigation: any;
}
const QuickViews: React.FC<QuickViewsProps> = ({ navigation }) => {
  const count = useEnvelopesCount();
  const cards: cardType[] = [
    {
      name: "Awaiting your action",
      icon: "QUICKVIEWPENCIL" as ICONTYPE,
      count: count?.action_required,
      iconClass: "",
      bgColor: "bg-[#FFE2E5]",
      iconColor: "text-[#FA5A7D]",
      link: "inbox",
    },
    {
      name: "Draft Documents",
      icon: "QUICKVIEWDRAFT" as ICONTYPE,
      count: count?.draft,
      iconClass: "w-5 h-5",
      bgColor: "bg-[#FFF4DE]",
      iconColor: "text-[#FF947A]",
      link: "draft",
    },
    {
      name: "Waiting on others",
      icon: "QUICKVIEWWAITING" as ICONTYPE,
      count: count?.waiting_on_others,
      iconClass: "",
      bgColor: "bg-[#F3E8FF]",
      iconColor: "text-[#BF83FF]",
      link: "sent",
    },
    {
      name: "Completed",
      icon: "QUICKVIEWCOMPLETED" as ICONTYPE,
      count: count?.completed,
      iconClass: "",
      bgColor: "bg-[#DCFCE7]",
      iconColor: "text-[#3CD856]",
      link: "sent",
    },
  ];

  const dispatch = useDispatch();
  return (
    <View className=" flex flex-col my-2   ">
      <View className="py-3 w-full flex flex-row md:flex-row flex-wrap  gap-x-3  gap-y-4  justify-center items-center">
        {cards?.map((card: cardType) => {
          return (
            <TouchableOpacity
              key={card?.name}
              className="border border-gray-200 rounded-2xl p-5 w-40 flex flex-col justify-around cursor-pointer"
              onPress={() => {
                dispatch(setCurrentPage(1));
                dispatch(setCurrentTab(card?.link));
                dispatch(setManageList(null));
                dispatch(
                  setFilter(
                    card?.name === "Awaiting your action"
                      ? "pending"
                      : card?.name === "Waiting on others"
                      ? "waiting_on_others"
                      : card?.name === "Completed"
                      ? "completed"
                      : ""
                  )
                );
                navigation.navigate(routes.Manage);
              }}
            >
              <View
                className={`w-10 h-10 flex justify-center items-center  rounded-full ${card?.bgColor} ${card?.iconColor}`}
              >
                <GetSvg
                  name={card?.icon}
                  className={`w-full h-full ${card?.iconClass}`}
                />
              </View>
              <Text className="text-gray-500 font-semibold my-2 md:text-sm text-xs">
                {card?.name}
              </Text>
              <Text
                className={`${card?.iconColor} font-semibold  md:text-2xl text-base`}
              >
                {card?.count < 10 && card?.count >= 1
                  ? "0" + card?.count
                  : card?.count}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* <View className="card p-5 md:w-56 w-40 flex flex-col justify-around cursor-pointer">
          <View className="w-10 h-10 flex justify-center items-center bg-[#e35d5b11] rounded-full">
            <Icon type="TIMER" className="w-5 h-5 text-gray-200" />
          </View>
          <Text className="text-gray-500 font-semibold my-2  md:text-sm text-xs">
            Draft Documents
          </Text>
          <Text className="text-[color:var(--primary-color)] font-semibold  md:text-2xl text-base">
            05
          </Text>
        </View>
        <View className="card p-5 md:w-56 w-40 flex flex-col justify-around cursor-pointer">
          <View className="w-10 h-10 flex justify-center items-center bg-[#e35d5b11] rounded-full">
            <Icon type="TIME" className="w-5 h-5 text-gray-200" />
          </View>
          <Text className="text-gray-500 font-semibold my-2  md:text-sm text-xs">
            Waiting on others
          </Text>
          <Text className="text-[color:var(--primary-color)] font-semibold text-base  md:text-2xl">
            02
          </Text>
        </View>
        <View className="card p-5 md:w-56 w-40 flex flex-col justify-around cursor-pointer">
          <View className="w-10 h-10 flex justify-center items-center bg-[#e35d5b11] rounded-full">
            <Icon type="TICKWITHCIRCLE" className="w-5 h-5 text-gray-200" />
          </View>
          <Text className="text-gray-500 font-semibold my-2 md:text-sm text-xs">
            Completed
          </Text>
          <Text className="text-[color:var(--primary-color)] font-semibold  md:text-2xl text-base">
            02
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default QuickViews;
