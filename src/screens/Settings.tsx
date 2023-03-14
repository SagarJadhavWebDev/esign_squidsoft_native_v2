import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import Slider from "../components/carosules/slider";
import ChangePasswordModal from "../components/modals/ChangePassword";
import EditProfileModal from "../components/modals/EditProfileModal";
import VerifyEmailModal from "../components/modals/VerifyEmailModal";
import ApiConfig from "../constants/ApiConfig";
import apiEndpoints from "../constants/apiEndpoints";
import routes from "../constants/routes";
import { activateTrial } from "../utils/activateTrial";
import useAuth from "../utils/auth";
import getIpData from "../utils/getIpData";
import GetSvg from "../utils/GetSvg";
import HttpService from "../utils/HttpService";

interface SettingsProps {
  navigation: any;
}
const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { auth, token, RefreshUser, SignOut } = useAuth();
  const user = auth?.user;
  const [EditProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const toast = useToast();
  const [userProfilePicture, setUserProfilePicture] = useState<any>(
    ApiConfig.FILES_URL +
      "profile-pictures/" +
      auth?.user?.id +
      ".jpg?" +
      Date.now()
  );
  const ProfileMenuList = [
    {
      name: "Edit Profile",
      icon: "userIcon",
      onClick: () => {
        setEditProfile(true);
      },
    },
    {
      name: "Change Password",
      icon: "lockIcon",
      onClick: () => {
        setChangePassword(true);
      },
    },
    {
      name: "Create Organization",
      icon: "organazationIcon",
      onClick: () => {},
    },
    {
      name: "Subscriptions",
      icon: "subscriptionIcon",
      onClick: () => navigation.navigate(routes.Subscriptions),
    },
  ];

  const moreMenuList = [
    {
      name: "Plans",
      icon: "infoIcon",
      onClick: () => {
        navigation.navigate(routes.Plans);
      },
    },
    {
      name: "About Us",
      icon: "infoIcon",
      onClick: () => {
        Linking.openURL("https://squidsoft.tech/about-us").catch((err) =>
          console.error("An error occurred", err)
        );
      },
    },
    {
      name: "Feedback",
      icon: "feedbackIcon",
      onClick: () => {
        Linking.openURL("https://squidsoft.tech/about-us").catch((err) =>
          console.error("An error occurred", err)
        );
      },
    },
    {
      name: "Terms & Conditions",
      icon: "organazationIcon",
      onClick: () => {
        Linking.openURL("https://squidsoft.tech/termscond").catch((err) =>
          console.error("An error occurred", err)
        );
      },
    },
    {
      name: "Privacy Policy",
      icon: "privacyIcon",
      onClick: () => {
        Linking.openURL("https://squidsoft.tech/privacypolicy").catch((err) =>
          console.error("An error occurred", err)
        );
      },
    },
    {
      name: "Cancellation & Refund",
      icon: "subscriptionIcon",
      onClick: () => {
        Linking.openURL("https://squidsoft.tech/refundpolicy").catch((err) =>
          console.error("An error occurred", err)
        );
      },
    },
    {
      name: "Logout",
      icon: "logoutIcon",
      onClick: () => {
        SignOut &&
          SignOut(() => {
            // navigation.navigate(routes.login);
          });
      },
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

  const SendOtp = () => {
    setIsLoading(true);
    HttpService.post(apiEndpoints.sendOtp, {
      body: JSON.stringify({
        email: auth?.user?.email,
      }),
    }).then((res) => {
      console.log("OTP", res);
      if (res?.message) {
        setIsLoading(false);
        setVerifyEmail(true);

        toast.show(res?.message, { type: "success" });
      } else {
        setIsLoading(false);
      }
    });
  };
  return (
    <View className="w-full h-full">
      <ScrollView className="h-full">
        <GetSvg
          name="leftArrowIcon"
          classN="w-5 h-5 mt-3 mx-3"
          callBack={() => {
            navigation.navigate(routes.dashboard);
          }}
        />

        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.32,
            shadowRadius: 0.26,
            elevation: 8,
          }}
          className="bg-white rounded-xl mx-3 my-3 h-36 flex flex-row justify-between items-center p-5"
        >
          <View className="h-full flex flex-col items-start justify-center gap-1">
            <Text className="text-gray-400 tracking-wider w-full">Welcome</Text>
            <Text
              numberOfLines={1}
              className="w-full max-w-[200px] mb-1 text-lg capitalize"
            >
              {auth?.user?.name}{" "}
            </Text>

            <View className="flex flex-row justify-between items-center">
              {auth?.user?.email_verified_at ? (
                <View className="px-1 pr-2 py-1 bg-green-600 rounded-full flex flex-row items-center justify-between mr-2">
                  <GetSvg
                    name="verifiedIcon"
                    color="white"
                    pathStrokeWidth={1.2}
                    classN="w-4 h-4 mr-0.5"
                  />
                  <Text className="text-white text-[10px] tracking-wide text-center w-full max-w-[40px]">
                    Verified
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    SendOtp();
                  }}
                  className="px-1 pr-2 py-1 bg-[#d10000] rounded-full flex flex-row items-center justify-between mr-2"
                >
                  <GetSvg
                    name="unVerifiedIcon"
                    color="white"
                    pathStrokeWidth={1.5}
                    classN="w-5 h-4"
                  />
                  <Text className="text-white text-[10px] text-center tracking-wide w-full max-w-[35px]">
                    Verify
                  </Text>
                </TouchableOpacity>
              )}
              {auth?.user?.subscriptions?.length ? null : (
                <TouchableOpacity
                  onPress={() => {
                    activateTrial(
                      1,
                      auth?.user?.name ?? "",
                      token,
                      toast,
                      RefreshUser,
                      navigation,
                      setIsLoading
                    );
                  }}
                  className="px-1 pr-2 py-1 bg-gray-800 rounded-full flex flex-row items-center justify-between"
                >
                  <GetSvg
                    name="subscriptionIcon"
                    color="white"
                    pathStrokeWidth={1}
                    classN="w-5 h-4 "
                  />
                  <Text className="text-white text-[10px] tracking-wide text-center w-full max-w-[70px]">
                    Activate Trial
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className=" w-24 h-24 mx-4 items-center justify-center rounded-full border-2 border-gray-400 p-0.5 ">
            {!isEmpty(userProfilePicture) ? (
              <Image
                resizeMode="contain"
                className="w-full h-full rounded-full"
                source={{
                  uri: userProfilePicture,
                }}
                onError={() => {
                  setUserProfilePicture(null);
                }}
              />
            ) : (
              <View className="w-full h-full border border-gray-300 rounded-full justify-center items-center">
                <GetSvg name="userIcon" classN="w-10 h-10" color="#374151" />
              </View>
            )}
          </View>
        </View>
        <View className="bg-white rounded-xl border border-gray-200  mx-3 my-1.5 mt-0 py-4">
          <View className="border-l-[3px] border-[#d10000]">
            <Text className="mx-2 text-sm font-semibold my-0.5">Settings</Text>
          </View>
          <View className="flex flex-col px-5 mt-2">
            {ProfileMenuList.map((item) => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => item?.onClick()}
                  className="w-full flex flex-row justify-between items-center my-2"
                >
                  <View className="flex flex-row justify-start items-center">
                    <View className="bg-gray-200 rounded-full p-1.5 mr-3">
                      <GetSvg
                        name={item.icon}
                        strokeWidth={2}
                        classN="w-4 h-4"
                        color="gray"
                      />
                    </View>
                    <Text className="w-full max-w-[70%]">{item.name}</Text>
                  </View>
                  <GetSvg name="rightArrowIcon" classN="w-4 h-4" color="gray" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View className="bg-white rounded-xl border border-gray-200  mx-3 my-1.5 py-4">
          <View className="border-l-[3px] border-[#d10000]">
            <Text className="mx-2 text-sm font-semibold my-0.5">
              Manage Credentials
            </Text>
          </View>
          <View className="">
            <Slider />
          </View>
        </View>
        <View className="bg-white rounded-xl border border-gray-200  mx-3 my-1.5 py-4">
          <View className="border-l-[3px] border-[#d10000]">
            <Text className="mx-2 text-sm font-semibold my-0.5">More</Text>
          </View>
          <View className="flex flex-col px-5 mt-2">
            {moreMenuList?.map((item) => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => item?.onClick()}
                  className="w-full flex flex-row justify-between items-center my-2"
                >
                  <View className="flex flex-row justify-start items-center">
                    <View className="bg-gray-200 rounded-full p-1.5 mr-3">
                      <GetSvg
                        name={item.icon}
                        strokeWidth={2}
                        classN="w-4 h-4"
                        color="gray"
                      />
                    </View>
                    <Text className="w-full max-w-[70%]">{item.name}</Text>
                  </View>
                  <GetSvg name="rightArrowIcon" classN="w-4 h-4" color="gray" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      {EditProfile ? (
        <EditProfileModal
          isOpen={EditProfile}
          setIsOpen={setEditProfile}
          user={user}
          setUserProfilePicture={setUserProfilePicture}
          userProfilePicture={userProfilePicture}
        />
      ) : null}
      {changePassword ? (
        <ChangePasswordModal
          isOpen={changePassword}
          setIsOpen={setChangePassword}
          user={user}
        />
      ) : null}

      <VerifyEmailModal
        isOpen={verifyEmail}
        setIsOpen={setVerifyEmail}
        user={auth?.user}
        token={token ?? ""}
      />

      {isLoading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
    </View>
  );
};
export default Settings;
