import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  RefreshControl,
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
import ApiInstance from "../../services/ApiInstance";
import handleResponse from "../../services/handleResponse";
import { useToast } from "react-native-toast-notifications";
import { handleGetEnvelopes } from "../../services/ManageService";
import {
  useEnvelopesCount,
  useManageList,
  useUser,
} from "../../utils/useReduxUtil";
import { useDispatch } from "react-redux";
import {
  setManageCount,
  setManageList,
} from "../../redux/reducers/ManageSlice";
import React from "react";
import QuickViews from "../../components/atoms/QuickViews";
interface HomeProps {
  navigation: any;
  route: any;
}
const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  const router = route?.params;
  const greetings = getGreetings();
  //const { currentTab, list } = useManageList();
  const [list, setList] = useState<any>(null);
  const currentTab = "inbox";
  const counts = useEnvelopesCount();
  const user = useUser();
  const widthAndHeight = 150;
  const toast = useToast();
  const sliceColor = ["#facc15", "#22c55e", "#ef4444"];
  const dispatch = useDispatch();
  const getQuickView = () => {
    ApiInstance.get(apiEndpoints.manage.getCount).then(async (res: any) => {
      if (res) {
        const data = await handleResponse(res as any, toast);
        dispatch(setManageCount(data));
      }
    });
  };

  const getEnvelopeList = () => {
    handleGetEnvelopes(currentTab, 1, 10, "", (data) => {
      if (data) {
        // console.log("ENVELOPE LIST", data);
        //dispatch(setManageList(data));
        setList(data?.data);
      } else {
      }
    });
  };

  useEffect(() => {
    if (router?.update) {
      getEnvelopeList();
    }
  }, [router?.update]);
  useEffect(() => {
    getQuickView();
    getEnvelopeList();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  //return null;
  return (
    <SafeAreaView className=" h-full w-full bg-white px-2">
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getQuickView();
              getEnvelopeList();
            }}
          />
        }
      >
        {/* <View className=" h-48 border border-gray-100 w-full flex flex-row justify-center">
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
              {user?.name ?? "Squid user"}
            </Text>
            <Text className="text-sm text-gray-400 tracking-wide font-medium">
              Welcome to eSign by SquidSoft
            </Text>
          </View>
        </View> */}
       
        {/* ################ QUICK VIEW SECTION START ############### */}
        <View className="my-2 mt-5 w-[100%] border border-gray-200 rounded-2xl flex flex-col">
          <View className="border-l-[3px] border-[#d10000] mt-3">
            <Text className="mx-2 text-sm font-semibold my-0.5">
              Quick Views
            </Text>
          </View>
          <View className="w-full flex flex-row ">
          <QuickViews navigation={navigation} />
          </View>
        </View>
        {/* ################ QUICK VIEW SECTION END ############### */}

        {/* ################ INBOX SECTION START ############### */}
        <View className="  mb-3 border border-gray-200 rounded-2xl   w-full">
          <View className="border-l-[3px] border-[#d10000] mt-3">
            <Text className="mx-2 text-sm font-semibold my-0.5">Inbox</Text>
          </View>
          {!isEmpty(list) ? (
            <ScrollView nestedScrollEnabled={true} className="px-2">
              {list?.map((envelope: any, key: any) => {
                return (
                  <EnvelopeListCard
                    key={envelope?.id}
                    envelope={envelope}
                    navigation={navigation}
                  />
                );
              })}
            </ScrollView>
          ) : (
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
          )}
        </View>
        {/* ################ INBOX SECTION END ############### */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
