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
  const [envelopeList, setEnvelopeList] = useState<EnvelopeType[]>([]);

  const [listloading, setListLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasnextpage, setHasNextPage] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [listIsEmpty, setListIsEmpty] = useState(false);

  const getEnvelopeList = (
    type: string,
    existingEnvelopeList: EnvelopeType[],
    pageNumber = 1
  ) => {
    setIsLoading && setIsLoading(true);
    setListLoading(true);
    setLoading(true);
    setListIsEmpty(false);
    HttpService.get(apiEndpoints.envelopeList(type, pageNumber, 10), {
      token: token ?? "",
    }).then((response) => {
      if (response) {
        const data = CryptoHandler.response(response, token ?? "");
        console.log("DATA:", data?.meta);
        setPage(data?.meta?.current_page);
        if (data?.meta?.total_pages > data?.meta?.current_page) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
        console.log("EXISTING ENVELIPE", envelopeList?.length);
        !isEmpty(existingEnvelopeList) &&
        !isNull(existingEnvelopeList) &&
        existingEnvelopeList?.length !== 0
          ? setEnvelopeList([...(existingEnvelopeList ?? []), ...data?.data])
          : setEnvelopeList(data?.data);
        if ([...(existingEnvelopeList ?? []), ...data?.data].length <= 0) {
          setListIsEmpty(true);
        }
        setLoading(false);
        setIsLoading && setIsLoading(false);
        setListLoading(false);
      }
    });
  };
  console.log("ENVELOPE LIST", envelopeList?.length);

  // SignOut&&SignOut(()=>{});

  const getQuickViewsList = (
    type: string,
    existingEnvelopeList: EnvelopeType[],
    pageNumber = 1
  ) => {
    setListIsEmpty(false);
    setIsLoading && setIsLoading(true);
    HttpService.get(apiEndpoints.quickViewsList(type, pageNumber, 10), {
      token: token ?? "",
    }).then((response) => {
      if (response) {
        const data = CryptoHandler.response(response, token ?? "");
        setPage(data?.meta?.current_page);
        if (data?.meta?.total_pages > data?.meta?.current_page) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
        !isEmpty(existingEnvelopeList) &&
        !isNull(existingEnvelopeList) &&
        existingEnvelopeList?.length !== 0
          ? setEnvelopeList([...(existingEnvelopeList ?? []), ...data?.data])
          : setEnvelopeList(data?.data);
        if ([...(existingEnvelopeList ?? []), ...data?.data].length <= 0) {
          setListIsEmpty(true);
        }
        setIsLoading && setIsLoading(false);
        setListLoading(false);
      }
    });
  };

  useEffect(() => {
    getEnvelopeList("inbox", []);
  }, []);

  useEffect(() => {
    if (router?.update) {
      setEnvelopeList([]);
      getEnvelopeList(selectedMenu, []);
    }
  }, [router?.update]);

  const menuList = [
    {
      name: "Inbox",
      menu: "inbox",
      onClick: () => {
        getEnvelopeList("inbox", [], 1);
      },
    },
    {
      name: "Sent",
      menu: "sent",
      onClick: () => {
        getEnvelopeList("sent", [], 1);
      },
    },
    {
      name: "Drafts",
      menu: "draft",
      onClick: () => {
        getEnvelopeList("draft", [], 1);
      },
    },
    {
      name: "Deleted",
      menu: "deleted",
      onClick: () => {
        getEnvelopeList("deleted", [], 1);
      },
    },
    {
      name: "Expiring Soon ",
      menu: "expiringsoon",
      onClick: () => {
        getQuickViewsList("expiringsoon", [], 1);
      },
    },
    {
      name: "Action Required ",
      menu: "actionrequired",
      onClick: () => {
        getQuickViewsList("actionrequired", [], 1);
      },
    },
    {
      name: "Completed",
      menu: "completed",
      onClick: () => {
        getQuickViewsList("completed", [], 1);
      },
    },
  ];
  console.log("ROUTER", router);
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

  return (
    <View className="bg-white justify-center items-center">
      <ScrollView
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
        {menuList.map((menu) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setEnvelopeList([]);
                menu.onClick();
                setCurrentMenu(menu.name);
                setSelectedMenu(menu.menu);
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
                currentMenu === menu.name
                  ? "bg-[#d10000]"
                  : "bg-white border border-gray-300"
              }  my-1 flex items-center text-center justify-center  rounded-xl`}
            >
              <Text
                textBreakStrategy="simple"
                className={`${
                  currentMenu === menu.name ? "text-white " : "text-gray-700"
                } px-2.5 font-semibold text-xs `}
              >
                {menu.name}{" "}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {
        <FlatList
          className="w-full px-3 h-full"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
          data={envelopeList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }: any) => (
            <EnvelopeListCard
              type={currentMenu}
              envelope={currentMenu === "Inbox" ? item?.envelope : item}
              operation={item?.operation}
              token={item?.token}
              navigation={navigation}
            />
          )}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.7}
          onEndReached={() => {
            if (hasnextpage) {
              console.log(page);
              console.log("CURRENT MENU", selectedMenu);
              getEnvelopeList(selectedMenu, envelopeList, page + 1);
            } else {
              setListLoading(false);
            }
          }}
          refreshing={refresh}
          onRefresh={() => {
            setEnvelopeList([]);
            getEnvelopeList(selectedMenu, [], 1);
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
