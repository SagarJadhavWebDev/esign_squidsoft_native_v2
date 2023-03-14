import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import GetSvg from "../../utils/GetSvg";
import Slider from "../../components/carosules/slider";
import useAuth from "../../utils/auth";
import routes from "../../constants/routes";
import ApiConfig from "../../constants/ApiConfig";
import { useState } from "react";
import { isEmpty } from "lodash";
import EditProfileModal from "../../components/modals/EditProfileModal";
import ChangePasswordModal from "../../components/modals/ChangePassword";
interface ProfileProps {
  navigation: any;
  setIsLoading: any;
  userProfilePicture: any;
  setUserProfilePicture: any;
}

const Profile: React.FC<ProfileProps> = ({
  navigation,
  setIsLoading,
  userProfilePicture,
  setUserProfilePicture,
}) => {
  const { auth, SignOut } = useAuth();
  const user = auth?.user;
  const [EditProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
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
      onClick: "",
    },
    {
      name: "Subscriptions",
      icon: "subscriptionIcon",
      onClick: () => navigation.navigate(routes.Subscriptions),
    },
  ];

  const menuList = [
    {
      name: "Inbox",
      onClick: () => {},
    },
    {
      name: "Sent",
      onClick: () => {},
    },
    {
      name: "Drafts",
      onClick: () => {},
    },
    {
      name: "Deleted",
      onClick: () => {},
    },
    {
      name: "Expiring Soon",
      onClick: () => {},
    },
    {
      name: "Action Required",
      onClick: () => {},
    },
    {
      name: "Completed",
      onClick: () => {},
    },
  ];
  return (
    <>
      {/* <View className="h-full w-full bg-gray-150 px-3">
        <ScrollView
          style={{
            width: Dimensions.get("screen").width,
          }}
          className="bg-gray-150"
        >
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height * 0.12,
            }}
            className="h-1/5 w-full  flex flex-row"
          >
            <View
              className=" h-full justify-center items-center
        "
              style={{
                width: Dimensions.get("screen").width * 0.25,
              }}
            >
              <View className="w-18 h-18 justify-center items-center">
                {!isEmpty(userProfilePicture) ? (
                  <Image
                    className="rounded-full shadow-2xl"
                    source={{
                      width: Dimensions.get("window").width * 0.2,
                      height: Dimensions.get("window").width * 0.2,
                      uri: userProfilePicture,
                    }}
                    onError={() => {
                      setUserProfilePicture(null);
                    }}
                  />
                ) : (
                  <View className="w-16 h-16 border border-gray-300 rounded-full justify-center items-center">
                    <GetSvg
                      name="userIcon"
                      classN="w-full h-full  "
                      color="#374151"
                    />
                  </View>
                )}
              </View>
            </View>
            <View
              className=" h-full justify-center"
              style={{
                width: Dimensions.get("screen").width * 0.55,
              }}
            >
              <View className="h-1/2 justify-end">
                <Text
                  className="mx-2 text-sm  capitalize font-medium text-gray-500 items-baseline"
                  numberOfLines={1}
                >
                  Welcome
                </Text>
              </View>
              <View className="h-1/2 justify-start">
                <Text
                  className="mx-2 text-lg  max-h-1/2 capitalize font-medium text-gray-800 tracking-tight"
                  numberOfLines={1}
                >
                  {user?.name}
                </Text>
              </View>
            </View>
            <View
              className=" h-full items-center justify-center"
              style={{
                width: Dimensions.get("screen").width * 0.2,
              }}
            >
              <GetSvg
                name="logoutIcon"
                color="#e24343"
                classN="w-7 h-7"
                callBack={() => {
                  setIsLoading && setIsLoading(true);
                  SignOut &&
                    SignOut(() => {
                      setIsLoading && setIsLoading(false);
                      navigation.navigate(routes.login);
                    });
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height * 0.25,
            }}
            className="h-1/5 px-3 mb-3 "
          >
            {ProfileMenuList?.map((p) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    //@ts-ignore
                    p?.onClick();
                  }}
                  key={p.name}
                  className="  h-1/4 flex flex-row items-center"
                >
                  <View className="w-[10%]  justify-center items-center p-0 m-0">
                    <GetSvg name={p.icon} strokeWidth={2} classN="w-6 h-7" />
                  </View>
                  <View className="w-[80%] p-0 m-0">
                    <Text
                      className="mx-2 text-base capitalize font-medium text-gray-800 tracking-tight"
                      numberOfLines={1}
                    >
                      {p.name}
                    </Text>
                  </View>
                  <View className="w-[10%] justify-center  items-center">
                    <GetSvg name="rightArrowIcon" classN="w-5 h-6" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View className="justify-start border-t pt-5 px-3 flex flex-row border-gray-300 items-center">
           
            <View className="w-[10%]  justify-center items-center p-0 m-0">
              <GetSvg name={"settingIcon"} strokeWidth={2} classN="w-6 h-7" />
            </View>
            <View className="w-[80%] p-0 m-0">
              <Text
                className="mx-2 text-base capitalize font-medium text-gray-800 tracking-tight"
                numberOfLines={1}
              >
                Manage Your Credentials
              </Text>
            </View>

          </View>

          <View
            style={{
              width: Dimensions.get("screen").width,
              height: 250,
            }}
            className="w-full"
          >
            <Slider />
          </View>
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: 80, 
            }}
            className="w-full"
          ></View>
        </ScrollView>
        <View
          style={{
            width: Dimensions.get("screen").width,
          }}
          className="absolute bottom-0"
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            style={{
              height: Dimensions.get("screen").height * 0.04,
              padding: 3,
            }}
            className="bg-white overflow-x-scroll flex flex-row gap-x-2"
          >
            {menuList.map((menu) => {
              return (
                <TouchableOpacity
                  key={menu.name}
                  className={`bg-white py-1.5 px-2.5 w-fit flex flex-row items-center justify-center`}
                >
                  <Text
                    className={` text-gray-400  text-sm leading-4 pr-0.5`}
                  >
                    {menu.name}
                  </Text>
                  <GetSvg
                    name="rightArrowIcon"
                    classN="h-3 w-3"
                    strokeWidth={2}
                    color="grey"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View> */}
      <View className="h-full w-full px-3">
      
      </View>
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
    </>
  );
};
export default Profile;
