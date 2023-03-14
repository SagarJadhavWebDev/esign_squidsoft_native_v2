import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import imageConstants from "../../constants/imageConstants";
import getGreetings from "../../utils/detectGreetings";
import PieChart from "react-native-pie-chart";
import HttpService from "../../controllers/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import { isEmpty, isNull } from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { EnvelopeListType } from "../../types/ApiEndPointType";
import EnvelopeListCard from "../../components/EnvelopeListCard";
import { EnvelopeType } from "../../types/EnvelopeType";
import NoDataFound from "../../components/atoms/NoDataFound";
interface HomeProps {
  setIsLoading: any;
  navigation: any;
  route: any;
}
const Home: React.FC<HomeProps> = ({ setIsLoading, navigation, route }) => {
  const router = route?.params;
  const greetings = getGreetings();
  const [quickViewCount, setQuickViewCount] = useState<any>(null);
  const { token, auth } = useAuth();
  const widthAndHeight = 150;
  const sliceColor = ["#facc15", "#22c55e", "#ef4444"];
  const [envelopeList, setEnvelopeList] = useState<EnvelopeType | null>();
  const getQuickView = () => {
    HttpService.get(apiEndpoints.getQuickViews, { token: token ?? "" }).then(
      (res: any) => {
        if (res) {
          const data = CryptoHandler.response(res, token ?? "");
          setQuickViewCount([
            data?.action_required,
            data?.completed,
            data?.expiring_soon,
          ]);
        }
      }
    );
  };

  useEffect(() => {
    getQuickView();
  }, []);

  const getEnvelopeList = (type: EnvelopeListType) => {
    setEnvelopeList(null);
    HttpService.get(apiEndpoints.envelopeList(type, 1, 5), {
      token: token ?? "",
    }).then((response) => {
      if (response) {
        const data = CryptoHandler.response(response, token ?? "");
        setEnvelopeList(data?.data);
      }
    });
  };
  useEffect(() => {
    getEnvelopeList("inbox");
  }, []);
  useEffect(() => {
    if (router?.update) {
      setEnvelopeList(null);
      getEnvelopeList("inbox");
    }
  }, [router?.update]);

  return (
    <SafeAreaView className=" h-full w-full bg-white px-2">
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View className=" h-48 border border-gray-100 w-full flex flex-row justify-center">
          <View className="w-1/2 h-full justify-center items-center">
            <Image
              className=""
              style={{ resizeMode: "contain", height: "80%", width: "80%" }}
              source={imageConstants.greetings}
            />
          </View>
          <View className=" h-full w-1/2 flex flex-col justify-center  ">
            <Text className="text-sm text-gray-400 tracking-wide font-medium">
              {greetings}
            </Text>
            <Text
              className="text-xl my-2 text-gray-900 tracking-wide font-medium"
              numberOfLines={1}
            >
              {auth?.user?.name ?? "Squid user"}
            </Text>
            <Text className="text-sm text-gray-400 tracking-wide font-medium">
              Welcome to eSign by SquidSoft
            </Text>
          </View>
        </View>
        {/* ################ QUICK VIEW SECTION START ############### */}
        <View className="my-2 mt-5 w-[100%] border border-gray-200 rounded-2xl flex flex-col">
          <View className="border-l-[3px] border-[#d10000] mt-3">
            <Text className="mx-2 text-sm font-semibold my-0.5">
              Quick Views
            </Text>
          </View>
          <View className="w-full flex flex-row  justify-center items-center">
            <View className="flex flex-col ">
              <View className="flex flex-row items-center justify-start my-1.5">
                <View className="h-8 w-8  rounded-full border-2 border-yellow-400 justify-center items-center">
                  <Text className="text-sm">{quickViewCount?.[0] ?? 0}</Text>
                </View>
                <Text className="px-3 text-xs">Action Required</Text>
              </View>
              <View className="flex flex-row items-center justify-start my-1.5">
                <View className="h-8 w-8  rounded-full border-2 border-green-500 justify-center items-center">
                  <Text className="text-sm">{quickViewCount?.[1] ?? 0}</Text>
                </View>
                <Text className="px-3 text-xs">Completed</Text>
              </View>
              <View className="flex flex-row items-center justify-start my-1.5">
                <View className="h-8 w-8  rounded-full border-2 border-red-500 justify-center items-center">
                  <Text className="text-sm">{quickViewCount?.[2] ?? 0}</Text>
                </View>
                <Text className="px-3 text-xs">Expiring Soon</Text>
              </View>
            </View>
            <View className="mx-2 mb-3 w-1/2  items-center justify-center">
              {isNull(quickViewCount) ? (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={[5, 5, 5]}
                  sliceColor={sliceColor}
                  doughnut={true}
                  coverRadius={0.8}
                  coverFill={"#FFF"}
                />
              ) : (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={
                    (quickViewCount?.[0] ?? 0) === 0 &&
                    (quickViewCount?.[1] ?? 0) === 0 &&
                    (quickViewCount?.[2] ?? 0) === 0
                      ? [0, 0, 1]
                      : [
                          quickViewCount?.[0] ?? 0,
                          quickViewCount?.[1] ?? 0,
                          quickViewCount?.[2] ?? 1,
                        ]
                  }
                  sliceColor={sliceColor}
                  doughnut={true}
                  coverRadius={0.8}
                  coverFill={"#FFF"}
                />
              )}
            </View>
          </View>
        </View>
        {/* ################ QUICK VIEW SECTION END ############### */}

        {/* ################ INBOX SECTION START ############### */}
        <View className=" h-64 border border-gray-200 rounded-2xl   w-full">
          <View className="border-l-[3px] border-[#d10000] mt-3">
            <Text className="mx-2 text-sm font-semibold my-0.5">Inbox</Text>
          </View>
          <ScrollView nestedScrollEnabled={true} className="px-2">
            {!isEmpty(envelopeList) ? (
              //@ts-ignore
              envelopeList?.map((envelope: any, key: any) => {
                return (
                  <EnvelopeListCard
                    type={"inbox"}
                    key={key}
                    envelope={envelope?.envelope}
                    operation={envelope?.operation}
                    token={envelope?.token}
                    navigation={navigation}
                  />
                );
              })
            ) : isEmpty(envelopeList) ? (
              <View
                style={{
                  //paddingHorizontal: 8,
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height * 0.2,
                }}
                className="justify-center  items-center -mx-2 "
              >
                <NoDataFound
                  width={100}
                  height={100}
                  title={"No inbox envelopes yet! "}
                  subTitle={"Anything you receives will show here. "}
                />
              </View>
            ) : null}
          </ScrollView>
        </View>
        {/* ################ INBOX SECTION END ############### */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
