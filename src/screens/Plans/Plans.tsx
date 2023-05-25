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
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import apiEndpoints from "../../constants/apiEndpoints";
import imageConstants from "../../constants/imageConstants";
import routes from "../../constants/routes";
import { activateTrial } from "../../utils/activateTrial";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import GetSvg from "../../utils/GetSvg";
import HttpService from "../../utils/HttpService";
import CustomPlanCard from "./CustomPlanCard";
import { usePlans } from "../../utils/useReduxUtil";
import { PlanType } from "../../types/PlanType";
interface PlansProps {
  navigation: any;
}
const Plans: React.FC<PlansProps> = ({ navigation }) => {
  const { token, auth, RefreshUser } = useAuth();
  const toast = useToast();
  const plans = usePlans();
  // const [plans, setPlans] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlansLoading, setIsPlansLoading] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const monthlyPlans = plans
    ? plans?.filter((plan) => {
        return plan?.type === "Monthly";
      })
    : null;
  const yearlyPlans = plans
    ? (plans?.filter((plan) => {
        return plan?.type === "Yearly";
      }) as any)
    : null;
  const planList = plans
    ? isMonthly
      ? monthlyPlans
      : [monthlyPlans?.[0], ...yearlyPlans]
    : null;
  // const getPlans = () => {
  //   HttpService.get(apiEndpoints.getPlans, { token: token ?? "" })
  //     .then((res: any) => {
  //       if (res) {
  //         const data = CryptoHandler.response(res, token ?? "");
  //         setPlans(data);
  //         setIsPlansLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsPlansLoading(false);
  //       console.log("ERROR LOADIING PLANS");
  //     });
  // };
  // useEffect(() => {
  //   getPlans();
  // }, []);
  //console.log("PLANS LIST", planList);
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
      <ScrollView nestedScrollEnabled={true} className="w-full max-w-lg ">
        <View className="w-full h-24 mx-auto my-2  ">
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={imageConstants.eSignLogo}
          />
          <Text className="text-gray-600 font-semibold text-center text-xl">
            The Right Plan for Your Business
          </Text>
        </View>
        <View className="w-full h-12 justify-center items-center flex flex-row gap-x-1 my-5 mb-1">
          <Text
            className={`text-sm uppercase font-semibold text-[#d10000] tracking-wider ${
              !isMonthly ? "text-black" : "text-[#d10000]"
            }`}
          >
            MONTHLY{" "}
          </Text>
          <Switch
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            trackColor={{ false: "lightgray", true: "lightgray" }}
            thumbColor={isMonthly ? "#d10000" : "#d10000"}
            ios_backgroundColor="#d10000"
            onValueChange={() => {
              setIsMonthly(!isMonthly);
            }}
            value={!isMonthly}
          />
          <Text
            className={`text-sm uppercase font-semibold text-[#d10000] tracking-wider ${
              isMonthly ? "text-black" : "text-[#d10000]"
            }`}
          >
            YEARLY{" "}
          </Text>
        </View>
        <View className="w-full h-full  items-center mx-auto pb-5">
          <Text className="text-xs text-gray-800 font-semibold my-2">
            Get 2 Months off on yearly plan.
          </Text>
          <View className="flex flex-col md:flex-row w-full justify-center items-center my-5 gap-x-5  gap-y-5 md:gap-y-0 ">
            {!planList ? (
              <View className="w-full h-full p-3 mx-auto flex flex-col justify-center items-center gap-y-6">
                <ActivityIndicator color="black" size={"large"} />
                <Text className="text-sm text-gray-500 font-semibold">
                  Loading your plans....
                </Text>
              </View>
            ) : (
              planList &&
              planList?.map((plan: PlanType, index) => {
                const points = plan?.meta?.slice(1);
                const discountPrice = isMonthly
                  ? plan?.price
                  : plan?.price - plan?.price * (plan?.discount / 100);
                return (
                  <View
                    key={plan?.id}
                    className="w-[80%] my-2  max-h-max  border border-gray-300 rounded-xl  "
                  >
                    <View className="p-3 mx-2  w-full">
                      <View className="w-full h-28 my-1 mb-2 ">
                        <Text className="text-black text-2xl my-2">
                          {plan?.name}
                        </Text>
                        <Text className="h-full text-sm text-gray-600">
                          {plan?.meta?.[0]}{" "}
                        </Text>
                      </View>
                      {points?.map((item: any, key: any) => {
                        return (
                          <View
                            key={key}
                            className="flex my-1 flex-row w-full "
                          >
                            <GetSvg name="tickIcon" classN="w-5 h-5 " />
                            <Text className="mx-1 w-full text-xs text-gray-500">
                              {item}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <View className="p-3 mx-2 w-full flex flex-row  items-center">
                      <Text className="text-sm font-semibold capitalize tracking-wider">
                        ${Math.round(discountPrice)}{" "}
                      </Text>
                      <Text className="text-gray-500 ">
                        / {isMonthly ? "Month" : `Year `}{" "}
                      </Text>
                      <Text className="text-gray-500 ">
                        {isMonthly ? null : (
                          <Text className="line-through  mx-1">
                            ${plan?.price}
                          </Text>
                        )}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (plan?.name === "Personal") {
                          return null;
                        } else {
                          navigation.navigate(routes.Checkout, {
                            plan: plan,
                          });
                        }
                      }}
                      className={`w-64 h-8 my-2 bg-[#d10000] justify-center items-center rounded-lg mx-auto flex flex-row ${
                        plan?.name === "Personal" ? "opacity-60" : ""
                      }`}
                    >
                      <Text className="text-sm text-white">
                        {plan?.name === "Personal"
                          ? "Activated "
                          : "Activate Now "}
                      </Text>
                      {isLoading && plan?.name === "Personal" ? (
                        <ActivityIndicator
                          className="mx-2"
                          color={"white"}
                          size="small"
                        />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
            <View className="w-full flex justify-center items-center">
              <CustomPlanCard token={token} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Plans;
