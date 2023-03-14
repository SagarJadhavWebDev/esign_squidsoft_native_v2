import React from "react";
import { PermissionsAndroid, PermissionsAndroidStatic } from "react-native";
import AppConfig from "../constants/appConfig";

const permissionsHandler = async (perimission: string) => {
  let permissonsGiven = false;
  console.log("PERR:", perimission);

  switch (perimission) {
    case "READ_EXTERNAL_STORAGE":
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: `${AppConfig.APP_NAME} requires storage Permission`,
            message: "",
            // buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`${perimission} Granted`);
          permissonsGiven = true;
        } else {
          console.log(`${perimission} Denied`);
          permissonsGiven = false;
        }
      } catch (err) {
        console.warn(err);
      }
      break;
    case "WRITE_EXTERNAL_STORAGE":
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: `${AppConfig.APP_NAME} requires storage Permission`,
            message: "",
            // buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`${perimission} Granted`);
          permissonsGiven = true;
        } else {
          console.log(`${perimission} Denied`);
          permissonsGiven = false;
        }
      } catch (err) {
        console.warn(err);
      }
      break;
    case "ACCESS_COARSE_LOCATION":
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: `${AppConfig.APP_NAME} requires location permission`,
            message: "",
            // buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`${perimission} Granted`);
          permissonsGiven = true;
        } else {
          console.log(`${perimission} Denied`);
          permissonsGiven = false;
        }
      } catch (err) {
        console.warn(err);
      }
      break;
    case "ACCESS_FINE_LOCATION":
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: `${AppConfig.APP_NAME} requires location permission`,
            message: "",
            // buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`${perimission} Granted`);
          permissonsGiven = true;
        } else {
          console.log(`${perimission} Denied`);
          permissonsGiven = false;
        }
      } catch (err) {
        console.warn(err);
      }
      break;

    default:
      permissonsGiven = false;
      console.log("Permission Invalid");
      break;
  }
  return permissonsGiven;
};
export default permissionsHandler;
