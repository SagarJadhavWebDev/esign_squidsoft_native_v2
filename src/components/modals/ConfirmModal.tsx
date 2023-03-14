import React, { ReactNode } from "react";
import { Modal, View, Pressable, Text, Button } from "react-native";
import GetSvg from "../../utils/GetSvg";

interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: any;
  modalType: string;
  onSubmit: any;
  title: string;
  description: string;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  setIsOpen,
  modalType,
  onSubmit,
  title,
  description,
}) => {
  //bg-[#00000077]
  return (
    <>
      <Modal
        key={modalType}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={{
          position: "absolute",

          alignSelf: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000077",
          }}
        >
          <View className="h-[20%] relative rounded-2xl w-[90%] bg-white ">
            <View className="  my-2 h-[20%] border-b border-gray-300   ">
              <Text className="text-lg mx-5 font-semibold">{title}</Text>
            </View>
            <View className="h-[40%] mx-5 ">
              <Text className="text-base">{description}</Text>
            </View>
            <View className="h-[30%] flex flex-row justify-end items-center   ">
              <Text
                onPress={() => {
                  setIsOpen(false);
                }}
                className=" bg-slate-800  p-2 w-20 text-center  text-white rounded-xl font-bold "
              >
                Cancel
              </Text>
              <Text
                onPress={() => {
                  onSubmit();
                }}
                className={`bg-[#d10000] mx-5  p-2 w-20 text-center  text-white rounded-xl font-bold `}
              >
                Next
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default ConfirmModal;
