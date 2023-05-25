import { isEmpty, result } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ImageBackground,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from "react-native-document-picker";
import Carousel from "pinar";
import GetSvg from "../../utils/GetSvg";
import CredentialsModal from "../modals/CredentialsModal";
import UploadCredentials from "../../screens/Credentials/UploadCredentials";
import useAuth from "../../utils/auth";
import ApiConfig from "../../constants/ApiConfig";
import { useInitial, useSignature, useStamps } from "../../utils/useReduxUtil";
import { Initial, Stamp } from "../../redux/reducers/CredentialsSlice";
const { height: PAGE_HEIGHT, width: PAGE_WIDTH } = Dimensions.get("window");
const activeOffsetX = { activeOffsetX: [-10, 10] };

const Slider = () => {
  const resultRef = useRef(null);
  const dotMenuList = ["Initials", "Signature", "Stamps"];
  const [uploadInitialModal, setuploadInitialModal] = useState({
    type: "initial",
    isOpen: false,
  });
  const { auth } = useAuth();
  const stamps: Stamp[] = useStamps() as any;
  //auth?.user?.stamps?.filter((s: any) => s?.is_default === 1)?.[0] ??
  //auth?.user?.stamps?.[0];
  const signature: Initial = useSignature(); //auth?.user?.signature ?? null;
  const initial: Initial = useInitial(); //auth?.user?.initials ?? null;
  return (
    <>
      <Carousel
        ref={resultRef}
        style={{
          height: 250,
        }}
        containerStyle={{
          height: 250,
        }}
        contentContainerStyle={{
          height: 250,
        }}
        showsControls={false}
        bounces={true}
        removeClippedSubviews={false}
        dotsContainerStyle={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "rgba(209 213 219,0.5)",
          height: 25,
          // marginHorizontal: "25%",
          padding: 2,
          borderRadius: 20,
        }}
        renderDot={(props) => {
          return (
            <Pressable
              onPress={() =>
                //@ts-ignore
                resultRef.current?.scrollToIndex({ index: props?.index })
              }
              className=" p-0.5 px-2 "
            >
              <Text className="text-xs w-[70px] text-center text-[#374151]">
                {dotMenuList?.[props.index]}
              </Text>
            </Pressable>
          );
        }}
        renderActiveDot={(props) => {
          return (
            <Pressable
              onPress={() =>
                //@ts-ignore
                resultRef.current?.scrollToIndex({ index: props?.index })
              }
              className="p-0.5 px-2 rounded-2xl w-[70px]  bg-[#d10000] "
            >
              <Text className=" text-white text-center text-xs">
                {dotMenuList?.[props.index]}
              </Text>
            </Pressable>
          );
        }}
      >
        <View className="w-5/6 h-3/4  mx-auto my-auto rounded-2xl border border-gray-300">
          {isEmpty(initial) ? (
            <>
              <View className="w-full h-2/4 p-3 justify-end items-center">
                <Text className="text-base text-gray-500 w-full text-center">
                  You don't have any initials
                </Text>
              </View>
              <View className="w-full h-2/4 flex justify-start items-center ">
                <TouchableOpacity
                  onPress={() => {
                    setuploadInitialModal({
                      isOpen: true,
                      type: "initial",
                    });
                  }}
                  className=" bg-slate-800 px-3 py-1 rounded-3xl justify-center items-center"
                >
                  <Text className="text-xs text-white text-center w-[80px]">
                    Upload Initials
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            !isEmpty(initial) && (
              <>
                <View className="w-full h-3/4 p-3">
                  <Image
                    className="shadow-2xl w-full h-full"
                    resizeMode="contain"
                    source={{
                      uri: initial?.source?.base64,
                    }}
                  />
                </View>
                <View className="w-full h-1/4 flex justify-center items-center ">
                  <TouchableOpacity
                    onPress={() => {
                      setuploadInitialModal({
                        isOpen: true,
                        type: "initial",
                      });
                    }}
                    className=" bg-slate-800 px-3 py-1 rounded-3xl justify-center items-center"
                  >
                    <Text className="text-xs text-white text-center w-[80px] ">
                      Change Initial
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )
          )}
        </View>
        <View className="w-5/6 h-3/4  mx-auto my-auto rounded-2xl border border-gray-300">
          {isEmpty(signature) ? (
            <>
              <View className="w-full h-2/4 p-3 justify-end items-center">
                <Text className="text-base text-gray-500 w-full text-center">
                  You don't have any Signature
                </Text>
              </View>
              <View className="w-full h-2/4 flex justify-start items-center ">
                <TouchableOpacity
                  onPress={() => {
                    setuploadInitialModal({
                      isOpen: true,
                      type: "signature",
                    });
                  }}
                  className=" bg-slate-800 px-3 py-1 rounded-3xl justify-center items-center"
                >
                  <Text className="text-xs text-white text-center w-[100px]">
                    Upload Signature
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View className="w-full h-3/4 p-3">
                <Image
                  className="shadow-2xl w-full h-full"
                  resizeMode="contain"
                  source={{
                    uri: signature?.source?.base64,
                  }}
                />
              </View>
              <View className="w-full h-1/4 flex justify-center items-center ">
                <TouchableOpacity
                  onPress={() => {
                    setuploadInitialModal({
                      isOpen: true,
                      type: "signature",
                    });
                  }}
                  className=" bg-slate-800 px-3 py-1 rounded-3xl justify-center items-center"
                >
                  <Text className="text-xs text-white text-center w-[100px]">
                    Change Signature
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <View className="w-5/6 h-3/4  mx-auto my-auto rounded-2xl border border-gray-300">
          {isEmpty(stamps) ? (
            <>
              <View className="w-full h-2/4 p-3 justify-end items-center">
                <Text className="text-base text-gray-500 w-full text-center">
                  You don't have any Stamps
                </Text>
              </View>
              <View className="w-full h-2/4 flex justify-start items-center ">
                <TouchableOpacity
                  onPress={() => {
                    setuploadInitialModal({
                      isOpen: true,
                      type: "stamp",
                    });
                  }}
                  className=" bg-slate-800 px-3 py-1 rounded-3xl justify-center items-center"
                >
                  <Text className="text-xs text-white text-center w-[85px] ">
                    Upload Stamps
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View className="w-full h-3/4 p-3">
                <Image
                  className="shadow-2xl w-full h-full"
                  resizeMode="contain"
                  source={{
                    uri: stamps?.find((s) => s?.is_default === 1)?.source
                      ?.base64,
                  }}
                />
              </View>
              <View className="w-full h-1/4 flex justify-center items-center ">
                <TouchableOpacity
                  onPress={() => {
                    setuploadInitialModal({
                      isOpen: true,
                      type: "stamp",
                    });
                  }}
                  className=" bg-slate-800 px-3 py-1 rounded-3xl justify-center items-center"
                >
                  <Text className="text-xs text-white text-center w-[70px]">
                    Add Stamps
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Carousel>
      {uploadInitialModal.isOpen ? (
        <CredentialsModal
          isOpen={uploadInitialModal.isOpen}
          modalType={uploadInitialModal.type}
          setIsOpen={setuploadInitialModal}
        >
          <UploadCredentials
            modalType={uploadInitialModal.type}
            setIsOpen={setuploadInitialModal}
          />
        </CredentialsModal>
      ) : null}
    </>
  );
};

export default Slider;
