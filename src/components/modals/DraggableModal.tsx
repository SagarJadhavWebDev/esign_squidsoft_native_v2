import React, { ReactNode } from "react";
import { Modal, View, Pressable, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GetSvg from "../../utils/GetSvg";

interface DraggableModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: any;
  modalType: string;
  modalHeightInPercentage?: number;
}
const DraggableModal: React.FC<DraggableModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  modalType,
  modalHeightInPercentage = 75,
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
          <View
            className={`mt-auto h-[${modalHeightInPercentage}%] max-h-[65%] bg-white relative rounded-t-2xl `}
          >
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

            <ScrollView>{children}</ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default DraggableModal;
