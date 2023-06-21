import React, { useState } from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import WFullInputField from "../atoms/WFullInputField";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { setshowConfirmDeleteModal } from "../../redux/reducers/uiSlice";
import CustomDropDown from "../molecules/CustomDropDown";
import { isEmpty } from "lodash";
import { useToast } from "react-native-toast-notifications";

interface DeleteEnvelopeModalProps {
  description?: string;
  callBack: any;
}
const DeleteEnvelopeModal: React.FC<DeleteEnvelopeModalProps> = ({
  callBack,
  description = " Are you sure you want to delete this envelope.",
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.showConfirmDeleteModal
  );

  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(setshowConfirmDeleteModal(false));
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
                    Confirm Delete{" "}
                  </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(setshowConfirmDeleteModal(false));
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
                    <Text className="text-sm text-gray-400">{description}</Text>
                  </View>
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                      dispatch(setshowConfirmDeleteModal(false));
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
export default DeleteEnvelopeModal;
