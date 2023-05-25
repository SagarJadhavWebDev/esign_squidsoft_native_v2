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
import { Envelope } from "../types/ViewEnvelopeTypes";
import React from "react";
import getLocalDate from "../utils/getLocalDate";
import { useManageList } from "../utils/useReduxUtil";
import { ENVELOPELIST } from "../types/ManageListTypes";

interface EnvelopeListCardProps {
  envelope: ENVELOPELIST;
  navigation: any;
}

const EnvelopeListCard: React.FC<EnvelopeListCardProps> = ({
  envelope,
  navigation,
}) => {
  const { auth } = useAuth();
  const { list, currentTab } = useManageList();
  const getBadge = (type: string) => {
    switch (type) {
      case "SIGNER":
        return (
          <View className="bg-yellow-50  rounded-full px-2 py-0.5 ">
            <Text className="text-semibold text-yellow-500  text-xs">
              Sign{" "}
            </Text>
          </View>
        );
      case "2":
        return null;
      // return (
      //   <View className="bg-blue-50  rounded-full px-2 py-0.5 ">
      //     <Text className="text-semibold text-blue-500  text-xs">
      //       Carbon{" "}
      //     </Text>
      //   </View>
      // );
      case "RECEIVER":
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
        console.log("TYPE:", typeof currentTab);
        if (currentTab == "draft") {
          navigation.navigate(routes.createEnvelope, {
            step: 1,
            existingEnvelope: envelope,
          });
        } else {
          navigation.navigate(routes.viewEnvelope, {
            envelope,
            currentTab: envelope,
          });
        }
      }}
    >
      <View className="h-1/4 w-full  flex flex-row justify-between items-end">
        <View className="">
          <Text className="mx-2 text-xs font-medium text-gray-500">
            {envelope?.document_fields?.completed ?? 0}/
            {envelope?.document_fields?.total ?? 0} Done
          </Text>
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
          {envelope?.recipient_type ? getBadge(envelope?.recipient_type) : null}
        </View>
      </View>
      <View className="h-2/4 w-full  flex flex-row justify-between items-center">
        <View className="items-start w-full">
          <Text
            className="mx-2 w-full text-xs max-h-1/2 font-semibold text-gray-700 items-baseline"
            numberOfLines={1}
          >
            {envelope?.subject ?? "Drafted by you"}
          </Text>
        </View>
        <View className="items-center">
          <Text className="mx-2 text-2xl font-black  tracking-wider">
            {envelope?.envelope_documents?.map((document) => {
              return (
                <GetSvg
                  key={document}
                  name="documentIcon"
                  classN="w-6 h-6"
                  color={"#d10000"}
                />
              );
            })}
          </Text>
        </View>
      </View>
      {!["draft", "deleted"].includes(currentTab) ? (
        <View className="h-1/4 w-full  flex flex-row justify-between items-start">
          <View className="w-full">
            {envelope?.sent_at ? (
              <Text className="mx-2 text-xs text-gray-500">
                {getLocalDate(envelope?.sent_at ?? "").format(
                  "DD/MM/YYYY hh:mm A"
                )}
              </Text>
            ) : null}
          </View>
          {envelope?.expire_at ? (
            <View className="">
              <Text className="mx-2 text-xs text-gray-500">
                {convertDate(envelope?.expire_at ?? "", "datetime")}
              </Text>
            </View>
          ) : null}
        </View>
      ) : (
        <View className="h-1/4 w-full  flex flex-row justify-between items-start">
          <View className="">
            {envelope?.created_at ? (
              <Text className="mx-2 text-xs text-gray-500">
                {convertDate(envelope?.created_at ?? "", "datetime")}
              </Text>
            ) : null}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default EnvelopeListCard;
