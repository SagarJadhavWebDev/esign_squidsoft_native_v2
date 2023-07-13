import React, { useState } from "react";
import { Modal, View, Pressable, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { ScrollView } from "react-native-gesture-handler";
import WFullInputField from "../atoms/WFullInputField";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { useOrganization } from "../../utils/useReduxUtil";
import TeamsService from "../../services/TeamsService";
import { setOrganization } from "../../redux/reducers/ListOrganizationSlice";
import { setTeams } from "../../redux/reducers/TeamsSlice";
import { setCreateTeamModal } from "../../redux/reducers/uiSlice";
import CustomDropDown from "../molecules/CustomDropDown";
import CreateTeamValidations from "../../validations/CreateTeamValidations";
import serializeYupErrors from "../../utils/SerializeErrors";
import Error from "../atoms/Error";
import { omit } from "lodash";

interface CreateTeamModalProps {}
const CreateTeamModal: React.FC<CreateTeamModalProps> = ({}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>();
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.createTeamModal
  );
  const [loadiing, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    name: null,
    subscription_id: null,
    subName: null,
  });
  const organization = useOrganization();
  const plans = organization?.meta?.available_subscriptions;
  const handleSubmit = () => {
    const newPayload = omit(payload, ["subName"]);
    setLoading(true);
    CreateTeamValidations.CreateTeamValidations.validate(newPayload, {
      abortEarly: false,
    })
      .catch((err) => {
        setLoading(false);
        setErrors(serializeYupErrors(err));
      })
      .then((res) => {
        if (res !== undefined) {
          TeamsService.handleCreateTeam(newPayload, (data: any) => {
            if (data) {
              dispatch(setOrganization(data));
              dispatch(setTeams(data?.teams));
              dispatch(setCreateTeamModal(false));
              setLoading(false);
            } else {
              setLoading(false);
            }
          });
        }
      });
  };
  //console.log("plans", organization);
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
                      onChangeText={(e: any) => {
                        setPayload((prev) => ({
                          ...prev,
                          name: e,
                        }));
                      }}
                      className="h-5 text-sm  "
                      error={errors?.name ? errors?.name : null}
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
                          subscription_id: selectedState?.value,
                          subName: selectedState?.label,
                        }));
                      }}
                      selectedValue={{
                        label: payload?.subName ?? "Select plan",
                      }}
                      placeholder={""}
                      setMainScrollState={true}
                      width={150}
                    />
                    {errors?.subscription_id ? (
                      <Error text={errors?.subscription_id} />
                    ) : null}
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
