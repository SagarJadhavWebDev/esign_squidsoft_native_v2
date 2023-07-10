import React from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { setshowEnvelopeUserWarningModal } from "../../redux/reducers/uiSlice";
import { setRecipients } from "../../redux/reducers/RecipientSlice";
import { setEnvelope } from "../../redux/reducers/envelopeSlice";
import routes from "../../constants/routes";

interface EnvelopeUserWarningModalProps {
  users: any;
  callBack: any;
}
const EnvelopeUserWarningModal: React.FC<EnvelopeUserWarningModalProps> = ({
  users,
  callBack,
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.showEnvelopeUserWarningModal
  );

  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(setshowEnvelopeUserWarningModal(false));
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
                  <Text className="text-base mx-5 font-medium">Warning!! </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(setshowEnvelopeUserWarningModal(false));
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
                      Fields for the below signer have not been added
                    </Text>
                    <View className="w-full p-2">
                      {users?.map((u: any) => {
                        return (
                          <Text
                            key={u}
                            className="text-sm font-bold text-gray-500"
                          >
                            {u}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                      dispatch(setshowEnvelopeUserWarningModal(false));
                    }}
                    className="p-2 bg-slate-800 w-24 text-center text-xs text-white rounded-full "
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      callBack();
                    }}
                    className="p-2 bg-[#d10000] w-24 text-center text-xs text-white rounded-full mx-5"
                  >
                    Send Anyway
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
export default EnvelopeUserWarningModal;
