import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import GetSvg from "../../utils/GetSvg";
import DocumentPicker, { types } from "react-native-document-picker";
import FormatBytes from "../../utils/FormatBytes";
import useAuth from "../../utils/auth";
import routes from "../../constants/routes";
import { useToast } from "react-native-toast-notifications";
import { useSubscription } from "../../utils/useReduxUtil";
import SelectEnvelopeTypeModal from "../../components/modals/SelectEnvelopeTypeModal";
import { useDispatch } from "react-redux";
import { showEnvelopeTypeModal } from "../../redux/reducers/uiSlice";

interface UploadDocumentsProps {
  navigation: any;
}

const UploadDocuments: React.FC<UploadDocumentsProps> = ({ navigation }) => {
  const [fileList, setFileList] = useState<any>(null);
  const [fileSize, setFileSize] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const { token } = useAuth();
  const toast = useToast();
  const allowedFileCount = 4;
  const allowedFileSize = 5;
  const dispatch = useDispatch();
  const handleSelectedFile = (result: any) => {
    if (result) {
      const existingFileCount = fileList?.length ?? 0;
      const upComingFileCount = result?.length ?? 0;
      let existingFileSize = fileSize;
      if (existingFileCount >= allowedFileCount) {
        toast.show(`Max ${allowedFileCount}  Documents allowed per Envelope`, {
          type: "error",
        });
        console.log(
          "Max " + allowedFileCount + " Documents allowed per Envelope"
        );
        return;
      }
      if (existingFileCount + upComingFileCount > allowedFileCount) {
        toast.show(`Max ${allowedFileCount} Documents allowed per Envelope`, {
          type: "error",
        });
        console.log(
          "Max " + allowedFileCount + " Documents allowed per Envelope"
        );
        return;
      }
      Array.from(result).forEach((f: any) => {
        existingFileSize = existingFileSize + f?.size;
        if (existingFileSize > allowedFileSize * 1000000) {
          return;
        }
      });
      if (existingFileSize > allowedFileSize * 1000000) {
        toast.show(`Envelope Size Cannot be more than ${allowedFileSize}  MB`, {
          type: "error",
        });
        console.log(
          "Envelope Size Cannot be more than " + allowedFileSize + " MB"
        );
        return;
      }
      setFileSize(existingFileSize);
      const list = result?.map((file: any, key: any) => {
        return {
          name: file?.name,
          filename: file?.name,
          type: file?.type,
          uri: file?.uri,
          size: file?.size,
          key: key,
        };
      });
      const combineArray = [...(fileList ?? []), ...list];
      setFileList(combineArray);
    }
  };

  const handleRemoveFile = (file: any) => {
    console.log("FILE SIZE:", file);
    const filter = fileList.filter((f: any) => f.uri !== file?.uri);
    setFileSize(fileSize - file?.Size);
    setFileList(filter);
  };

  const handleError = (e: any) => {
    toast.show("ERR", e);
    console.log("ERRO:", e);
  };

  useEffect(() => {
    if (fileList?.length > 0) {
      setProgress(0);
    }
  }, [fileList]);
  const allSubscriptions = useSubscription();
  const isDocumentConversion = allSubscriptions?.some(
    (s) => s?.subscription_benifit?.document_conversion
  );
  return (
    <>
      <SafeAreaView className="w-full h-full bg-white p-2 flex flex-col justify-between">
        <View className="h-[90%] bg-white w-full justify-start items-center max-w-sm mx-auto">
          <ScrollView
            className="w-full"
            contentContainerStyle={{
              width: "100%",
            }}
          >
            {fileList &&
              fileList?.map((file: any, index: any) => {
                return (
                  <View
                    key={index}
                    className=" border rounded-lg border-gray-500 w-full h-14 my-1 flex flex-row"
                  >
                    <View className="h-full w-5/6 justify-center px-5">
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        className="text-sm font-semibold capitalize"
                      >
                        {file?.name}
                      </Text>
                      <Text className="text-xs">{FormatBytes(file?.size)}</Text>
                    </View>
                    <View className="h-full w-1/6 justify-center items-center">
                      <GetSvg
                        callBack={() => {
                          handleRemoveFile(file);
                        }}
                        name="closeWithoutCircleIcon"
                        pathStrokeWidth={1}
                        classN="w-6 h-6"
                      />
                    </View>
                  </View>
                );
              })}
            {fileList?.length >= allowedFileCount ? null : (
              <View
                style={{
                  borderRadius: 12,
                  width: "100%",
                  borderStyle: "dashed",
                  borderWidth: 1.5,
                  borderColor: "rgba(161,155,183,0.8)",
                  height: 150,
                }}
                className="justify-center items-center my-5"
              >
                <View className="w-full h-2/4 p-3 justify-end items-center">
                  <Text className="text-sm text-gray-500 w-full text-center">
                    Select document to Upload
                  </Text>
                </View>
                <View className="w-full h-2/4 flex justify-start items-center ">
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const pickerResult = await DocumentPicker.pickMultiple({
                          type: isDocumentConversion
                            ? [
                                types.pdf,
                                types.xls,
                                types.xlsx,
                                types.ppt,
                                types.pptx,
                                types.doc,
                                types.docx,
                                types.plainText,
                                types.images,
                                types.csv,
                              ]
                            : types.pdf,
                          presentationStyle: "fullScreen",
                          copyTo: "cachesDirectory",
                        });
                        handleSelectedFile(pickerResult);
                        // await setSelectedFileArray(pickerResult);
                      } catch (e) {
                        handleError(e);
                      }
                    }}
                    className=" bg-slate-800 px-4 py-1 rounded-3xl justify-center items-center"
                  >
                    <Text className="text-xs text-white ">
                      {"Select Documents  "}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="absolute flex w-full m-auto justify-center items-center  bottom-2 text-xs text-white">
                  <Text
                    className="text-[10px] w-[80%] text-center text-gray-400"
                    //numberOfLines={1}
                  >
                    {" "}
                    {isDocumentConversion
                      ? "[Supported File Types : csv,docx,doc,xls,xlsx,txt,jpeg,jpg,png,ppt,pptx]"
                      : "[Supported File Types : pdf]"}
                  </Text>
                </View>
              </View>
            )}
            {progress > 0 && (
              <View
                key={"ProgressBar"}
                className="w-full rounded-full  bg-gray-200"
              >
                <View
                  key={"ProgressBar"}
                  className={`w-[${
                    progress ?? 0
                  }%] rounded-full bg-[#d10000] items-center justify-center`}
                >
                  <Text className="text-white font-medium text-xs">
                    {progress < 100 && progress >= 0
                      ? progress + " % "
                      : "Processing... "}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        <View className=" w-full h-[10%] flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.push(routes.dashboard);
            }}
            className=" bg-slate-800  rounded-full p-1.5 px-4"
          >
            <Text className="text-white text-xs font-extrabold ">Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handleNext()
              dispatch(showEnvelopeTypeModal(true));
            }}
            className=" bg-[#d10000] rounded-full  p-1.5 px-4"
          >
            <Text className="text-white text-xs font-extrabold">Next </Text>
            {/* <GetSvg name="rightArrowIcon" classN="w-3 h-3" color="white" /> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SelectEnvelopeTypeModal documents={fileList} navigate={navigation} />
    </>
  );
};
export default UploadDocuments;
