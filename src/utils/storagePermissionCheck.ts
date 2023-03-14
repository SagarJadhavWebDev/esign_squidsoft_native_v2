import { PermissionsAndroid, Alert } from "react-native";

const storagePemissionCheck = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //actualDownload();
      return true;
    } else {
      Alert.alert(
        "Permission Denied!",
        "You need to give storage permission to download the file"
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

export default storagePemissionCheck;
