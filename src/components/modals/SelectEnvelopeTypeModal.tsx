import React, { useState } from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import {
  setEnvelopeStep,
  setIsLoading,
  showEnvelopeTypeModal,
} from "../../redux/reducers/uiSlice";
import EnvelopeService from "../../services/EnvelopeService";
import {
  setDocuments,
  setSelecteDocument,
} from "../../redux/reducers/documentsSlice";
import { setSelfSignFields } from "../../redux/reducers/TempFieldSlice";
import { setFixedFields } from "../../redux/reducers/PdfSlice";
import routes from "../../constants/routes";
import { setRecipients } from "../../redux/reducers/RecipientSlice";
import { setEnvelope } from "../../redux/reducers/envelopeSlice";
import { useToast } from "react-native-toast-notifications";

interface SelectEnvelopeTypeModalProps {
  navigate: any;
  documents: any;
}
const SelectEnvelopeTypeModal: React.FC<SelectEnvelopeTypeModalProps> = ({
  navigate,
  documents,
}) => {
  const dispatch = useDispatch();

  //const navigate = useNavigate();
  const isOpen = useSelector(
    (state: ApplicationState) => state.ui.showEnvelopeTypeModal
  );
  const toast = useToast();
  const handleDocumentUpload = (envelopeId: number, isSelfSign: boolean) => {
    let payload = new FormData();
    Array.from(documents).forEach((document: any) => {
      payload.append("documents[]", document);
    });

    if (envelopeId)
      EnvelopeService.handleUploadDocument(
        envelopeId,
        payload,
        toast,
        (data) => {
          if (data) {
            dispatch(setIsLoading(false));
            dispatch(setDocuments(data));
            dispatch(showEnvelopeTypeModal(false));
            if (isSelfSign) {
              dispatch(setEnvelopeStep(2));
              dispatch(setSelfSignFields([]));
              dispatch(setFixedFields([]));
              dispatch(setSelecteDocument(null));
            } else {
              dispatch(setEnvelopeStep(1));
              dispatch(setSelfSignFields([]));
              dispatch(setFixedFields([]));
              dispatch(setSelecteDocument(null));
            }
            navigate.navigate(routes.createEnvelope);
          } else {
            dispatch(setIsLoading(false));
          }
        }
      );
  };
  const handleCreateEnvelope = (isSelfSign: boolean) => {
    dispatch(showEnvelopeTypeModal(false));
    dispatch(setIsLoading(true));
    const payload = {
      self_sign: isSelfSign,
    };
    dispatch(setRecipients(null));
    EnvelopeService.handleCreateEnvelope(payload, (data) => {
      if (data) {
        dispatch(setEnvelope(data));
        if (isSelfSign && data?.envelope_recipients) {
          dispatch(setRecipients(data?.envelope_recipients));
        }
        handleDocumentUpload(data?.id, isSelfSign);
      } else {
        dispatch(setIsLoading(false));
      }
    });
  };
  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(showEnvelopeTypeModal(false));
        }}
        style={{
          position: "absolute",
          alignSelf: "center",
        }}
      >
        <View className="w-full h-full flex items-center justify-center bg-[#00000077]">
          <View className="w-[90%] max-w-md">
            <ScrollView>
              <View className=" relative rounded-2xl  bg-white ">
                <View className="  my-2 h-12 border-b border-gray-300 justify-between items-center flex flex-row    ">
                  <Text className="text-sm mx-5 w-[60%] font-medium">
                    {"Select envelope type"}
                  </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(showEnvelopeTypeModal(false));
                    }}
                  >
                    <GetSvg name="closeIcon" classN="mx-3 w-7 h-7" />
                  </Pressable>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  className="my-2  rounded-2xl  px-5"
                >
                  <View className="flex flex-row my-5">
                    <Pressable
                      onPress={() => {
                        handleCreateEnvelope(false);
                      }}
                      className="w-1/2 flex gap-y-3  justify-center items-center h-28 rounded-lg hover:outline-1 hover:outline hover:outline-[#FF947A]  hover:scale-x-[1.01] hover:scale-y-[1.02] bg-red-100"
                    >
                      <GetSvg name="sendIcon" classN="w-5 h-5" color="black" />
                      <Text className="text-xs font-semibold w-full text-center  text-gray-500">
                        Send for Signature
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        handleCreateEnvelope(true);
                      }}
                      className="w-1/2 mx-2 flex gap-y-3  justify-center items-center h-28 rounded-xl bg-green-50"
                    >
                      <GetSvg name="userIcon" />
                      <Text className="text-xs font-semibold  w-full text-center text-gray-500">
                        Sign now by yourself
                      </Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default SelectEnvelopeTypeModal;
