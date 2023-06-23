import { chain, isEmpty, isNull, omit, pick, result, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import ConfirmModal from "../../components/modals/ConfirmModal";
import apiEndpoints from "../../constants/apiEndpoints";
import routes from "../../constants/routes";
import { EnvelopeType } from "../../types/EnvelopeType";
import { FieldPayload } from "../../types/FieldTypes";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import GetSvg from "../../utils/GetSvg";
import HttpService from "../../utils/HttpService";
import DocumentDiv from "../CreateEnvelope/PrepareDocumentView/DocumentDiv";
import ViewDocument from "./ViewDocument";
import { ViewEnvelopeTypes } from "../../types/ViewEnvelopeTypes";
import EnvelopeService from "../../services/EnvelopeService";
import ApiInstance from "../../services/ApiInstance";
import handleResponse from "../../services/handleResponse";

interface ViewEnvelopeProps {
  route: any;
  navigation: any;
}

const ViewEnvelope: React.FC<ViewEnvelopeProps> = ({ route, navigation }) => {
  const { envelope: data, currentTab: type } = route?.params;
  const envelope: any = data;
  const [downloading, setDownloading] = useState(false);
  const [isCoonfirmModalOpen, setIsCoonfirmModalOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>();
  const { token } = useAuth();
  const toast = useToast();
  const [envelopeData, setEnvelope] = useState<ViewEnvelopeTypes>();
  const documents = envelopeData?.envelope_documents;

  const isAlreadyFill = envelopeData?.document_fields?.every((f: any) => {
    return !isNull(f?.filled_at) ? true : false;
  });
  const [isAllFilled, setIsAllFilled] = useState(false);
  useEffect(() => {
    if (envelopeData) {
      const check = envelopeData?.document_fields?.every((e: any) => {
        return e?.value !== null;
      });
      setIsAllFilled(check);
    }
  }, [envelopeData]);

  const handleFetchViewEnvelope = () => {
    const viewToken = envelope?.access_token?.split("view").pop();
    EnvelopeService.handleFetchViewEnvelope(viewToken, (data) => {
      if (data) {
        setEnvelope(data);
        setSelectedDocument(data?.envelope_documents?.[0]);
        // dispatch(setViewEnvelope(data));
        // setSelectedDocuments(data?.envelope_documents?.[0]);
        // dispatch(setAllTempFields(data?.document_fields));
        // setTempEnvelope(data?.document_fields);
      } else {
        // dispatch(setLoginModal(true));
      }
    });
  };
  const handleSubmit = () => {
    setIsCoonfirmModalOpen(false);
    setIsLoading(true);
    if (envelopeData?.document_fields) {
      const payload = {
        fields: envelopeData?.document_fields,
      };
      //console.log("SIGN TOKEN",envelopeData?.sign_token?.replace("/api", ""))
      // console.log("PAYLOAD", envelopeData?.sign_token?.replace("/api", ""));

      ApiInstance.post(envelopeData?.sign_token?.replace("/api", ""), payload)
        .then(async (res) => {
          const data = await handleResponse(res as any, toast);
          // console.log("ENVELOPE SUBMIT", data);
          if (data) {
            // dispatch(setIsFullScreen(false));
            // dispatch(setModalType(""));
            // dispatch(setLoadingModal(false));
            // dispatch(setEnvelopeStep(0));
            // navigate(ProtectedRoutes.DASHBOARD);
            navigation.navigate(routes.dashboard, {
              update: Date.now(),
            });
          } else {
            //toast.show(res?.message, { type: "error" });
            setIsLoading(false);
            // dispatch(setModalType(""));
            // dispatch(setLoadingModal(false));
            // dispatch(setEnvelopeStep(0));
            // dispatch(setIsFullScreen(false));
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          // console.log("SUBMIT ENVELOPE ERR", err?.message);
        });
    }
  };
  useEffect(() => {
    handleFetchViewEnvelope();
  }, [envelope]);

  return (
    <SafeAreaView className="w-full h-full flex flex-col justify-start">
      <View className="w-full h-12 flex flex-row justify-between items-center px-3 bg-white">
        <Text className="text-lg font-normal w-1/2">
          Envelope : {envelopeData?.id + " "}
        </Text>
        <GetSvg
          name="closeWithoutCircleIcon"
          classN="w-5 h-5"
          callBack={() => {
            navigation.pop();
          }}
        />
      </View>
      <View className="w-full">
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            width: "100%",
            height: 24,
            backgroundColor: "white",
          }}
          className="border-b border-gray-300 gap-x-2"
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {documents?.map((doc) => {
            const isSelected = doc?.id === selectedDocument?.id;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDocument(doc);
                }}
                key={doc?.id}
                className={`${isSelected ? "bg-[#d10000]  " : "bg-gray-200 "}
                border-b-0 px-3 rounded-t-xl justify-center items-center max-w-[100px]`}
              >
                <Text
                  className={` ${
                    isSelected ? " text-white" : "text-black"
                  } text-xs`}
                  numberOfLines={1}
                >
                  {doc?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View className=" relative w-full h-full pb-6">
        <ViewDocument
          document={selectedDocument}
          envelope={envelopeData}
          type={type}
          setEnvelope={setEnvelope}
          setDownloading={setDownloading}
        />
        {type === "SIGN" ? (
          <View className=" w-full h-14 absolute flex flex-row bottom-20 justify-between items-center px-5">
            <Text
              onPress={() => {
                navigation.navigate(routes.dashboard);
              }}
              className=" bg-slate-800  p-2 w-20 text-center  text-white rounded-xl font-bold "
            >
              Cancel
            </Text>
            <Text
              onPress={() => {
                if (isAllFilled) {
                  setIsCoonfirmModalOpen(true);
                }
              }}
              className={`${
                !isAllFilled
                  ? "bg-[#f8b6b6]"
                  : isAlreadyFill
                  ? "bg-[#f8b6b6]"
                  : "bg-[#d10000]"
              }   p-2 w-20 text-center  text-white rounded-xl font-bold `}
            >
              Finish
            </Text>
          </View>
        ) : null}
      </View>
      {isCoonfirmModalOpen ? (
        <ConfirmModal
          isOpen={isCoonfirmModalOpen}
          modalType="confirmModal"
          setIsOpen={setIsCoonfirmModalOpen}
          key="confirmModal"
          onSubmit={handleSubmit}
          title="Click on Next to Continue"
          description="By Clicking on Accept you agree the terms and conditions"
        />
      ) : null}
      {downloading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
      {IsLoading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default ViewEnvelope;
