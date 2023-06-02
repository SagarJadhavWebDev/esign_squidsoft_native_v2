import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import WFullInputField from "../../components/atoms/WFullInputField";
import DraggableModal from "../../components/modals/DraggableModal";
import TemplateDocumentListCard from "../../components/Templates/TemplateDocumentListCard";
import TemplateListCard from "../../components/templates/TemplateListCard";
import ApiConfig from "../../constants/ApiConfig";
import apiEndpoints from "../../constants/apiEndpoints";
import routes from "../../constants/routes";
import {
  TemplateCategoryType,
  TemplateDocuments,
  TemplateType,
} from "../../types/TemplateType";
import useAuth from "../../utils/auth";
import { convertDate } from "../../utils/dateConvertor";
import downloadDocument from "../../utils/downloadDocument";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import { formatBytes } from "../../utils/getFileSize";
import getFileTypeFromMime from "../../utils/getFileTypeFromMime";
import GetSvg from "../../utils/GetSvg";
import HttpService from "../../utils/HttpService";
interface TemplateDocumentsProps {
  navigation: any;
  route: any;
}
const TemplateDocumentList: React.FC<TemplateDocumentsProps> = ({
  navigation,
  route,
}) => {
  const template: TemplateType | null = route?.params?.template;
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<TemplateDocuments | null>(null);
  const [userProfilePicture, setUserProfilePicture] = useState<any>(
    ApiConfig.FILES_URL +
      "profile-pictures/" +
      template?.user?.id +
      ".jpg?" +
      Date.now()
  );
  const [fileData, setFileData] = useState<any>();

  const getFileSize = async (url: any) => {
    let fileSize;
    let fileType;
    const r = await fetch(url)
      .then((res) => {
        if (res.status === 200) {
          fileSize = formatBytes(res.headers.get("content-length") || 0);
          fileType = getFileTypeFromMime(
            res.headers.get("content-type") || "application/pdf"
          );
        }
      })
      .catch((e) => {
       // console.log("ERROR WHile Fetching Document:", e);
      });
    setFileData({ fileSize, fileType });
  };

  useEffect(() => {
    if (selectedDocument) {
      getFileSize(
        `${ApiConfig.FILES_URL}${selectedDocument?.path}/${selectedDocument?.name}`
      );
    }
  }, [selectedDocument]);

  console.log("DoCUMENTS:", route?.params?.template);
  return (
    <View className="bg-white w-full h-full flex flex-col">
      <View className="w-full h-12 border-b border-gray-300 justify-between items-center flex flex-row   ">
        <Text className="text-base mx-5 font-medium" numberOfLines={1}>
          {template?.name}{" "}
        </Text>

        <Pressable
          onPress={() => {
            navigation.pop();
          }}
        >
          <GetSvg name="closeWithoutCircleIcon" classN="mx-3 w-5 h-5" />
        </Pressable>
      </View>
      <View className="p-3">
        <ScrollView className="w-full h-full">
          {template?.documents
            ? template?.documents?.map((document) => {
                return (
                  <TemplateDocumentListCard
                    setShowModal={setShowModal}
                    setSelectedDocument={setSelectedDocument}
                    key={document?.id}
                    document={document}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
      <DraggableModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        modalHeightInPercentage={60}
        children={
          <>
            <View className="w-full h-full  items-center">
              <GetSvg
                name="documentIcon"
                classN="w-28 h-28 my-10 mb-4"
                strokeWidth={1}
                pathStrokeWidth={0.6}
                color="gray"
              />
              <TouchableOpacity
                className="p-2 px-4 rounded-xl bg-[#d10000] flex flex-row w-[100px]"
                onPress={() => {
                  downloadDocument(
                    `${ApiConfig.FILES_URL}${selectedDocument?.path}/${selectedDocument?.name}`,
                    selectedDocument?.name ?? "TemplateDocumentFile.txt",

                    () => {}
                  );
                }}
              >
                <Text className="text-sm text-white">{"Download "} </Text>
              </TouchableOpacity>
              <View className="w-full my-6 mb-4 px-4">
                <Text className="text-xl font-semibold" numberOfLines={1}>
                  {selectedDocument?.name.split(".")[0] ?? "Document Name"}
                </Text>
                <Text className="text-sm text-gray-400">
                  {fileData?.fileType?.name}
                </Text>
              </View>
              <View className="w-full p-2 px-4 ">
                <Text className="text-sm font-semibold " numberOfLines={1}>
                  {"Description"}
                </Text>
                <Text className="text-xs text-gray-400">
                  {template?.description}
                </Text>
              </View>
              <View className="w-full p-2 px-4">
                <Text className="text-sm font-semibold">{"Info "}</Text>
                <View className="w-full flex flex-row justify-between items-center">
                  <Text className="text-sm text-gray-400">{"Size : "}</Text>
                  <Text className="text-sm font-medium">
                    {fileData?.fileSize}
                  </Text>
                </View>
                <View className="w-full flex flex-row justify-between items-center">
                  <Text className="text-sm text-gray-400">{"Date : "}</Text>
                  <Text className="text-sm font-medium">
                    {selectedDocument?.created_at
                      ? convertDate(selectedDocument?.created_at, "date") + " "
                      : "Date Not Found"}
                  </Text>
                </View>
              </View>
              <View className="w-full p-2 px-4">
                <Text className="text-sm font-semibold mb-2">
                  {"Created by "}
                </Text>
                <View className="flex flex-row items-center">
                  <View className=" w-12 h-12 my-2 ml-0 mr-4 relative items-center justify-center rounded-full border border-gray-400 ">
                    <View className="w-full h-full absolute rounded-full justify-center items-center">
                      <GetSvg
                        name="userIcon"
                        classN="w-5 h-5"
                        color="#374151"
                      />
                    </View>
                    <Image
                      resizeMode="contain"
                      className="w-full h-full rounded-full"
                      source={{
                        uri: userProfilePicture,
                      }}
                      onError={() => {
                        setUserProfilePicture(null);
                      }}
                    />
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-base">
                      {template?.user?.name ?? "eSign"}{" "}
                    </Text>
                    <Text className="text-xs">
                      {template?.user?.name ?? "by SquidSoft"}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        }
        modalType="TemplateDocumentModal"
      />
    </View>
  );
};
export default TemplateDocumentList;
