import React from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { setshowEnvelopeDraftModal } from "../../redux/reducers/uiSlice";
import { setRecipients } from "../../redux/reducers/RecipientSlice";
import { setEnvelope } from "../../redux/reducers/envelopeSlice";
import routes from "../../constants/routes";

interface DraftEnvelopeModalProps {
  navigation: any;
  callBack: any;
}
const DraftEnvelopeModal: React.FC<DraftEnvelopeModalProps> = ({
  navigation,
  callBack,
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.showEnvelopeDraftModal
  );

  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(setshowEnvelopeDraftModal(false));
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
                  <Text className="text-base mx-5 font-medium">
                    Discard Envelope{" "}
                  </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(setshowEnvelopeDraftModal(false));
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
                  {/* ############## PASSWORD INPUTS START ############## */}
                  <View className="">
                    <Text className="text-sm text-gray-400">
                      {" "}
                      Are you sure you want to close the envelope? You can save
                      as a draft or discard it.
                    </Text>
                  </View>
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                      callBack();
                    }}
                    className="p-2 bg-slate-800 w-24 text-center text-xs text-white rounded-full "
                  >
                    Discard {" "}
                  </Text>
                  <Text
                    onPress={() => {
                      dispatch(setEnvelope(null));
                      dispatch(setRecipients(null));
                      dispatch(setshowEnvelopeDraftModal(false));
                      navigation.navigate(routes.dashboard);
                    }}
                    className="p-2 bg-[#d10000] w-24 text-center text-xs text-white rounded-full mx-5"
                  >
                    Save as draft{" "}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default DraftEnvelopeModal;
