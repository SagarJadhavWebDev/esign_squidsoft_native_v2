import React, { useEffect } from "react";
import { Alert, Image, PermissionsAndroid, Platform, View } from "react-native";
import imageConstants from "../constants/imageConstants";
import permissionsHandler from "../utils/permissionHandler";
import getSvgIcon from "../utils/getSvgIcon";
import routes from "../constants/routes";
import useAuth, { getAuthToken } from "../utils/auth";
import Login from "./Login";
import { isNull } from "lodash";
import getIpData from "../utils/getIpData";

interface SplashScreenProps {
  navigation: any;
}
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { auth, token } = useAuth();

  useEffect(() => {
    const arrayOfPermissions = [
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
    ];
    permissionsHandler(arrayOfPermissions[0]).then(async (res) => {
      if (res) {
        permissionsHandler(arrayOfPermissions[1]).then(async (res) => {
          if (res) {
            permissionsHandler(arrayOfPermissions[2]).then(async (res) => {
              if (res) {
                permissionsHandler(arrayOfPermissions[3]).then(async (res) => {
                  if (res) {
                  } else {
                    //TERMINATE APP;
                  }
                });
              } else {
                //TERMINATE APP;
              }
            });
          } else {
            //TERMINATE APP;
          }
        });
      } else {
        //TERMINATE APP;
      }
    });
    // if (Platform.OS === "android") {
    //   PermissionsAndroid.requestMultiple([
    //     PermissionsAndroid.PERMISSIONS.CAMERA,
    //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   ]).then((result: any) => {
    //     if (
    //       result["android.permission.ACCESS_COARSE_LOCATION"] &&
    //       result["android.permission.CAMERA"] &&
    //       result["android.permission.READ_CONTACTS"] &&
    //       result["android.permission.ACCESS_FINE_LOCATION"] &&
    //       result["android.permission.READ_EXTERNAL_STORAGE"] &&
    //       result["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted"
    //     ) {
    //       // this.setState({
    //       //   permissionsGranted: true,
    //       // });
    //     } else if (
    //       result["android.permission.ACCESS_COARSE_LOCATION"] ||
    //       result["android.permission.CAMERA"] ||
    //       result["android.permission.READ_CONTACTS"] ||
    //       result["android.permission.ACCESS_FINE_LOCATION"] ||
    //       result["android.permission.READ_EXTERNAL_STORAGE"] ||
    //       result["android.permission.WRITE_EXTERNAL_STORAGE"] ===
    //         "never_ask_again"
    //     ) {
    //       Alert.alert(
    //         "Please Go into Settings -> Applications -> eSign by SquidSoft -> Permissions and Allow permissions to continue"
    //       );
    //     }
    //   });
    // }
    getIpData((data: any) => {});
  }, []);

  // setTimeout(() => {
  //   token
  //     ? navigation.navigate(routes.dashboard)
  //     : navigation.navigate(routes.login);
  // }, 800);

  return (
    <View className="w-full h-full bg-white flex flex-col justify-start items-center">
      <View className={`w-full h-3/4 relative flex flex-col `}>
        <View className="-top-1/2 h-1/3 ">
          {getSvgIcon({ name: "splashScreenBlob", width: 500, height: 500 })}
        </View>
        <View className="w-4/5 h-1/2 mx-auto">
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={imageConstants.splashScreenGif}
          ></Image>
        </View>
        <View className="w-52 h-32 mx-auto mt-8">
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={imageConstants.eSignLogo}
          ></Image>
        </View>
        {/* <View className="w-full -left-36">
          {getSvgIcon({ name: "splashScreenBlob", width: 500, height: 500 })}
        </View> */}
      </View>
      <View></View>
    </View>
  );
};
export default SplashScreen;
