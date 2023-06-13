import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import IndeterminateProgressBar from "../components/atoms/IndeterminateProgressBar";
import NoDataFound from "../components/atoms/NoDataFound";
import DraggableModal from "../components/modals/DraggableModal";
import ApiConfig from "../constants/ApiConfig";
import apiEndpoints from "../constants/apiEndpoints";
import routes from "../constants/routes";
import useAuth from "../utils/auth";
import { convertDate } from "../utils/dateConvertor";
import CryptoHandler from "../utils/EncryptDecryptHandler";
import GetSvg from "../utils/GetSvg";
import HttpService from "../utils/HttpService";
import Home from "./Home/Home";
import Manage from "./Manage/Manage";
import Profile from "./Profile/Profile";
import Subscriptions from "./Subscriptions/Subscription";
import Templates from "./Templates/Templates";
import { useNotifications, useUser } from "../utils/useReduxUtil";
import NotificationsService from "../services/NotificationsService";
import { useDispatch } from "react-redux";
import { setNotifications } from "../redux/reducers/NotificationSlice";
import {
  setRecipients,
  setselectedRecipients,
} from "../redux/reducers/RecipientSlice";
import { setEnvelope } from "../redux/reducers/envelopeSlice";
import {
  setEnvelopeStep,
  setLoadingModal,
  setModalType,
} from "../redux/reducers/uiSlice";
import {
  setDocuments,
  setSelecteDocument,
} from "../redux/reducers/documentsSlice";
import { setFixedFields } from "../redux/reducers/PdfSlice";
import React from "react";
import store, { revertAll } from "../redux/store";
import ApiInstance from "../services/ApiInstance";

