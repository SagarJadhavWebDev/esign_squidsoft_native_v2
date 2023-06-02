import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import { isEmpty, isNull, pick, upperCase, zip } from "lodash";
import { Alert, Linking } from "react-native";
import SP from "../types/LocalStorageType";
import enableGPS from "./enableGps";
import permissionsHandler from "./permissionHandler";

const resolveAddress = async (data: any) => {
  const add = data?.address;
  const country = await pick(add, ["country", "country_code"]);
  //   console.log("COUNTRY:", Object.values(country)[0]);
  const state = await pick(add, [
    "region",
    "state",
    "state_district",
    "county",
    "ISO3166-2-lvl",
  ]);
  //   console.log("STATE:", state);
  const city = await pick(add, [
    "municipality",
    "city",
    "town",
    "village",
    "city_district",
    "district",
    "borough",
    "suburb",
    "subdivision",
  ]);
  //   console.log("city:", city);
  const zipcode = add?.postcode;
  //   console.log("ZIPCODE:", zipcode);
  const address = data?.display_name;
  //   console.log("ADDRESS:", address);

  const finalAddress = {
    country_code: upperCase(Object.values(country)[1]) ?? "",
    country: Object.values(country)[0],
    state: Object.values(state)[0],
    city: Object.values(city)[0],
    zipcode: zipcode,
    address,
  };
  //   console.log("FINAL ADDRESS:", finalAddress && finalAddress);
  return finalAddress && finalAddress;
};

const getIpData = async (setIpData: any) => {
  let data = null as any;

  const ipData = await AsyncStorage.getItem(SP.IPDATA);
  //console.log("IPDATA:", ipData);

  if (isNull(ipData)) {
    //console.log("OUTSIDE");
    enableGPS(async (res: boolean) => {
      //console.log("enable gps", res);
      if (res) {
        const permission = permissionsHandler("ACCESS_FINE_LOCATION");
        //console.log("OUTSIDE2", permission);

        if (await permission) {
          Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: "auto",
            locationProvider: "auto",
          });
          Geolocation.requestAuthorization(
            () => {},
            (err) => {
              console.log(err);
            }
          );
          await Geolocation.getCurrentPosition(
            async (info) => {
              if (info) {
                const gc = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${info?.coords?.latitude}&lon=${info?.coords?.longitude}&zoom=14&format=jsonv2`
                )
                  .then(async (res) => await res.json())
                  .then(async (res) => await res);
                await AsyncStorage.setItem(
                  SP.IPDATA,
                  JSON.stringify(await resolveAddress(gc))
                );
                setIpData(await resolveAddress(gc));
              }
            },
            (e) => {
              console.log("ERR", e);
            }
          );
        } else {
          Alert.alert(
            "Location Permission required",
            "It looks like you have turned off permissions required for this feature. It can be enabled under Phone Settings > Apps > eSign by SquidSoft > Permissions",
            [
              {
                text: "Go to Settings",
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ]
          );
        }
      } else {
        Alert.alert(
          "Please enable your Location",
          "It looks like you have turned off location required for this feature. please enable your location.",
          [
            {
              text: "Go to Settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]
        );
      }
    });
  } else {
    setIpData(JSON.parse(ipData));
  }
};

export default getIpData;
