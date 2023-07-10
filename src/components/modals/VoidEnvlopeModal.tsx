import React, { useState } from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import WFullInputField from "../atoms/WFullInputField";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import {
  setshowVoidEnvelopeModal,
} from "../../redux/reducers/uiSlice";
import { isEmpty } from "lodash";
import { useToast } from "react-native-toast-notifications";

interface VoidEnvlopeModalProps {
  callBack: any;
}
const VoidEnvlopeModal: React.FC<VoidEnvlopeModalProps> = ({ callBack }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.showVoidEnvelopeModal
  );
  const [type, setType] = useState();
  const toast = useToast();

  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(setshowVoidEnvelopeModal(false));
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
                    Confirm Void Envelope
                  </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(setshowVoidEnvelopeModal(false));
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
                    <Text className="text-xs text-gray-400">
                      Are you sure you want to void this envelope , this action
                      is not revertable
                    </Text>
                    <Text className="mt-3 mx-1 text-gray-400 font-medium text-xs">
                      Enter reason
                    </Text>
                    <WFullInputField
                      textContentType="name"
                      placeholder="Enter reason"
                      onChangeText={(e: any) => {
                        setType(e);
                      }}
                      className="h-5 text-sm  "
                      error={isEmpty(type) ? "Pleaes enter valid reason" : null}
                    />
                  </View>
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                        dispatch(setshowVoidEnvelopeModal(false));
                    }}
                    className="p-2 bg-slate-800 w-24 text-center text-xs text-white rounded-full "
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      if (isEmpty(type)) {
                        toast.show("Pleaes enter valid reason", {
                          type: "error",
                        });
                      } else {
                        callBack(type);
                      }
                    }}
                    className="p-2 bg-[#d10000] w-24 text-center text-xs text-white rounded-full mx-5"
                  >
                    Submit
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
export default VoidEnvlopeModal;
