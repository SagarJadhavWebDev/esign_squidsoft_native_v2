import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import routes from "../../constants/routes";
import { TemplateType } from "../../types/TemplateType";
import { convertDate } from "../../utils/dateConvertor";
import GetSvg from "../../utils/GetSvg";

interface TemplateListCardProps {
  template: any;
  navigation: any;
}

const TemplateListCard: React.FC<TemplateListCardProps> = ({
  template,
  navigation,
}) => {
  return (
    <Pressable
      // onPress={() => {
      //   navigation.navigate(routes.TemplateDocument, {
      //     template: template,
      //   });
      // }}
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
      className="rounded-lg border m-1 my-2 border-gray-200 bg-white flex flex-row p-1 relative"
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
      <View className="w-[40%] h-full flex flex-col justify-center">
        <Text
          numberOfLines={1}
          className="text-sm w-48 capitalize font-semibold text-gray-700"
        >
          {template?.name + "sdcmsdkcmdslcsdc"}
        </Text>
        <Text
          numberOfLines={1}
          className="font-medium  w-48 text-sm text-gray-500 tracking-wider capitalize"
        >
          {template?.description + "dlsckdskcodskok"}
        </Text>
      </View>
      <View className="w-[50%]    h-full flex flex-row justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            console.log("DELETE");
          }}
        >
          <GetSvg
            name="deleteIcon"
            color="#374151"
            classN="w-5 h-5 mx-2"
            pathStrokeWidth={1.2}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            console.log("OPEN");
          }}
        >
          <GetSvg
            name="eyeOpenIcon"
            color="#374151"
            classN="w-6 h-6 "
            pathStrokeWidth={1.2}
          />
        </TouchableOpacity> */}
        <Text
          onPress={() => {
            navigation.navigate(routes.TemplateDocument, {
              templateId: template?.id,
            });
          }}
          className="text-white mx-2 p-1 px-2 font-semibold rounded-lg text-[10px] w-10 text-center bg-red-500"
        >
          Use
        </Text>
      </View>
      {/* <View className="absolute bottom-2 right-2">
        <Text className="text-xs text-gray-500">
          {template?.created_at &&
            convertDate(template?.created_at ?? "", "datetime")}
        </Text>
      </View> */}
    </Pressable>
  );
};
export default TemplateListCard;
