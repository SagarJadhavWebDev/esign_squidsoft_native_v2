import { useFocusEffect } from "@react-navigation/native";
import {
  camelCase,
  capitalize,
  isEmpty,
  isNull,
  kebabCase,
  startCase,
} from "lodash";
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
import {
  useCurrentPage,
  useIsLoading,
  useManageList,
} from "../../utils/useReduxUtil";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab, setManageList } from "../../redux/reducers/ManageSlice";
import CustomSelector from "../../components/molecules/CustomSelector";
import {
  manageInboxFilter,
  manageSentFilter,
} from "../../types/ManageListTypes";
import { ApplicationState } from "../../redux/store";
import {
  setFilter,
  setUpdateQuery,
  setshowConfirmDeleteModal,
  setshowVoidEnvelopeModal,
} from "../../redux/reducers/uiSlice";
import { setCurrentPage } from "../../redux/reducers/PaginationSlice";
import VoidEnvlopeModal from "../../components/modals/VoidEnvlopeModal";
import ApiInstance from "../../services/ApiInstance";
import apiEndpoint from "../../constants/apiEndpoints";
import handleResponse from "../../services/handleResponse";
import { useToast } from "react-native-toast-notifications";
import { setIsLoading as setloadingModal } from "../../redux/reducers/uiSlice";
import DeleteEnvelopeModal from "../../components/modals/DeleteEnvelopeModal";
import { nanoid } from "@reduxjs/toolkit";
interface ManageProps {
  navigation: any;
  setIsLoading?: any;
  route?: any;
}
const Manage: React.FC<ManageProps> = ({ route, navigation, setIsLoading }) => {
  const { token } = useAuth();
  const [currentMenu, setCurrentMenu] = useState("Inbox");
  const [selectedMenu, setSelectedMenu] = useState("inbox");
  const [loading, setLoading] = useState(false);
  const { currentTab, list, meta } = useManageList();
  const page = useCurrentPage();
  const [envelopeList, setEnvelopeList] = useState<EnvelopeType[]>([]);
  const [listloading, setListLoading] = useState(false);
  //const [page, setPage] = useState<number>(1);
  const [hasnextpage, setHasNextPage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const dispatch = useDispatch();
  const updateQuery = useSelector(
    (state: ApplicationState) => state?.ui?.updateQuery
  );
  const filterFromQuickview = useSelector(
    (state: ApplicationState) => state?.ui?.filter
  );

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
      filterFromQuickview,
      (data: any) => {
        // console.log("page api", data?.last_page, page);
        if (data) {
          if (page > 1) {
            const newData = [...(list ?? []), ...(data?.data ?? [])];
            const b = { ...data, data: newData };
            console.log("pageascsc", data?.last_page, page, b?.data?.length);
            dispatch(setManageList(b));
            setLoading(false);
            setIsLoading && setIsLoading(false);
            setListLoading(false);
          } else {
            // console.log("pageascsc", data?.last_page,page);
            dispatch(setManageList(data));
            setLoading(false);
            setIsLoading && setIsLoading(false);
            setListLoading(false);
          }
        } else {
        }
      }
    );
    // console.log("currentTab", currentTab, filterFromQuickview, page);
  };

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
    const tab = isEmpty(filterFromQuickview) ? currentTab : filterFromQuickview;
    switch (tab) {
      case "inbox":
        return {
          title: "No inbox envelopes yet!",
          subTitle: "Anything you receives will show here.",
        };
      case "action_required":
        return {
          title: "If It's action required it's here",
          subTitle: "Envelopes requires urgent attention live here",
        };
      case "expiring_soon":
        return {
          title: "If It's urgent it's here",
          subTitle: "Envelopes expiring within 6 days live here",
        };
      case "completed":
        return {
          title: "No completed envelopes yet!",
          subTitle: "All signed envelopes will show here.",
        };
      case "sent":
        return {
          title: "No sent envelopes yet!",
          subTitle: "Anything you sents will show here.",
        };
      case "draft":
        return {
          title: "No drafts envelopes yet!",
          subTitle: "Anything you draft will show here.",
        };
      case "waiting_on_others":
        return {
          title: "No envelopes yet!",
          subTitle: "Anything you will send to others will show here.",
        };
      case "rejected":
        return {
          title: "No rejected envelopes yet!",
          subTitle: "anything you rejected envelopes will show here.",
        };
      case "signed":
        return {
          title: "No signed envelopes yet!",
          subTitle: "anything you signed envelopes will show here.",
        };
      case "pending":
        return {
          title: "No pending envelopes yet!",
          subTitle: "anything your pending envelopes will show here.",
        };
      case "self_sign":
        return {
          title: "No self sign envelopes yet!",
          subTitle: "anything you self sign will show here.",
        };
      case "void":
        return {
          title: "No Void envelopes yet!",
          subTitle: "anything you void will show here.",
        };
      default:
        return {
          title: "No inbox envelopes yet!",
          subTitle: "Anything you receives will show here.",
        };
    }
  };
  const toast = useToast();

  const isloading = useIsLoading();
  const modalToken: any = useSelector(
    (state: ApplicationState) => state?.ui?.modalData
  );
  const handleVoidEnvelope = (value: any) => {
    setLoading(true);
    dispatch(setloadingModal(true));
    dispatch(setshowVoidEnvelopeModal(false));
    HttpService.post(apiEndpoint.envelope.voidEnvelope(modalToken), {
      body: JSON.stringify({ reason: value }),
    })
      .then((res) => {
        toast.show(res?.message, {
          type: res?.success ? "success" : "error",
        });
        dispatch(setloadingModal(false));
        dispatch(setUpdateQuery(nanoid()));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setshowVoidEnvelopeModal(true));
        dispatch(setloadingModal(false));
      });
  };
  const handleDeleteEnvelope = () => {
    setLoading(true);
    dispatch(setloadingModal(true));
    dispatch(setshowConfirmDeleteModal(false));
    const deleteTokens = modalToken?.split("api/").pop();
    HttpService.delete(deleteTokens)
      .then((res) => {
        toast.show(res?.message, {
          type: res?.success ? "success" : "error",
        });
        dispatch(setloadingModal(false));
        dispatch(setUpdateQuery(nanoid()));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setshowConfirmDeleteModal(true));
        dispatch(setloadingModal(false));
      });
  };

  const isOpenVoidEnvelope = useSelector(
    (state: ApplicationState) => state?.ui?.showVoidEnvelopeModal
  );
  const isOpenDeleteEnvelope = useSelector(
    (state: ApplicationState) => state?.ui?.showConfirmDeleteModal
  );
  useEffect(() => {
    getEnvelopeList();
  }, [currentTab, page, filterFromQuickview, updateQuery]);
  return (
    <React.Fragment>
      <View className="bg-white justify-center px-2">
        <View className="W-full flex flex-row py-2">
          <View className={`w-[70%] flex flex-row  `}>
            {menu?.map((menu) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (menu?.name === currentTab) {
                      return null;
                    }
                    dispatch(setFilter(null));
                    dispatch(setManageList(null));
                    dispatch(setCurrentTab(menu?.type));
                    setCurrentMenu(menu?.name);
                    setSelectedMenu(menu?.name);
                    dispatch(setCurrentPage(1));
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
                  }  rounded-xl flex mx-1 w-[22.5%] justify-center items-center text-center `}
                >
                  <Text
                    textBreakStrategy="simple"
                    className={`${
                      currentTab === menu?.type
                        ? "text-white "
                        : "text-gray-700"
                    } px-2.5 font-semibold text-[10px] capitalize `}
                  >
                    {menu?.name}{" "}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View className={`w-[30%] ml-2  flex justify-center items-center `}>
            <CustomSelector
              disabled={
                ["draft", "self_sign"].includes(currentTab) ? true : false
              }
              width={100}
              dataList={
                currentTab === "inbox" ? InBoxFilterList : SentBoxFilterList
              }
              setSelectedValue={(e: any) => {
                dispatch(setCurrentPage(1));
                dispatch(setFilter(e?.option?.value));
              }}
              selectedItem={(item, index) => (
                <View className=" h-full bg-white rounded-xl flex flex-row ">
                  <View className="w-full  h-full flex items-start justify-center">
                    <Text className="text-gray-700 font-semibold w-full text-[10px] ">
                      {isEmpty(filterFromQuickview)
                        ? "All"
                        : startCase(camelCase(filterFromQuickview))}
                    </Text>
                  </View>
                </View>
              )}
              dropDownItems={(item, index) => (
                <View className="mx-3 w-72  h-full bg-white rounded-xl flex flex-row">
                  <View className="w-full  h-full flex items-start justify-center">
                    <Text
                      className="text-gray-700 w-full text-[10px] font-semibold"
                      numberOfLines={1}
                    >
                      {item?.title}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        <FlatList
          className="w-full  h-full"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
          data={list}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }: any) => (
            <EnvelopeListCard
              key={index}
              envelope={item}
              navigation={navigation}
            />
          )}
          // maxToRenderPerBatch={10}
          onEndReachedThreshold={0.7}
          onEndReached={(e) => {
            if (meta?.last_page !== page && !loading) {
              setListLoading(true);
              dispatch(setCurrentPage(page + 1));
            } else {
              setListLoading(false);
            }
          }}
          refreshing={refresh}
          onRefresh={() => {
            dispatch(setCurrentPage(1));
            dispatch(setManageList(null));
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
            isEmpty(list) && !loading ? (
              <View className="w-full h-full items-center justify-center">
                <NoDataFound
                  width={200}
                  height={200}
                  title={renderNoDataTitle()?.title}
                  subTitle={renderNoDataTitle().subTitle}
                />
              </View>
            ) : (
              <></>
            )
          }
        />
      </View>
      {isloading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
      {isOpenVoidEnvelope ? (
        <VoidEnvlopeModal callBack={handleVoidEnvelope} />
      ) : null}
      {isOpenDeleteEnvelope ? (
        <DeleteEnvelopeModal callBack={handleDeleteEnvelope} />
      ) : null}
    </React.Fragment>
  );
};
export default Manage;
