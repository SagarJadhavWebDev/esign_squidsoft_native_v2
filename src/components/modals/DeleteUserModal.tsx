import React, { useState } from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import WFullInputField from "../atoms/WFullInputField";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import TeamsService from "../../services/TeamsService";
import {
  setAddUserModal,
  setshowRemoveUserModal,
} from "../../redux/reducers/uiSlice";
import { useUser } from "../../utils/useReduxUtil";
import CustomDropDown from "../molecules/CustomDropDown";

interface DeleteUserModalProps {
  team: any;
  callBack: any;
}
const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  team,
  callBack,
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.showRemoveUserModal
  );
  const selectedUser = useSelector(
    (state: ApplicationState) => state?.teams?.selectedUser
  );
  const admin = useUser();
  const [type, setType] = useState("KEEP");
  const [transferUser, setTransferUser] = useState<any>();
  const [loadiing, setLoading] = useState();
  //@ts-ignore
  const users = team?.users;
  const userList = team?.users
    ?.filter((u: any) => u?.email !== selectedUser)
    .map((u: any) => {
      return u?.email;
    });
  //console.log("teamLIST", [...userList, admin?.email]);

  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(setshowRemoveUserModal(false));
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
                  <Text className="text-sm mx-5 w-[60%] font-medium">
                    {"Confirm Member Removal  "}
                  </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(setshowRemoveUserModal(false));
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
                    <Text className=" mx-1 text-gray-400 font-medium text-xs">
                      Do you want to migrate the data exchanged by member in
                      this organization.
                    </Text>
                  </View>
                  <View className="mt-3 w-full flex flex-row  ">
                    <View className="w-1/2 flex flex-row gap-x-2">
                      <Pressable
                        onPress={() => {
                          setType("KEEP");
                        }}
                        className="w-5 h-5 p-1 bg-gray-200 rounded-xl flex justify-center items-center"
                      >
                        <View
                          className={`${
                            type === "KEEP" ? "bg-blue-300" : "bg-transparent"
                          }  w-3 h-3 rounded-full`}
                        ></View>
                      </Pressable>
                      <Text className="text-xs text-gray-500 w-full">Keep</Text>
                    </View>
                    <View className="w-1/2 flex flex-row gap-x-2">
                      <Pressable
                        onPress={() => {
                          setType("MIGRATE");
                        }}
                        className="w-5 h-5 p-1 bg-gray-200 rounded-xl flex justify-center items-center"
                      >
                        <View
                          className={`${
                            type === "MIGRATE"
                              ? "bg-blue-300"
                              : "bg-transparent"
                          } w-3 h-3 rounded-full`}
                        ></View>
                      </Pressable>
                      <Text className="text-xs text-gray-500 w-full">
                        Migrate
                      </Text>
                    </View>
                  </View>
                  <View className="mt-3">
                    <CustomDropDown
                      items={[...userList, admin?.email ?? []]?.map(
                        (s: any) => {
                          return { value: s, label: s };
                        }
                      )}
                      onSelect={(e: any) => {
                        // const selectedState = e?.option;
                        //console.log("selectedState", e);
                        setTransferUser(e?.option?.value);
                      }}
                      selectedValue={{ label: transferUser ?? "Select user" }}
                      placeholder={"sad"}
                      setMainScrollState={true}
                      width={150}
                    />
                  </View>
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                      dispatch(setshowRemoveUserModal(false));
                    }}
                    className="p-2 bg-slate-800 w-24 text-center text-xs text-white rounded-full "
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      callBack(
                        type === "MIGRATE" ? "MIGRATE" : "IGNORE",
                        type === "MIGRATE"
                          ? transferUser ??
                              [...(userList ?? []), admin?.email]?.[0]
                          : null
                      );
                    }}
                    className="p-2 bg-[#d10000] w-24 text-center text-xs text-white rounded-full mx-5"
                  >
                    {loadiing ? "Submiting..." : " Submit"}
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
export default DeleteUserModal;