interface DashboardProps {
  navigation: any;
  route: any;
}
const Dashboard: React.FC<DashboardProps> = ({ navigation, route }) => {
  const { SignOut } = useAuth();
  const [currentTab, setCurrentTab] = useState("Manage");
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsModal, setNotificationsModal] = useState(false);
  //const notifications = useNotifications();
  const [notifications, setNotifications] = useState<any>([]);
  const toast = useToast();
  const user = useUser();
  const { auth, token } = useAuth();
  const [userProfilePicture, setUserProfilePicture] = useState<any>(
    user?.profile_picture
  );

  // useEffect(() => {
  //   const popAction = StackActions.pop(0);
  //   navigation.dispatch(popAction);
  // }, []);

  const tabList = [
    {
      name: "Home",
      component: <Home navigation={navigation} route={route} />,
      icon: "homeIcon",
      screenName: "Dashboard",
    },

    {
      name: "Manage",
      component: (
        <Manage
          setIsLoading={setIsLoading}
          navigation={navigation}
          route={route}
        />
      ),
      icon: "inboxIcon",
      screenName: "Manage",
    },
    {
      name: "Templates",
      component: (
        <Templates setIsLoading={setIsLoading} navigation={navigation} />
      ),
      icon: "templatestIcon",
      screenName: "Templates",
    },
    {
      name: "Subscriptions",
      component: <Subscriptions navigation={navigation} />,
      icon: "subscriptionIcon",
      screenName: "Subscriptions",
    },
    {
      name: "ProfileSettings",
      component: (
        <Profile
          setIsLoading={setIsLoading}
          navigation={navigation}
          userProfilePicture={userProfilePicture}
          setUserProfilePicture={setUserProfilePicture}
        />
      ),

      icon: "userIcon2",
      screenName: "Settings",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    setUserProfilePicture(user?.profile_picture);
  }, [user?.profile_picture]);
  const getNotifications = () => {
    NotificationsService.readAllNotifications((data) => {
      if (data) {
        setNotifications(data);
      }
    });
  };

  enum NotificationAction {
    ACCEPT_INVITE = "ACCEPT_INVITE",
    REJECT_INVITE = "REJECT_INVITE",
    READ_NOTIFICATIONS = "READ_NOTIFICATIONS",
  }

  useEffect(() => {
    getNotifications();
  }, [notificationsModal]);

  const handleInviteActions = (type: NotificationAction, id: number) => {
    HttpService.post(apiEndpoints.notifications.readAllNotifications, {
      token: token ?? "",
      body: JSON.stringify({
        action: type,
        id: id,
      }),
    }).then((res) => {
      if (res) {
        //console.log("NOTIFICTIONS", res);
        toast.show(res?.message, { type: res?.status ? "success" : "error" });
        setNotificationsModal(false);
      }
    });
  };

  const dimension = useWindowDimensions();

  //console.log("HEIGHT:", dimension);

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <IndeterminateProgressBar loading={isLoading ?? false} />
      <View
        className="w-full px-4 flex text-black text-xl  justify-between items-center flex-row border-b border-gray-200"
        style={{
          height: 58,
          width: dimension.width,
        }}
      >
        <View
          className=""
          style={{
            width: 255,
          }}
        >
          <Text className="font-semibold text-lg">{currentTab}</Text>
        </View>
        <View
          className={` flex text-black  text-xl w-20   items-center flex-row ${
            currentTab === "Settings" ? "justify-end px-2" : "justify-between"
          } `}
        >
          <TouchableOpacity
            onPress={() => {
              setNotificationsModal(!notificationsModal);
            }}
            className="relative items-center justify-center"
          >
            <GetSvg
              name="bellIcon"
              classN="w-7 h-7"
              strokeWidth={1.2}
              pathStrokeWidth={1.2}
            />
            {/* <View className="absolute text-center h-2.5 w-2.5 justify-center items-center right-1 top-0 rounded-full  bg-[#d10000] text-white font-bold ">
              <Text className="  text-white text-[10px] mx-0.5"></Text>
            </View> */}
          </TouchableOpacity>
          {currentTab !== "Settings" && (
            <Pressable
              onPress={() => {
                navigation.navigate(routes.Settings);
              }}
              className="w-9 h-9  rounded-full"
            >
              {!isEmpty(userProfilePicture) ? (
                <Image
                  resizeMode="contain"
                  className="rounded-full h-full w-full shadow-2xl"
                  source={{
                    width: 50,
                    height: 50,
                    uri: userProfilePicture,
                  }}
                  onError={() => {
                    setUserProfilePicture(null);
                  }}
                />
              ) : (
                <Pressable
                  onPress={() => {
                    navigation.navigate(routes.Settings);
                  }}
                  className="w-full h-full border border-gray-800 rounded-full justify-center items-center"
                >
                  <GetSvg name="userIcon" classN="w-5 h-5  " color="#374151" />
                </Pressable>
              )}
            </Pressable>
          )}
        </View>
      </View>

      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={({ route }) => {
          return {
            tabBarActiveTintColor: "#d10000",
            tabBarShowLabel: false,
            tabBarIconStyle: {
              fontSize: 50,
              width: dimension.width / 5,
            },
            tabBarStyle: {
              height: 55,
              width: dimension.width,
            },
          };
        }}
      >
        {tabList.map((tab) => {
          return (
            <Tab.Screen
              key={tab.name}
              name={tab.name}
              children={() => {
                return tab.component as any;
              }}
              listeners={{
                tabPress: (e) => {
                  if (tab.screenName === "Settings") {
                    e.preventDefault();
                    navigation?.navigate(routes.Settings);
                  } else {
                    setCurrentTab(tab.screenName);
                  }
                },
              }}
              options={{
                headerShown: false,

                tabBarIcon: ({ color, size }) => (
                  <GetSvg name={tab.icon} classN="w-7 h-7" color={color} />
                ),
                tabBarLabelStyle: {
                  fontSize: 20,
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
      {currentTab !== "Settings" && (
        <TouchableOpacity
          onPress={() => {
            dispatch(setRecipients(null));
            dispatch(setEnvelope(null));
            dispatch(setEnvelopeStep(0));
            dispatch(setSelecteDocument(null));
            //navigate(ProtectedRoutes.createEnvelope);
            dispatch(setFixedFields(null));
            dispatch(setDocuments(null));
            dispatch(setRecipients(null));
            dispatch(setEnvelope(null));
            dispatch(setEnvelopeStep(0));
            dispatch(setModalType(""));
            dispatch(setLoadingModal(false));
            //dispatch(setCurrentTab("inbox"));
            dispatch(setselectedRecipients(null));
            navigation.push(routes.createEnvelope);
          }}
          style={{
            bottom: 70,
            right: 20,
          }}
          className=" bg-[#d10000] p-2 absolute rounded-full "
        >
          <Text className="">
            <GetSvg name="addIcon" color="white" classN="w-8 h-8" />
          </Text>
        </TouchableOpacity>
      )}
      {notificationsModal && (
        <DraggableModal
          isOpen={notificationsModal}
          setIsOpen={setNotificationsModal}
          modalHeightInPercentage={70}
          children={
            <View className="w-full px-1 py-2">
              <View className="w-full h-8 px-3 justify-center items-start my-2">
                <Text className="text-lg font-medium">Notifications </Text>
              </View>
              <ScrollView className="w-full h-full">
                {!isEmpty(notifications) ? (
                  notifications?.map((i: any) => {
                    let profilePciture = i?.user?.profile_picture;

                    return (
                      <View
                        key={i?.id}
                        style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 0,
                          },
                          shadowOpacity: 0.1,
                          shadowRadius: 0.1,
                          elevation: 2,
                        }}
                        className="h-20 border rounded-lg mx-2 my-1 border-gray-300 bg-white flex flex-row"
                      >
                        <View className="w-[16%] h-full justify-center items-end relative">
                          <View className="rounded-full w-12 h-12 absolute bg-gray-200 items-center justify-center">
                            <GetSvg name="userIcon" />
                          </View>
                          {profilePciture ? (
                            <Image
                              resizeMode="contain"
                              className="rounded-full w-12 h-12"
                              source={{
                                uri: profilePciture ?? "",
                              }}
                              onError={() => {
                                profilePciture = "";
                              }}
                            />
                          ) : null}
                        </View>

                        <View
                          className={` ${
                            i?.notification_type === "ALERT"
                              ? "w-[80%]"
                              : "w-[60%]"
                          } h-full flex flex-col justify-center px-2`}
                        >
                          <Text className="text-base font-medium">
                            {i?.heading}
                          </Text>
                          <Text className="text-xs my-0.5" numberOfLines={1}>
                            {i?.message}
                          </Text>
                          <Text className="text-[10px]">
                            {convertDate(i?.created_at, "datetime")}
                          </Text>
                        </View>
                        <View
                          className={`w-[24%] flex justify-center items-center `}
                        >
                          {i?.notification_type === "INVITE" ? (
                            <React.Fragment>
                              {i?.action_status === "PENDING" ? (
                                <View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      const viewToken = i?.action_token
                                        ?.split("api")
                                        .pop();
                                      ApiInstance.get(viewToken).then(
                                        (res: any) => {
                                          if (res?.status === 200) {
                                            if (res?.data?.success) {
                                              SignOut &&
                                                SignOut(() => {
                                                  store.dispatch(revertAll());
                                                  // navigation.navigate(routes.login);
                                                });
                                            }
                                          }
                                        }
                                      );
                                    }}
                                    className="bg-[#d10000] p-1 my-1 px-2.5 rounded-xl"
                                  >
                                    <Text className="text-white font-medium text-center text-xs">
                                      Accept{" "}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      const viewToken = i?.reject_token
                                        ?.split("api")
                                        .pop();
                                      ApiInstance.get(viewToken).then(
                                        (res: any) => {
                                          if (res?.status === 200) {
                                            if (res?.data?.success) {
                                              SignOut &&
                                                SignOut(() => {
                                                  store.dispatch(revertAll());
                                                  // navigation.navigate(routes.login);
                                                });
                                            }
                                          }
                                        }
                                      );
                                    }}
                                    className="bg-gray-800 p-1 px-2.5 rounded-xl"
                                  >
                                    <Text className="text-white font-medium text-center text-xs">
                                      Reject{" "}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              ) : i?.action_status === "ACCEPTED" ? (
                                <TouchableOpacity className="bg-[#d10000] p-1.5 px-2.5 rounded-xl">
                                  <Text className="text-white font-medium text-center">
                                    ACCEPTED{" "}
                                  </Text>
                                </TouchableOpacity>
                              ) : i?.action_status === "REJECTED" ? (
                                <TouchableOpacity className="w-fit uppercase cursor-pointer p-1.5  px-3 bg-gray-200 text-black rounded-lg md:text-[10px] text-[8px] font-medium">
                                  <Text className="font-semibold text-center text-[10px]">
                                    REJECTED{" "}
                                  </Text>
                                </TouchableOpacity>
                              ) : null}
                            </React.Fragment>
                          ) : i?.notification_type === "ENVELOPE" ? (
                            <TouchableOpacity
                              onPress={() => {
                                const envelope = {
                                  access_token: i?.action_token,
                                };

                                console.log("VIEW", envelope);
                                navigation?.navigate(routes.viewEnvelope, {
                                  envelope,
                                  currentTab: "SIGN",
                                });
                              }}
                              className="bg-[#d10000] p-1.5 px-2.5 rounded-xl"
                            >
                              <Text className="text-white font-medium text-center">
                                View{" "}
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                        {/* {i?.notification_type === "invite" ? (
                          <>
                            <View className="w-[60%] h-full flex flex-col justify-center px-2">
                              <Text className="text-base font-medium">
                                {i?.heading}
                              </Text>
                              <Text
                                className="text-xs my-0.5"
                                numberOfLines={1}
                              >
                                {i?.text}
                              </Text>
                              <Text className="text-[10px]">
                                {convertDate(i?.created_at, "datetime")}
                              </Text>
                            </View>
                            <View className="w-[24%] h-full flex flex-col justify-evenly items-center">
                              {i?.action === "INVITE_PENDING" ? (
                                <>
                                  <TouchableOpacity
                                    onPress={() => {
                                      handleInviteActions(
                                        NotificationAction.ACCEPT_INVITE,
                                        i?.id
                                      );
                                    }}
                                    className="bg-[#d10000] p-1.5 px-2.5 rounded-xl"
                                  >
                                    <Text className="text-white font-medium text-center">
                                      Accept{" "}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      handleInviteActions(
                                        NotificationAction.REJECT_INVITE,
                                        i?.id
                                      );
                                    }}
                                    className="bg-gray-800 p-1.5 px-2.5 rounded-xl"
                                  >
                                    <Text className="text-white font-medium text-center">
                                      Reject{" "}
                                    </Text>
                                  </TouchableOpacity>
                                </>
                              ) : i?.action === "INVITE_ACCEPTED" ? (
                                <TouchableOpacity className="bg-[#d1000099] p-1.5 px-2.5 rounded-xl">
                                  <Text className="text-white font-medium text-center">
                                    Accepted{" "}
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity className="bg-gray-800 opacity-70 p-1.5 px-2.5  rounded-xl">
                                  <Text className="text-white font-medium text-center">
                                    Rejected{" "}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </>
                        ) : i?.notification_type === "envelope" ? (
                          <>
                            <View className="w-[60%] h-full flex flex-col justify-center px-2">
                              <Text className="text-base font-medium">
                                {i?.heading}
                              </Text>
                              <Text
                                className="text-xs my-0.5"
                                numberOfLines={1}
                              >
                                {i?.text}
                              </Text>
                              <Text className="text-[10px]">
                                {convertDate(i?.created_at, "datetime")}
                              </Text>
                            </View>
                            <View className="w-[24%] h-full flex flex-col justify-evenly items-center">
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate(routes.Manage);
                                  setNotificationsModal(false);
                                }}
                                className="bg-[#d10000] p-1.5 px-2.5 rounded-xl"
                              >
                                <Text className="text-white font-medium text-center">
                                  View{" "}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <>
                            <View className="w-[84%] h-full flex flex-col justify-center px-2">
                              <Text className="text-base font-medium">
                                {i?.heading}
                              </Text>
                              <Text
                                className="text-xs my-0.5"
                                numberOfLines={1}
                              >
                                {i?.text}
                              </Text>
                              <Text className="text-[10px]">
                                {convertDate(i?.created_at, "datetime")}
                              </Text>
                            </View>
                          </>
                        )} */}
                      </View>
                    );
                  })
                ) : (
                  <View className="w-full  h-96 items-center justify-center  ">
                    <NoDataFound
                      width={200}
                      height={200}
                      title={"No notifications arrived yet!"}
                      subTitle={"Anything you get will show here."}
                    />
                  </View>
                )}
              </ScrollView>
            </View>
          }
          modalType="Notifications"
        />
      )}
    </SafeAreaView>
  );
};
export default Dashboard;
