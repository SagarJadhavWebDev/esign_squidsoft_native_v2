import React, { useEffect, useState } from "react";
import { Modal, View, Pressable, Text, TextInput } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import useAuth from "../../utils/auth";
import { useToast } from "react-native-toast-notifications";
import Svg, { Path } from "react-native-svg";
import WFullInputField from "../atoms/WFullInputField";
import Error from "../atoms/Error";
import { isEmpty } from "lodash";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import ProfileService from "../../services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { useOrganization } from "../../utils/useReduxUtil";
import TeamsService from "../../services/TeamsService";
import { setOrganization } from "../../redux/reducers/ListOrganizationSlice";
import { setTeams } from "../../redux/reducers/TeamsSlice";
import CustomDropDown from "../molecules/CustomDropDown";
import { setAddUserModal } from "../../redux/reducers/uiSlice";
import routes from "../../constants/routes";

interface AddUserModalProps {
  team: any;
}
const AddUserModal: React.FC<AddUserModalProps> = ({ team }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.addUserModal
  );
  const toast = useToast()
  const [loadiing, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    email: null,
    team_id: team?.id,
  });

  const handleSubmit = () => {
    setLoading(true);
    console.log("CLICKED", payload);
    TeamsService.handleAddUser(payload,toast, (data: any) => {
      if (data) {
        // dispatch(setOrganization(data));
        dispatch(setAddUserModal(false));
        setLoading(false);
      } else {
        setLoading(false);
        dispatch(setAddUserModal(false));
      }
    });
  };
  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(setAddUserModal(false));
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
                    {"Add User "}
                  </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(setAddUserModal(false));
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
                      Enter team name
                    </Text>
                    <WFullInputField
                      textContentType="emailAddress"
                      placeholder="Enter user email"
                      onChangeText={(e: any) => {
                        setPayload((prev: any) => ({
                          ...prev,
                          email: e,
                        }));
                      }}
                      className="h-5 text-sm "
                    />
                  </View>
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                      dispatch(setAddUserModal(false));
                    }}
                    className="p-2 bg-slate-800 w-24 text-center text-xs text-white rounded-full "
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      handleSubmit();
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
export default AddUserModal;
