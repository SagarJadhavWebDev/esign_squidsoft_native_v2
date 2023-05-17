import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import routes from "../../constants/routes";
import { TemplateType } from "../../types/TemplateType";
import { convertDate } from "../../utils/dateConvertor";
import GetSvg from "../../utils/GetSvg";

interface TemplateListCardProps {
  template:any;
  navigation: any;
}

const TemplateListCard: React.FC<TemplateListCardProps> = ({
  template,
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("TEMPLATE:",template?.documents)
        navigation.navigate(routes.TemplateDocument, {
          template: template,
        });
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
      <View className="w-1/5 h-full  justify-center items-center">
        <View className="rounded-full shadow   bg-white p-2.5">
          <GetSvg
            name="documentIcon"
            color="#374151"
            classN="w-10 h-10"
            pathStrokeWidth={1.2}
          />
        </View>
      </View>
      <View className="w-4/5 h-full flex flex-col justify-center">
        <Text
          numberOfLines={1}
          className="text-sm w-full capitalize font-semibold text-gray-700"
        >
          {template?.name}
        </Text>
        <Text className="font-medium text-sm text-gray-500 tracking-wider capitalize">
          {template?.documents?.length}{" "}
          {template?.documents?.length == 1 ? "File" : "Files"}
        </Text>
      </View>
      <View className="absolute bottom-2 right-2">
        <Text className="text-xs text-gray-500">
          {template?.created_at &&
            convertDate(template?.created_at ?? "", "datetime")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default TemplateListCard;
