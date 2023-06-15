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
import EnvelopeService from "../services/EnvelopeService";
import { useDispatch, useSelector } from "react-redux";
import { setSelfSignFields } from "../redux/reducers/TempFieldSlice";
import { setEnvelopeStep } from "../redux/reducers/uiSlice";
import { setRecipients } from "../redux/reducers/RecipientSlice";
import {
  setDocuments,
  setSelecteDocument,
} from "../redux/reducers/documentsSlice";
import { setEnvelope } from "../redux/reducers/envelopeSlice";
import { ApplicationState } from "../redux/store";

interface EnvelopeListCardProps {
  envelope: ENVELOPELIST;
  navigation: any;
}

const EnvelopeListCard: React.FC<EnvelopeListCardProps> = ({
  envelope,
  navigation,
}) => {
  const dispatch = useDispatch();
  //const { currentTab } = useManageList();
  const currentTab = useSelector(
    (state: ApplicationState) => state?.manage?.currentTab
  );
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
        // console.log("TYPE:", currentTab);
        if (currentTab == "draft") {
          EnvelopeService.handleFetchEnvelope(envelope?.id, (data) => {
            if (data) {
              console.log("fetch envelope data", data);
              if (data?.self_sign) {
                dispatch(setEnvelope(data));
                dispatch(setEnvelopeStep(2));
                dispatch(setSelfSignFields(data?.document_fields));
              } else {
                dispatch(setEnvelopeStep(1));
              }
              dispatch(setDocuments(data?.envelope_documents));
              dispatch(setRecipients(data?.envelope_recipients));
              dispatch(setSelecteDocument(data?.envelope_documents?.[0]));

              navigation.navigate(routes.createEnvelope, {
                existingEnvelope: envelope,
              });
              //navigate(ProtectedRoutes?.createEnvelope);
            }
          });
        } else {
          navigation.navigate(routes.viewEnvelope, {
            envelope,
            currentTab: currentTab == "inbox" ? "SIGN" : "VIEW",
          });
        }
      }}
    >
      <View className="h-1/4 w-full  flex flex-row justify-between items-end">
        <View className="w-1/2">
          <Text className="mx-2 text-xs font-medium text-gray-500">
            {envelope?.document_fields?.completed ?? 0}/
            {envelope?.document_fields?.total ?? 0} Done
          </Text>
        </View>
        <View className="flex flex-row mx-2 gap-x-5 ">
          <Text
            className={`p-0.5 px-3 w-fit max-w-32 capitalize font-semibold rounded-2xl text-[10px]  ${
              envelope?.status === "COMPLETED"
                ? "text-green-600 bg-green-100"
                : envelope?.status === "VOID"
                ? "text-gray-600 bg-gray-100"
                : envelope?.status === "WAITING ON OTHERS"
                ? "text-[#FF947A] bg-[#FFF4DE]"
                : envelope?.status === "DRAFTED"
                ? "text-[#FF947A] bg-[#FFF4DE]"
                : envelope?.status === "SELF SIGNED"
                ? "text-[#BF83FF] bg-[#F3E8FF]"
                : envelope?.status === "REJECTED"
                ? "text-red-600 bg-red-100"
                : envelope?.status === "SIGNED"
                ? "text-green-600 bg-green-100"
                : envelope?.status === "PENDING"
                ? "text-[#FF947A] bg-[#FFF4DE]"
                : "text-red-600 bg-red-100"
            }`}
          >
            {envelope?.status === "COMPLETED"
              ? "Completed "
              : envelope?.status === "VOID"
              ? "Void "
              : envelope?.status === "WAITING ON OTHERS"
              ? "Waiting on others  "
              : envelope?.status === "DRAFTED"
              ? "Drafted by you  "
              : envelope?.status === "SELF SIGNED"
              ? "Self signed "
              : envelope?.status === "REJECTED"
              ? "Rejected by you "
              : envelope?.status === "SIGNED"
              ? "signed"
              : envelope?.status === "PENDING"
              ? "awaiting your action "
              : envelope?.status}
          </Text>
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
