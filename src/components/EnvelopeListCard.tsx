import {
  View,
  Dimensions,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import routes from "../constants/routes";
import { EnvelopeType } from "../types/EnvelopeType";
import useAuth from "../utils/auth";
import { convertDate } from "../utils/dateConvertor";
import GetSvg from "../utils/GetSvg";

interface EnvelopeListCardProps {
  type: any;
  envelope: EnvelopeType;
  token: string | null;
  operation: any;
  navigation: any;
}

const EnvelopeListCard: React.FC<EnvelopeListCardProps> = ({
  type,
  envelope,
  token,
  operation,
  navigation,
}) => {
  const { auth } = useAuth();
  const getBadge = (type: string) => {
    switch (type) {
      case "1":
        return (
          <View className="bg-yellow-50  rounded-full px-2 py-0.5 ">
            <Text className="text-semibold text-yellow-500  text-xs">
              Sign{" "}
            </Text>
          </View>
        );
      case "2":
        return (
          <View className="bg-blue-50  rounded-full px-2 py-0.5 ">
            <Text className="text-semibold text-blue-500  text-xs">
              Carbon{" "}
            </Text>
          </View>
        );
      case "3":
        return (
          <View className="bg-green-50  rounded-full px-2 py-0.5 ">
            <Text className="text-semibold text-green-500  text-xs">
              Received{" "}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };
  console.log("envelope", envelope?.fields?.length);
  return (
    <TouchableOpacity
      className=" rounded-lg border my-2 border-gray-200 p-1 bg-white"
      style={{
        height: 90, //Dimensions.get("window").height * 0.1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.1,
        elevation: 1,
      }}
      onPress={() => {
        console.log("TYPE:", type);
        if (type === "Drafts") {
          navigation.navigate(routes.createEnvelope, {
            step: 1,
            existingEnvelope: envelope,
          });
        } else {
          navigation.navigate(routes.viewEnvelope, {
            envelope,
            type: operation === "1" ? "SIGN" : "VIEW",
          });
        }
      }}
    >
      <View className="h-1/4 w-full  flex flex-row justify-between items-end">
        <View className="">
          {type === "Inbox"
            ? envelope?.authFields && (
                <Text className="mx-2 text-xs font-medium text-gray-500">
                  {
                    Array.from(
                      envelope?.authFields?.length === 0
                        ? envelope?.authFields
                        : envelope?.fields
                    ).filter((field: any) => field?.filled_at != null)?.length
                  }
                  /
                  {
                    Array.from(
                      envelope?.authFields?.length === 0
                        ? envelope?.authFields
                        : envelope?.fields
                    )?.length
                  }{" "}
                  Done
                </Text>
              )
            : envelope?.fields && (
                <Text className="mx-2 text-xs font-medium text-gray-500">
                  {
                    Array.from(
                      envelope?.fields?.length === 0
                        ? envelope?.fields
                        : envelope?.fields
                    ).filter((field: any) => field?.filled_at != null)?.length
                  }
                  /
                  {
                    Array.from(
                      envelope?.fields?.length === 0
                        ? envelope?.fields
                        : envelope?.fields
                    )?.length
                  }{" "}
                  Done
                </Text>
              )}
        </View>
        <View className="flex flex-row">
          <View className="flex">
            <Text
              className="mx-2 font-semibold text-xs text-gray-700 tracking-wider capitalize"
              numberOfLines={1}
            >
              {envelope?.user?.name}
            </Text>
          </View>
          {getBadge(operation)}
        </View>
      </View>
      <View className="h-2/4 w-full  flex flex-row justify-between items-center">
        <View className="items-start w-2/3">
          <Text
            className="mx-2 text-base max-h-1/2 font-semibold text-gray-700 items-baseline"
            numberOfLines={1}
          >
            {envelope?.subject}
          </Text>
        </View>
        <View className="items-center">
          <Text className="mx-2 text-2xl font-black  tracking-wider">
            {envelope?.documents?.map((document) => {
              return (
                <GetSvg
                  key={document?.id}
                  name="documentIcon"
                  classN="w-6 h-6"
                  color={"#d10000"}
                />
              );
            })}
          </Text>
        </View>
      </View>
      <View className="h-1/4 w-full  flex flex-row justify-between items-start">
        <View className="">
          <Text className="mx-2 text-xs text-gray-500">
            {convertDate(envelope?.sent_at, "datetime")}
          </Text>
        </View>
        <View className="">
          <Text className="mx-2 text-xs text-gray-500">
            {convertDate(envelope?.expire_at, "datetime")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default EnvelopeListCard;
