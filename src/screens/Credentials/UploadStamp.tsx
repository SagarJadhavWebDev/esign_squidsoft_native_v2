import { capitalize, isEmpty, upperCase } from "lodash";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IndeterminateProgressBar from "../../components/atoms/IndeterminateProgressBar";
import ApiConfig from "../../constants/ApiConfig";
import useAuth from "../../utils/auth";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from "react-native-document-picker";
import { useToast } from "react-native-toast-notifications";
import UploadCredentialsController from "../../controllers/UploadCredentialsController";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import GetSvg from "../../utils/GetSvg";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import ManageStamps from "./ManageStamps";
import CredentialsService from "../../services/CredentialsService";
import { useDispatch } from "react-redux";
import { setStamps } from "../../redux/reducers/CredentialsSlice";
import { setTempStamp } from "../../redux/reducers/TempFieldSlice";
import { Image as ImageCompressor } from "react-native-compressor";
interface UploadStampProps {
  modalType: string;
  setIsOpen: any;
  callback: any;
}

const UploadStamp: React.FC<UploadStampProps> = ({
  modalType,
  setIsOpen,
  callback,
}) => {
  const [tabType, setTabType] = useState("upload stamp");
  const [result, setResult] = useState<any>();
  const [imgSrc, setImgSrc] = useState<any>(null);
  const { token, UpdateUser, auth, setIsLoading, isLoading, RefreshUser } =
    useAuth();
  const toast = useToast();
  const [stampName, setStampName] = useState<any>(null);
  const stamps = auth?.user?.stamps;
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
        transitionStyle: "partialCurl",
      });

      //console.log("pick", pickerResult);
      if (pickerResult) {
        const upresult = await ImageCompressor.compress(
          pickerResult.uri ?? "",
          {
            maxWidth: 320,
            maxHeight: 180,
            quality: 0.5,
          }
        )
          .then((res) => {
            console.log("upresult", res);
            if (res) {
              setResult({
                ...pickerResult,
                fileCopyUri: res,
                uri: res,
              });
            }
          })
          .catch((err) => {
            toast.show(err, { type: "error" });
          });
      }
    } catch (e) {
      handleError(e);
    }
  };
  const handleUpload = async () => {
    setIsLoading && setIsLoading(true);
    const payload = {
      type: capitalize(modalType) as any,
      file: result,
      title: stampName,
    };
    CredentialsService.handleInitialUpload(payload, toast, (data) => {
      if (data) {
        console.log("STAMP", data);
        dispatch(setTempStamp([Array.from(data)?.reverse()]));
        dispatch(setStamps(Array.from(data)));
        setIsLoading && setIsLoading(false);
        if (callback) {
          callback(Array.from(data));
        }
        setIsOpen({
          type: null,
          isOpen: false,
        });
        // dispatch(showUploadCredentialsModal(false));
        // dispatch(setIsLoading(false));
      } else {
        setIsOpen({
          type: null,
          isOpen: false,
        });
      }
    });
  };
  const credMenuList = [
    {
      name: "Upload Stamp",
      onclick: "",
    },
    {
      name: "Manage Stamps",
      onclick: "",
    },
  ];
  const dispatch = useDispatch();
  return (
    <ScrollView className=" text-start  flex flex-col content-center">
      <IndeterminateProgressBar loading={isLoading ?? false} />
      <Text className="text-black text-lg capitalize font-semibold tracking-widest mx-5 py-5">
        Manage {modalType + "s"}
      </Text>
      <View className="w-full  flex flex-row justify-around items-center">
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
              } w-1/3 py-1 gap-x-1 rounded-2xl`}
            >
              <Text
                className={`text-center font-semibold text-xs py-0.5 ${
                  isActive ? " text-white" : "text-black"
                }`}
              >
                {menu.name}{" "}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {tabType === "upload stamp" ? (
        <>
          <View className=" h-80 w-full bg-white p-4">
            <TextInput
              onChangeText={setStampName}
              className="h-10 w-full border border-gray-300 p-2 rounded-xl my-2 px-3"
              placeholder="Enter Stamp Name"
              value={stampName}
            />
            <View
              className={`bg-white h-[80%] w-full rounded-2xl border border-gray-300 ${
                isEmpty(imgSrc) ? "justify-end" : "justify-center"
              }`}
            >
              {imgSrc ? (
                <View className="w-full h-3/4 p-3">
                  <Image
                    className="shadow-2xl w-full h-full"
                    resizeMode="contain" //contain need to change
                    source={{
                      uri: imgSrc,
                    }}
                  />
                </View>
              ) : (
                // ###############  DEFAULT STAMP  ###################
                <View className="w-full h-3/4 p-3 justify-center ">
                  {isEmpty(stamps) ? (
                    <View className="w-full   justify-center items-center">
                      <Text className="text-sm text-gray-500 w-full text-center">
                        You don't have any {modalType}
                      </Text>
                    </View>
                  ) : (
                    <Image
                      className="shadow-2xl w-full h-full"
                      resizeMode="contain" //contain need to change
                      source={{
                        uri:
                          ApiConfig.FILES_URL +
                          stamps?.filter((s: any) => s?.is_default === 1)?.[0]
                            ?.image_url,
                      }}
                    />
                  )}
                </View>
              )}

              {isEmpty(imgSrc) ? (
                <View className="w-full h-1/4 flex justify-center items-center ">
                  <TouchableOpacity
                    onPress={handleFileSelect}
                    className=" bg-slate-800 px-3 py-0.5 rounded-3xl justify-center items-center"
                  >
                    <Text className="text-xs text-white p-1 w-[120px] capitalize text-center">
                      Upload New {modalType}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <View className=" w-full bg-white p-4 py-0  justify-end items-center ">
            <TouchableOpacity
              onPress={() => {
                if (isEmpty(stampName)) {
                  toast.show("Please enter stamp name", { type: "error" });
                } else {
                  if (isEmpty(imgSrc)) {
                    toast.show("Please select file to upload", {
                      type: "error",
                    });
                  } else {
                    handleUpload();
                  }
                }
              }}
              className={`${
                isEmpty(stampName)
                  ? "bg-[#ebaaaa]"
                  : isEmpty(imgSrc)
                  ? "bg-[#ebaaaa]"
                  : "bg-[#d10000]"
              }  px-3 my-2 py-0.5  rounded-3xl justify-center items-center`}
            >
              <Text className="text-sm text-white p-1">Submit </Text>
            </TouchableOpacity>
            <Text className="font-bold text-xs text-gray-400 my-4">
              By uploading, I agree that the {modalType} and initials will be
              the electronic representation of my {modalType} and initials for
              all purposes when I (or my agent) use them on documents, including
              legally binding contracts - just the same as a pen-and-paper{" "}
              {modalType} or initial.
            </Text>
          </View>
        </>
      ) : (
        <ManageStamps
          imgSrc={imgSrc}
          setIsOpen={setIsOpen}
          modalType={modalType}
        />
      )}
    </ScrollView>
  );
};

export default UploadStamp;
