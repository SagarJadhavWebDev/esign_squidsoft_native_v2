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

interface DashboardProps {
  navigation: any;
  route: any;
}
const Dashboard: React.FC<DashboardProps> = ({ navigation, route }) => {
  const [currentTab, setCurrentTab] = useState("Manage");
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsModal, setNotificationsModal] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const toast = useToast();
  const { auth, token } = useAuth();
  const [userProfilePicture, setUserProfilePicture] = useState<any>(
    ApiConfig.FILES_URL +
      "profile-pictures/" +
      auth?.user?.id +
      ".jpg?" +
      Date.now()
  );

  // useEffect(() => {
  //   const popAction = StackActions.pop(0);
  //   navigation.dispatch(popAction);
  // }, []);

  const tabList = [
    {
      name: "Home",
      component: (
        <Home
          setIsLoading={setIsLoading}
          navigation={navigation}
          route={route}
        />
      ),
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
  useEffect(() => {
    setUserProfilePicture(
      ApiConfig.FILES_URL +
        "profile-pictures/" +
        auth?.user?.id +
        ".jpg?" +
        Date.now()
    );
  }, [auth?.user]);
  const getNotifications = () => {
    HttpService.get(apiEndpoints.getNotifications, { token: token ?? "" }).then(
      (res) => {
        if (res?.message) {
          toast.show(res?.message, { type: "error" });
        } else {
          const data = CryptoHandler.response(res, token ?? "");
          setNotifications(data);
        }
      }
    );
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
    HttpService.post(apiEndpoints.notificationAction, {
      token: token ?? "",
      body: JSON.stringify({
        action: type,
        id: id,
      }),
    }).then((res) => {
      if (res) {
        console.log("NOTIFICTIONS", res);
        toast.show(res?.message, { type: res?.status ? "success" : "error" });
        setNotificationsModal(false);
      }
    });
  };

  const dimension = useWindowDimensions();

  console.log("HEIGHT:", dimension);

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
              setNotificationsModal(true);
            }}
            className="relative items-center justify-center"
          >
            <GetSvg
              name="bellIcon"
              classN="w-7 h-7"
              strokeWidth={1.2}
              pathStrokeWidth={1.2}
            />
            <View className="absolute text-center h-2.5 w-2.5 justify-center items-center right-1 top-0 rounded-full  bg-[#d10000] text-white font-bold ">
              <Text className="  text-white text-[10px] mx-0.5"></Text>
            </View>
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
      {notificationsModal && 
        <DraggableModal
          isOpen={notificationsModal}
          setIsOpen={setNotificationsModal}
          modalHeightInPercentage={70}
          children={
            <View className="w-full ">
              <View className="w-full h-8 px-3 justify-center items-start my-2">
                <Text className="text-lg font-medium">Notifications </Text>
              </View>
              <ScrollView className="w-full h-full">
                {!isEmpty(notifications) ? (
                  notifications?.map((i: any) => {
                    let profilePciture =
                      ApiConfig.FILES_URL +
                      "profile-pictures/" +
                      i?.created_by +
                      ".jpg?";

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
                        </View>
                        {i?.notification_type === "invite" ? (
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
                        )}
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
      }
    </SafeAreaView>
  );
};
export default Dashboard;
