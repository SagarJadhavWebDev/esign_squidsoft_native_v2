import React, { ReactNode, useState } from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";

interface CustomModalProps {
  isOpen: boolean;
  setIsOpen: any;
  children: ReactNode;
  handleSubmit: any;
  handleCancel: any;
  isLoading?: boolean;
  setIsLoading?: any;
  title: string;
}
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  handleSubmit,
  handleCancel,
  isLoading,
  setIsLoading,
  title,
}) => {
  return (
    <>
      <Modal
        key={"EDITPROFILE"}
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
          <View className=" relative rounded-2xl w-[90%] bg-white ">
            <View className="  my-2 h-12 border-b border-gray-300 justify-between items-center flex flex-row    ">
              <Text className="text-base mx-5 font-medium w-full">{title}</Text>
              <Pressable
                onPress={() => {
                  setIsOpen(false);
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
              {children}
            </ScrollView>
            <View className="w-full justify-end items-center flex flex-row my-4 ">
              <Text
                onPress={() => {
                  handleCancel();
                }}
                className="p-2 bg-slate-800 w-24 text-center text-white rounded-full "
              >
                Cancel
              </Text>
              <Text
                onPress={() => {
                  handleSubmit();
                }}
                className="p-2 bg-[#d10000] w-24 text-center text-white rounded-full mx-5"
              >
                {isLoading ? "Submiting..." : " Submit"}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default CustomModal;
