import { isEmpty, isNull } from "lodash";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useToast } from "react-native-toast-notifications";
import ApiConfig from "../../constants/ApiConfig";
import apiEndpoints from "../../constants/apiEndpoints";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import GetSvg from "../../utils/GetSvg";
import HttpService from "../../utils/HttpService";
import { useStamps } from "../../utils/useReduxUtil";
import CredentialsService from "../../services/CredentialsService";
import { useDispatch } from "react-redux";
import { setStamps } from "../../redux/reducers/CredentialsSlice";

// @isSelectStamp used for selecting stamp if multiple stamps availble for sign enevelope
interface ManageStampsProps {
  setIsOpen: any;
  modalType: any;
  imgSrc: any;
  isSelectStamp?: boolean;
  callback?: any;
}

const ManageStamps: React.FC<ManageStampsProps> = ({
  setIsOpen,
  modalType,
  imgSrc,
  isSelectStamp = false,
  callback,
}) => {
  const { token, UpdateUser, auth, setIsLoading, isLoading, RefreshUser } =
    useAuth();
  const toast = useToast();
  const stamps = useStamps();
  const [viewStamp, setViewStamp] = useState<any>(null);
  // const handleDefaultStamp = async (id: any) => {
  //   setIsLoading && setIsLoading(true);
  //   await HttpService.put(apiEndpoints.updateStamp(id), { token: token })
  //     .then(async (res: any) => {
  //       const data = res;
  //       if (res?.id) {
  //         const data = CryptoHandler.response(res, token ?? "");
  //         UpdateUser &&
  //           UpdateUser(res, token, () => {
  //             setIsOpen({
  //               type: null,
  //               isOpen: false,
  //             });
  //             RefreshUser && RefreshUser(token);
  //             toast.show(`${modalType} default set successfully`, {
  //               type: "success",
  //             });
  //             setIsLoading && setIsLoading(false);
  //           });
  //       } else {
  //         toast.show("Failed to update stamp", { type: "error" });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const handleDeleteStamp = async (id: any) => {
  //   setIsLoading && setIsLoading(true);
  //   await HttpService.delete(apiEndpoints.updateCredentials(id), {
  //     token: token ?? "",
  //   })
  //     .then(async (res: any) => {
  //       if (res) {
  //         const data = CryptoHandler.response(res, token ?? "");
  //         UpdateUser &&
  //           UpdateUser(res, token, () => {
  //             setIsOpen({
  //               type: null,
  //               isOpen: false,
  //             });
  //             RefreshUser && RefreshUser(token);
  //             toast.show("Stamp deleted succesfully", { type: "success" });
  //             setIsLoading && setIsLoading(false);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("STAMP DELETE ERR", err);
  //     });
  // };
  const dispatch = useDispatch();
  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        className="w-full my-5 p-3 h-full  "
      >
        {isNull(viewStamp) ? (
          !isEmpty(stamps) ? (
            stamps?.map((s: any) => {
              const isDefault = s?.is_default === 1;
              return (
                <View
                  key={s?.id}
                  className="  p-1 m-1 h-16 flex border border-gray-200 flex-row justify-around items-center rounded-xl"
                >
                  <View className="w-1/3 h-10 justify-center items-center">
                    <Image
                      className="shadow-2xl w-full h-full"
                      resizeMode="contain"
                      source={{
                        uri: imgSrc ?? s?.source?.base64,
                      }}
                    />
                  </View>
                  <View className="w-1/3 h-10 justify-center items-center">
                    <Text numberOfLines={1}>{s?.name}</Text>
                  </View>
                  {!isSelectStamp ? (
                    <View className="w-1/3 h-10 justify-center items-center flex flex-row ">
                      <TouchableOpacity
                        onPress={() => {
                          // handleDefaultStamp(s?.id);
                          CredentialsService.handleSetDefaultCredentials(
                            s?.id,
                            (data) => {
                              dispatch(setStamps(data?.["stamps"]?.reverse()));
                            }
                          );
                        }}
                        className={`w-5 h-5 rounded-full justify-center items-center ${
                          isDefault
                            ? " bg-green-400"
                            : "bg-white border border-gray-400"
                        }`}
                      >
                        <GetSvg
                          name="tickIcon"
                          classN="w-4 h-4 border"
                          color={isDefault ? "white" : "#9CA3AF"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          CredentialsService.handleDeleteCredentials(
                            s?.id,
                            (data) => {
                              dispatch(setStamps(data?.["stamps"]?.reverse()));
                            }
                          );
                          //handleDeleteStamp(s?.id);
                        }}
                        className="justify-center items-center"
                      >
                        <GetSvg name="deleteIcon" classN="w-5 h-5 mx-3" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setViewStamp(s?.source?.base64);
                        }}
                        className=" justify-center items-center"
                      >
                        <Svg
                          fill="white"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                          color={"black"}
                        >
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View className="w-1/3 h-10 justify-center items-center flex flex-row ">
                      <Text
                        onPress={() => {
                          callback(s);
                          setIsOpen(false);
                        }}
                        className="bg-[#d10000] text-white w-1/2 p-2 rounded-xl text-center"
                      >
                        Select
                      </Text>
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <View className="w-full h-full   ">
              <GetSvg
                name="noStampFoundIcon"
                classN="w-32 mx-auto   h-32 ml-36  "
              />
              <Text className="text-lg font-medium mx-auto ">
                No stamp found !
              </Text>
            </View>
          )
        ) : (
          <>
            <Text className="mb-2 px-3 tracking-wider">
              Stamp Name :- <Text className="font-bold">{viewStamp?.name}</Text>
            </Text>
            <View className="w-full h-48 border border-gray-400 rounded-xl p-2 ">
              <Image
                className="shadow-2xl w-full h-full"
                resizeMode="contain" //contain need to change
                source={{
                  uri: viewStamp,
                }}
              />
            </View>
            <View className="justify-center items-center py-2">
              <TouchableOpacity
                onPress={() => {
                  setViewStamp(null);
                }}
                className="w-1/2 bg-red-600 justify-center items-center p-1 rounded-lg"
              >
                <Text className="text-white font-bold text-lg">Close</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default ManageStamps;
