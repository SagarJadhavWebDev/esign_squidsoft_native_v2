import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import ApiConfig from "../../constants/ApiConfig";
import { TemplateDocuments, TemplateType } from "../../types/TemplateType";
import { convertDate } from "../../utils/dateConvertor";
import downloadDocument from "../../utils/downloadDocument";
import GetSvg from "../../utils/GetSvg";

interface TemplateDocumentListCardProps {
  setShowModal: any;
  document: TemplateDocuments;
  setSelectedDocument: any;
}

const TemplateDocumentListCard: React.FC<TemplateDocumentListCardProps> = ({
  setShowModal,
  document,
  setSelectedDocument,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedDocument(document);
        setShowModal(true);
      }}
      style={{
        height: 80, //Dimensions.get("window").height * 0.1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.1,
        elevation: 1,
      }}
      className="rounded-lg border m-1 border-gray-200 bg-white flex flex-row p-1 relative"
    >
      <View className="w-[20%] h-full  justify-center items-center">
        <View className="rounded-full shadow   bg-white p-2.5">
          <GetSvg
            name="documentIcon"
            color="#374151"
            classN="w-10 h-10"
            pathStrokeWidth={1.2}
          />
        </View>
      </View>
      <View className="w-[55%] h-full flex flex-col justify-center items-start">
        <Text
          numberOfLines={1}
          className="text-base capitalize font-medium text-gray-700"
        >
          {document?.name}
        </Text>
        <Text className="text-[10px] text-gray-500">
          {document?.created_at &&
            convertDate(document?.created_at ?? "", "datetime")}
        </Text>
      </View>
      <View className="w-[25%] h-full flex flex-row justify-center items-center">
        <TouchableOpacity
          className="p-2 px-3 rounded-xl bg-gray-900 flex flex-row"
          onPress={() => {
            downloadDocument(
              `${ApiConfig.FILES_URL}${document?.path}/${document?.name}`,
              document?.name ?? "TemplateDocumentFile.txt",
              () => {}
            );
          }}
        >
          <Text className="text-xs text-white">Download </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default TemplateDocumentListCard;
