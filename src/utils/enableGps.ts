import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import getIpData from "./getIpData";

const enableGPS = async (callback: any) => {
  try {
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((res) => {
        console.log("RES:", res);
        if (res === "enabled" || res === "already-enabled") {
          callback(true);
        }
      })
      .catch((r) => {
        console.log("REASON:", r);
        callback(false);
      });
  } catch (error) {
    console.log(error);
    callback(false);
  }
};

export default enableGPS;
