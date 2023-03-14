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
interface PlansProps {
  navigation: any;
}
const Plans: React.FC<PlansProps> = ({ navigation }) => {
  const { token, auth, RefreshUser } = useAuth();
  const toast = useToast();
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlansLoading, setIsPlansLoading] = useState(true);
  const showPlanFor = isYearly ? "Yearly" : "Monthly";
  const getPlans = () => {
    HttpService.get(apiEndpoints.getPlans, { token: token ?? "" })
      .then((res: any) => {
        if (res) {
          const data = CryptoHandler.response(res, token ?? "");
          setPlans(data);
          setIsPlansLoading(false);
        }
      })
      .catch((err) => {
        setIsPlansLoading(false);
        console.log("ERROR LOADIING PLANS");
      });
  };
  useEffect(() => {
    getPlans();
  }, []);

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
              isYearly ? "text-black" : "text-[#d10000]"
            }`}
          >
            MONTHLY{" "}
          </Text>
          <Switch
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            trackColor={{ false: "lightgray", true: "lightgray" }}
            thumbColor={isYearly ? "#d10000" : "#d10000"}
            ios_backgroundColor="#d10000"
            onValueChange={() => {
              setIsYearly(!isYearly);
            }}
            value={isYearly}
          />
          <Text
            className={`text-sm uppercase font-semibold text-[#d10000] tracking-wider ${
              !isYearly ? "text-black" : "text-[#d10000]"
            }`}
          >
            YEARLY{" "}
          </Text>
        </View>
        <View className="w-full h-full  items-center mx-auto pb-5">
          <Text className="text-xs text-gray-800 font-semibold my-2">
            Get 2 Months off on yearly plan.
          </Text>
          {/* ################ PLANS SECTION START ##################### */}
          {!isPlansLoading ? (
            <>
              {plans
                ?.filter((plan: any) => plan?.for === showPlanFor)
                ?.map((plan: any) => {
                  const meta = JSON.parse(plan?.meta_fields);

                  return (
                    <View
                      key={plan?.id}
                      className="w-[80%] my-2  max-h-max  border border-gray-300 rounded-xl  "
                    >
                      <View className="p-3 mx-2 w-full">
                        <View className="w-full my-1 mb-2 ">
                          <Text className="text-black text-2xl my-2">
                            {meta?.name?.desc}
                          </Text>
                          <Text>{plan?.description} </Text>
                        </View>
                        {Object.values(meta)
                          ?.filter((f: any) => f?.status)
                          .map((item: any, key: any) => {
                            return (
                              <View
                                key={key}
                                className="flex my-1 flex-row w-full "
                              >
                                <GetSvg name="tickIcon" classN="w-5 h-5 " />
                                <Text className="mx-1 w-full">
                                  {item?.value > 0 && item.value}{" "}
                                  {item?.desc + " "}{" "}
                                </Text>
                              </View>
                            );
                          })}
                      </View>
                      <View className="p-3 mx-2 w-full flex flex-row">
                        <Text className="text-sm font-semibold capitalize tracking-wider">
                        ${isYearly
                            ? plan?.monthly_price * 10
                            : plan?.monthly_price}
                          {" "}
                        </Text>
                        <View className=" tracking-wider flex flex-row">
                          {isYearly ? (
                            <>
                              <Text>/ Year </Text>
                              <Text className="text-gray-400 line-through ">
                                ${plan?.monthly_price * 12}{" "}
                              </Text>
                            </>
                          ) : (
                            <Text>/ Month </Text>
                          )}
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (plan?.name === "Personal") {
                            activateTrial(
                              1,
                              auth?.user?.name ?? "",
                              token,
                              toast,
                              RefreshUser,
                              navigation,
                              setIsLoading
                            );
                          } else {
                            console.log("PLANS", plan);
                            navigation.navigate(routes.Checkout, {
                              plan: plan,
                            });
                          }
                        }}
                        className="w-64 h-8 my-2 bg-[#d10000] justify-center items-center rounded-lg mx-auto flex flex-row"
                      >
                        <Text className="text-sm text-white">
                          Activate Plan{" "}
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
                })}
              <CustomPlanCard token={token} />
            </>
          ) : (
            <ActivityIndicator
              className="text-4xl"
              size="large"
              color="#d10000"
            />
          )}

          {/* ################ PLANS SECTION END ##################### */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Plans;
