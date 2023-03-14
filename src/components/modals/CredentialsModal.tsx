import React, { ReactNode } from "react";
import { Modal, View, Pressable, Text, Button } from "react-native";
import GetSvg from "../../utils/GetSvg";

interface CredentialsModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: any;
  modalType: string;
}
const CredentialsModal: React.FC<CredentialsModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  modalType,
}) => {
  return (
    <>
      <Modal
        key={modalType}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        className="bg-red-500"
      >
        <View className="h-full bg-[#00000077] ">
          <View className="mt-auto h-[65%] max-w-md mx-auto bg-white relative  rounded-t-2xl ">
            <View className="absolute -top-12  justify-center w-full items-center">
              <Pressable
                onPress={() => {
                  setIsOpen(false);
                }}
                className=" rounded-full p-1"
              >
                <GetSvg
                  name="closeIcon"
                  classN="w-10 h-10"
                  color={"rgb(210, 210, 210)"}
                  strokeWidth={1}
                />
              </Pressable>
            </View>

            <View>{children}</View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default CredentialsModal;
