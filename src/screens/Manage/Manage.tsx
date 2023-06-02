import { useFocusEffect } from "@react-navigation/native";
import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import NoDataFound from "../../components/atoms/NoDataFound";
import EnvelopeListCard from "../../components/EnvelopeListCard";
import apiEndpoints from "../../constants/apiEndpoints";
import {
  EnvelopeListType,
  QuickViewsListType,
} from "../../types/ApiEndPointType";
import { EnvelopeType } from "../../types/EnvelopeType";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import HttpService from "../../utils/HttpService";
import { handleGetEnvelopes } from "../../services/ManageService";
import { useManageList } from "../../utils/useReduxUtil";
import { useDispatch } from "react-redux";
import { setCurrentTab, setManageList } from "../../redux/reducers/ManageSlice";
import CustomSelector from "../../components/molecules/CustomSelector";
import {
  manageInboxFilter,
  manageSentFilter,
} from "../../types/ManageListTypes";
interface ManageProps {
  navigation: any;
  setIsLoading?: any;
  route?: any;
}
const Manage: React.FC<ManageProps> = ({ route, navigation, setIsLoading }) => {
  const { token } = useAuth();
  const router = route?.params;
  const [currentMenu, setCurrentMenu] = useState("Inbox");
  const [selectedMenu, setSelectedMenu] = useState("inbox");
  const [loading, setLoading] = useState(false);
  const { currentTab, list } = useManageList();
  const [envelopeList, setEnvelopeList] = useState<EnvelopeType[]>([]);
  const [listloading, setListLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasnextpage, setHasNextPage] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const dispatch = useDispatch();
  const [InBoxFilter, setInBoxFilter] = useState<any | null>(null);
  const [SentBoxFilter, setSentBoxFilter] = useState<any | null>(null);
  const InBoxFilterList = [
    {
      title: "All",
      value: null,
    },
    {
      title: "Expiring soon",
      value: "expiring_soon",
    },
    { title: "Pending", value: "pending" },
    { title: "Signed", value: "signed" },
    { title: "Rejected", value: "rejected" },
  ];
  const SentBoxFilterList = [
    {
      title: "All",
      value: null,
    },
    {
      title: "Expiring soon",
      value: "expiring_soon",
    },
    ,
    { title: "Waiting on others", value: "waiting_on_others" },
    { title: "completed", value: "completed" },
    {
      title: "Void",
      value: "void",
    },
  ];
  const getEnvelopeList = () => {
    setIsLoading && setIsLoading(true);
    setListLoading(true);
    setLoading(true);
    setListIsEmpty(false);
    handleGetEnvelopes(
      currentTab,
      page,
      10,
      currentTab === "inbox"
        ? InBoxFilter
        : currentTab === "sent"
        ? SentBoxFilter
        : "",
      (data: any) => {
        if (data) {
          //console.log("ENVELOPE LIST", data);
          setPage(data?.current_page);
          dispatch(setManageList(data));
          if (data?.total_pages > data?.current_page) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }

          // console.log("EXISTING ENVELIPE", envelopeList?.length);
          // !isEmpty(envelopeList) &&
          // !isNull(envelopeList) &&
          // envelopeList?.length !== 0
          //   ? setEnvelopeList([...(envelopeList ?? []), ...data?.data])
          //   : setEnvelopeList(data?.data);
          // if ([...(envelopeList ?? []), ...data?.data].length <= 0) {
          //   setListIsEmpty(true);
          // }
          setLoading(false);
          setIsLoading && setIsLoading(false);
          setListLoading(false);
        } else {
        }
      }
    );
  };

  // const getEnvelopeList = (
  //   type: string,
  //   existingEnvelopeList: EnvelopeType[],
  //   pageNumber = 1
  // ) => {
  //   setIsLoading && setIsLoading(true);
  //   setListLoading(true);
  //   setLoading(true);
  //   setListIsEmpty(false);
  //   HttpService.get(apiEndpoints.envelopeList(type, pageNumber, 10), {
  //     token: token ?? "",
  //   }).then((response) => {
  //     if (response) {
  //       const data = CryptoHandler.response(response, token ?? "");
  //       console.log("DATA:", data?.meta);
  //       setPage(data?.meta?.current_page);
  //       if (data?.meta?.total_pages > data?.meta?.current_page) {
  //         setHasNextPage(true);
  //       } else {
  //         setHasNextPage(false);
  //       }
  //       console.log("EXISTING ENVELIPE", envelopeList?.length);
  //       !isEmpty(existingEnvelopeList) &&
  //       !isNull(existingEnvelopeList) &&
  //       existingEnvelopeList?.length !== 0
  //         ? setEnvelopeList([...(existingEnvelopeList ?? []), ...data?.data])
  //         : setEnvelopeList(data?.data);
  //       if ([...(existingEnvelopeList ?? []), ...data?.data].length <= 0) {
  //         setListIsEmpty(true);
  //       }
  //       setLoading(false);
  //       setIsLoading && setIsLoading(false);
  //       setListLoading(false);
  //     }
  //   });
  // };

  // SignOut&&SignOut(()=>{});

  useEffect(() => {
    dispatch(setManageList(null));
    getEnvelopeList();
  }, [currentTab, InBoxFilter, SentBoxFilter]);

  const menu = [
    {
      name: "inbox",
      type: "inbox",
      icon: "INBOX",
    },
    {
      name: "sent",
      type: "sent",
      icon: "SEND",
    },
    {
      name: "drafts",
      type: "draft",
      icon: "DRAFT",
    },

    {
      name: "Self Sign",
      type: "self_sign",
      icon: "SIGNATURE",
      isQuickView: true,
    },
  ];

  const renderNoDataTitle = () => {
    switch (currentMenu) {
      case "Inbox":
        return {
          title: "No inbox envelopes yet!",
          subtitle: "Anything you receives will show here.",
        };
      case "Sent":
        return {
          title: "No sent envelopes yet!",
          subtitle: "Anything you sents will show here.",
        };
      case "Drafts":
        return {
          title: "No drafts envelopes yet!",
          subtitle: "Anything you draft will show here.",
        };
      case "Deleted":
        return {
          title: "No deleted envelopes yet!",
          subtitle: "Anything you delete will show here.",
        };
      case "Expiring Soon ":
        return {
          title: "If It's urgent it's here",
          subtitle: "Envelopes expiring within 6 days live here",
        };
      case "Action Required ":
        return {
          title: "If It's action required it's here",
          subtitle: "Envelopes requires urgent attention live here",
        };
      case "Completed":
        return {
          title: "If It's done it's here",
          subtitle: "Envelopes that has been signed by everyone live here.",
        };
      default:
        return {
          title: "NO DATA FOUND",
          subtitle: "NO DATA FOUND",
        };
    }
  };
 // console.log("FILETR", InBoxFilter, SentBoxFilter);
  return (
    <View className="bg-white justify-center px-2">
      <View className="W-full flex flex-row ">
        <View
          style={{
            //width: Dimensions.get("screen").width,
            height: 50,
            padding: 3,
            marginVertical: 6,
          }}
          className="bg-white  overflow-x-scroll flex flex-row gap-x-2"
        >
          {menu?.map((menu) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setEnvelopeList([]);
                  setCurrentMenu(menu?.name);
                  setSelectedMenu(menu?.name);
                  dispatch(setCurrentTab(menu?.type));
                }}
                key={menu.name}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 0.26,
                  elevation: 2,
                }}
                className={`${
                  currentTab === menu?.type
                    ? "bg-[#d10000]"
                    : "bg-white border border-gray-300"
                }  my-1 flex items-center text-center justify-center  rounded-xl ${
                  ["sent", "inbox"]?.includes(currentTab) ? "" : "w-20"
                }`}
              >
                <Text
                  textBreakStrategy="simple"
                  className={`${
                    currentTab === menu?.type ? "text-white " : "text-gray-700"
                  } px-2.5 font-semibold text-xs `}
                >
                  {menu?.name}{" "}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {["sent", "inbox"]?.includes(currentTab) ? (
          <View className="w-full flex justify-center px-1 ">
            <CustomSelector
              width={110}
              dataList={InBoxFilterList}
              setSelectedValue={(e: any) => {
                if (currentTab === "inbox") {
                  setInBoxFilter(e?.option?.value);
                } else if (currentTab === "sent") {
                  setSentBoxFilter(e?.option?.value);
                }
              }}
              selectedItem={(item, index) => (
                <View className=" w-full h-full bg-white rounded-xl flex flex-row ">
                  <View className="w-full  h-full flex items-start justify-center">
                    <Text className="text-gray-500 w-full text-[10px] font-normal">
                      {currentTab === "inbox"
                        ? InBoxFilter ?? "All"
                        : SentBoxFilter ?? "All"}
                    </Text>
                  </View>
                </View>
              )}
              dropDownItems={(item, index) => (
                <View className="mx-3 w-full h-full bg-white rounded-xl flex flex-row pr-2">
                  <View className="w-full  h-full flex items-start justify-center">
                    <Text
                      className="text-gray-500 w-full text-[10px] font-normal"
                      numberOfLines={1}
                    >
                      {item?.title}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : null}
      </View>
      {/* <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        style={{
          // width: Dimensions.get("screen").width,
          height: 50,
          padding: 3,
          marginVertical: 6,
        }}
        className="bg-white overflow-x-scroll flex flex-row gap-x-2"
      >
        {menu?.map((menu) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setEnvelopeList([]);
                setCurrentMenu(menu?.name);
                setSelectedMenu(menu?.name);
                dispatch(setCurrentTab(menu?.type));
              }}
              key={menu.name}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.32,
                shadowRadius: 0.26,
                elevation: 2,
              }}
              className={`${
                currentMenu === menu?.name
                  ? "bg-[#d10000]"
                  : "bg-white border border-gray-300"
              }  my-1 flex items-center text-center justify-center  rounded-xl`}
            >
              <Text
                textBreakStrategy="simple"
                className={`${
                  currentMenu === menu?.name ? "text-white " : "text-gray-700"
                } px-2.5 font-semibold text-xs `}
              >
                {menu?.name}{" "}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
      {
        <FlatList
          className="w-full px-3 h-full"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
          data={list}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }: any) => (
            <EnvelopeListCard envelope={item} navigation={navigation} />
          )}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.7}
          onEndReached={() => {
            if (hasnextpage) {
              //console.log(page);
              //console.log("CURRENT MENU", selectedMenu);
              setPage(page + 1);
              getEnvelopeList();
            } else {
              setListLoading(false);
            }
          }}
          refreshing={refresh}
          onRefresh={() => {
            setEnvelopeList([]);
            getEnvelopeList();
          }}
          ListFooterComponent={
            listloading ? (
              <ActivityIndicator
                className="text-4xl"
                size="large"
                color="#d10000"
              />
            ) : (
              <></>
            )
          }
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={true}
          ListEmptyComponent={
            listIsEmpty ? (
              <View className="w-full h-full items-center justify-center">
                <NoDataFound
                  width={200}
                  height={200}
                  title={renderNoDataTitle()?.title}
                  subTitle={renderNoDataTitle().subtitle}
                />
              </View>
            ) : (
              <></>
            )
          }
        />
      }
    </View>
  );
};
export default Manage;
