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
import { setCreateTeamModal } from "../../redux/reducers/uiSlice";
import CustomDropDown from "../molecules/CustomDropDown";

interface CreateTeamModalProps {}
const CreateTeamModal: React.FC<CreateTeamModalProps> = ({}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.createTeamModal
  );
  const [loadiing, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    name: null,
    subscription_id: null,
  });
  const organization = useOrganization();
  const plans = organization?.meta?.available_subscriptions;
  const handleSubmit = () => {
    setLoading(true);
    TeamsService.handleCreateTeam(payload, (data: any) => {
      if (data) {
        dispatch(setOrganization(data));
        dispatch(setTeams(data?.teams));
        dispatch(setCreateTeamModal(false));
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };
  console.log("plans", organization);
  return (
    <>
      <Modal
        key={"EDITPROFILE"}
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          dispatch(setCreateTeamModal(false));
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
                    {"Create Team "}
                  </Text>

                  <Pressable
                    onPress={() => {
                      dispatch(setCreateTeamModal(false));
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
                      textContentType="name"
                      placeholder="Enter team name"
                      onChangeText={(e: any) => {}}
                      className="h-5 text-sm  "
                    />
                  </View>
                  <View className="">
                    <Text className=" mx-1 text-gray-400 font-medium text-xs">
                      Select Plan
                    </Text>
                    <CustomDropDown
                      items={[
                        ...(plans ?? []),
                        { lable: "Select Plan", value: "" },
                      ]?.map((s: any) => {
                        return { value: s?.id, label: s?.name };
                      })}
                      onSelect={(e: any) => {
                        const selectedState = e?.option;
                        console.log("selectedState", selectedState);

                        setPayload((prev) => ({
                          ...prev,
                          city: selectedState?.label,
                        }));
                      }}
                      selectedValue={{ label: payload?.name ?? "Select plan" }}
                      placeholder={"sad"}
                      setMainScrollState={true}
                      width={150}
                    />
                  </View>
                </ScrollView>
                <View className="w-full justify-end items-center flex flex-row my-4 ">
                  <Text
                    onPress={() => {
                      dispatch(setCreateTeamModal(false));
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
export default CreateTeamModal;
