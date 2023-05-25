import { capitalize, isEmpty, upperCase } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Alert,
  NativeModules,
} from "react-native";
import { Buffer } from "buffer";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from "react-native-document-picker";
import { useToast } from "react-native-toast-notifications";
import RNFetchBlob, { RNFetchBlobFile } from "rn-fetch-blob";
import IndeterminateProgressBar from "../../components/atoms/IndeterminateProgressBar";
import ApiConfig from "../../constants/ApiConfig";
import apiEndpoints from "../../constants/apiEndpoints";
import UploadCredentialsController from "../../controllers/UploadCredentialsController";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import HttpService from "../../utils/HttpService";
import UploadStamp from "./UploadStamp";
import SignatureScreen from "react-native-signature-canvas";
import ReactNativeBlobUtil from "react-native-blob-util";
import CredentialsService from "../../services/CredentialsService";
import { useDispatch } from "react-redux";
import { setIntial, setSignature } from "../../redux/reducers/CredentialsSlice";
import { useInitial, useSignature, useStamps } from "../../utils/useReduxUtil";

interface UploadCredentialsProps {
  modalType: string;
  setIsOpen: any;
  callback?: any;
}
const UploadCredentials: React.FC<UploadCredentialsProps> = ({
  modalType,
  setIsOpen,
  callback,
}) => {
  const [imgSrc, setImgSrc] = useState<any>(null);
  const [drawnImage, setDrawnImage] = useState<any>(null);
  const [result, setResult] = React.useState<any>();
  const [tabType, setTabType] = useState("upload");
  const { token, UpdateUser, auth, setIsLoading, isLoading } = useAuth();
  const signature = useSignature(); //auth?.user?.signature;
  const initial = useInitial(); //auth?.user?.initials;
  const stamp = useStamps(); //auth?.user?.stamps;
  const toast = useToast();
  const drawSignature = useRef<any>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const dispatch = useDispatch();

  const data =
    modalType === "initial"
      ? initial?.source?.base64
      : modalType === "stamp"
      ? stamp?.find((s) => s?.source?.base64)
      : signature?.source?.base64;

  const credMenuList = [
    {
      name: "Upload",
      onclick: "",
    },
    {
      name: "Draw",
      onclick: "",
    },
    // {
    //   name: "Create",
    //   onclick: "",
    // },
  ];

  useEffect(() => {
    setImgSrc(result?.fileCopyUri);
  }, [result]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
    } else if (isInProgress(err)) {
    } else {
      toast.show(err as string, { type: "error" });
      throw err;
    }
  };

  const handleFileSelect = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
      });
     

      await setResult(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  const handleUpload = async () => {
    setIsLoading && setIsLoading(true);
    UploadCredentialsController(
      result,
      capitalize(modalType) as any,
      capitalize(modalType) as any,
      token
    )
      .then((res) => {
        const data = CryptoHandler.response(res, token ?? "");
        UpdateUser &&
          UpdateUser(res, token, () => {
            setIsOpen({
              type: null,
              isOpen: false,
            });
            toast.show(`${modalType} uploaded successfully`, {
              type: "success",
            });
            setIsLoading && setIsLoading(false);
            callback(data);
          });
      })
      .catch((err) => {
        //toast.show(err, { type: "error" });
        console.log("File Upload Err", err);
        setIsLoading && setIsLoading(false);
      });
  };
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

  const handleSaveDrawnSignature = (s: any) => {
    const fileBlob = {
      name: "eSignCredentialCache.png",
      type: "image/png",
      uri: s,
    };
    setIsLoading && setIsLoading(true);
    const type = upperCase(modalType);
    const payload = {
      type: type,
      file: fileBlob,
      title: fileBlob?.name,
    };
    console.log("UPLOAD", payload);
    CredentialsService.handleInitialUpload(payload, (data) => {
      if (type === "INITIAL") {
        dispatch(setIntial(data));
      } else {
        dispatch(setSignature(data));
      }
      setIsOpen(false);
      setIsLoading && setIsLoading(false);
    });
  };
  return (
    <>
      {modalType !== "stamp" ? (
        <ScrollView scrollEnabled={scrollEnabled}>
          <View className=" h-24 w-full  flex flex-col justify-center content-center">
            <IndeterminateProgressBar loading={isLoading ?? false} />
            <Text className="text-black text-xl capitalize font-semibold tracking-widest mx-5 py-4">
              {modalType}
            </Text>
            <View className="w-full flex flex-row justify-evenly items-center">
              {credMenuList.map((menu) => {
                const isActive = menu?.name.toLowerCase() === tabType;
                return (
                  <Pressable
                    onPress={() => {
                      setTabType(menu.name.toLowerCase());
                    }}
                    key={menu.name}
                    className={` ${
                      isActive
                        ? "bg-[#d10000] border border-[#d10000]"
                        : "bg-white border "
                    } w-1/4 py-1 gap-x-1 items-center justify-center rounded-full`}
                  >
                    <Text
                      className={` font-semibold text-xs ${
                        isActive ? " text-white" : "text-black"
                      }`}
                    >
                      {menu.name}{" "}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View className=" h-56 w-full bg-white p-4">
            {tabType === "upload" ? (
              <View className="bg-white h-full w-full rounded-2xl border border-gray-300">
                {!isEmpty(data) || !isEmpty(imgSrc) ? (
                  <View className="w-full h-3/4 p-3">
                    <Image
                      className="shadow-2xl w-full h-full"
                      resizeMode="contain" //contain need to change
                      source={{
                        uri: imgSrc ?? data,
                      }}
                    />
                  </View>
                ) : (
                  <>
                    <View className="w-full h-2/4 p-3 justify-end items-center">
                      <Text className="text-sm text-gray-500 w-full text-center">
                        You don't have any {modalType}
                      </Text>
                    </View>
                    <View className="w-full h-2/4 flex justify-start items-center ">
                      <TouchableOpacity
                        onPress={handleFileSelect}
                        className=" bg-slate-800 px-3 py-0.5 rounded-3xl justify-center items-center "
                      >
                        <Text className="text-xs text-white capitalize p-1 text-center w-[110px]">
                          Upload {modalType}{" "}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {!isEmpty(data) || !isEmpty(imgSrc) ? (
                  <View className="w-full h-1/4 flex justify-center items-center ">
                    <TouchableOpacity
                      onPress={handleFileSelect}
                      className=" bg-slate-800 px-3 py-0.5 rounded-3xl justify-center items-center"
                    >
                      <Text className="text-xs text-white capitalize p-1 text-center w-[110px]">
                        Change {modalType}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            ) : (
              <>
                <View className="w-full h-52 ">
                  <SignatureScreen
                    imageType="image/png"
                    key={"SignatureView"}
                    ref={drawSignature}
                    onBegin={() => setScrollEnabled(false)}
                    onEnd={() => setScrollEnabled(true)}
                    onOK={(s: any) => handleSaveDrawnSignature(s)}
                    onEmpty={() => {
                      toast.show("Signature is empty", { type: "error" });
                    }}
                    webStyle={`.m-signature-pad {box-shadow: none; border: 1px solid lightgray; border-radius: 1rem;} 
                .m-signature-pad--body {border: none;}
                .m-signature-pad--footer {display: none; margin: 0px;}
                body,html {
                width: 99%; height: 98%; margin:0; padding:0;`}
                  />
                  <View className="w-full flex flex-row justify-end">
                    <TouchableOpacity
                      className="p-1 px-2 mt-1 mx-5 bg-black rounded-full"
                      onPress={() => {
                        drawSignature?.current?.clearSignature();
                      }}
                    >
                      <Text className="text-[10px] text-white">Clear </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
          <View className=" w-full bg-white p-4  justify-end items-center ">
            <Text className="font-bold text-xs text-gray-400 my-4">
              By uploading, I agree that the {modalType} and initials will be
              the electronic representation of my {modalType} and initials for
              all purposes when I (or my agent) use them on documents, including
              legally binding contracts - just the same as a pen-and-paper{" "}
              {modalType} or initial.
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (tabType === "draw") {
                  drawSignature?.current?.readSignature();
                } else {
                  const fileReader = new FileReader();
                  fileReader.onload = (fileLoadedEvent: any) => {
                    const base64Image = fileLoadedEvent.target.result;
                  };
                  fileReader.readAsDataURL(result?.uri);
                  setIsLoading && setIsLoading(true);
                  const type = upperCase(modalType);
                  const fileBlob = {
                    name: result?.name,
                    filename: result?.name,
                    type: result?.type,
                    uri: result?.uri, //RNFetchBlob.wrap(result?.uri),
                  };
                  const payload = {
                    type: type,
                    file: fileBlob,
                    title: fileBlob?.name,
                  };
                  console.log("UPLOAD", payload);
                  // CredentialsService.handleInitialUpload(payload, (data) => {
                  //   if (data) {
                  //     if (type === "INITIAL") {
                  //       dispatch(setIntial(data));
                  //     } else {
                  //       dispatch(setSignature(data));
                  //     }
                  //   }
                  //   setIsOpen(false);
                  //   setIsLoading && setIsLoading(false);
                  // });
                }
              }}
              className=" bg-[#d10000] px-3 my-2 py-0.5 rounded-full justify-center items-center"
            >
              <Text className="text-sm text-white p-1 px-2">Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <UploadStamp
          modalType={modalType}
          setIsOpen={setIsOpen}
          callback={callback}
        />
      )}
    </>
  );
};
export default UploadCredentials;
