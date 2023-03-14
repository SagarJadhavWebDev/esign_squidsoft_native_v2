import AsyncStorage from "@react-native-async-storage/async-storage";
import SP from "../types/LocalStorageType";

const set = async (key: SP, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log("ERROR WHILE STORING DATA TO LOCALSTORAGE: ", e);
  }
};

const get = async (key: SP) => {
  try {
    const value = await AsyncStorage.getItem(key).then((res) => {
      return res;
    });
    return value;
  } catch (e) {
    // error reading value
    console.log("ERROR WHILE FETCHING DATA FROM LOCALSTORAGE: ", e);
  }
};

const Storage = {
  set,
  get,
};
export default Storage;
