import { Pressable, Text, TouchableOpacity, View } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import {
  setAddUserModal,
  setCreateTeamModal,
} from "../../redux/reducers/uiSlice";
import CreateTeamModal from "../../components/modals/CreateTeamModal";
import { useOrganization, useTeams } from "../../utils/useReduxUtil";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import getLocalDate from "../../utils/getLocalDate";
import AddUserModal from "../../components/modals/AddUserModal";
import routes from "../../constants/routes";

interface ManageTeamsProps {
  navigation: any;
}
const ManageTeams: React.FC<ManageTeamsProps> = ({ navigation }) => {
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.createTeamModal
  );
  const addUserModal = useSelector(
    (state: ApplicationState) => state?.ui?.addUserModal
  );
  const [team, setTeam] = useState<any>(null);
  const dispatch = useDispatch();
  const teams: any = useTeams();
  const organization = useOrganization();
  console.log("TEAMS", teams);
  const plans = organization?.meta?.available_subscriptions;

  return (
    <View className="bg-white p-0  w-full flex gap-y-3  items-center">
      <View className="w-full h-12 border-b border-gray-300 justify-between items-center flex flex-row   ">
        <Text className="text-base mx-5 font-semibold">{"Manage Teams "}</Text>

        <Pressable
          onPress={() => {
            navigation.pop();
          }}
        >
          <GetSvg name="closeWithoutCircleIcon" classN="mx-3 w-5 h-5" />
        </Pressable>
      </View>

      <View className="w-full px-3 h-full flex gap-y-3 items-center ">
        {isEmpty(teams) ? (
          <View className="w-full gap-y-3 items-center justify-center p-3 border border-gray-200 h-1/6 rounded-xl">
            <Text className="text-gray-500 text-xs">
              You dont't have any teams yet!
            </Text>
            <TouchableOpacity className="flex mt-2 flex-row justify-center items-center rounded-xl bg-red-500 p-2">
              <Text
                onPress={() => {
                  console.log("MODAL");
                  dispatch(setCreateTeamModal(true));
                }}
                className="text-white text-xs w-1/2 text-center font-semibold"
              >
                Create New Team
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <React.Fragment>
            {teams?.map((t: any) => {
              return (
                <View
                  key={t?.name}
                  className="w-full  p-3 border flex border-gray-200 items-center  justify-between rounded-xl"
                >
                  <View className="w-full flex flex-row items-center justify-between">
                    <Text
                      numberOfLines={1}
                      className="text-gray-400 max-w-28 w-28  font-semibold text-xs"
                    >
                      {t?.name}{" "}
                    </Text>
                    <View className=" flex flex-row  items-center">
                      <Text
                        numberOfLines={1}
                        className="text-gray-500 text-xs   font-semibold  text-[11px]"
                      >
                        {t?.subscription?.name} - {t?.subscription?.id}{" "}
                      </Text>
                      <Text
                        onPress={() => {
                          navigation.navigate(routes.ViewTeam, {
                            team: t,
                          });
                        }}
                        className="text-white mx-2 p-1 px-2 font-semibold rounded-lg text-[9px] bg-red-500"
                      >
                        {"View "}
                      </Text>
                      <Text
                        onPress={() => {
                          // show add user modal
                          setTeam(t);
                          dispatch(setAddUserModal(true));
                        }}
                        className="text-white p-1 px-2 font-semibold rounded-lg text-[9px] bg-red-500"
                      >
                        {"Add Users "}
                      </Text>
                    </View>
                  </View>
                  {/*  <View className="w-full flex mb-2 flex-row justify-between">
                    <Text className="text-gray-400  font-semibold  text-[11px]">
                      {"Plan  "}
                    </Text>
                    <Text className="text-gray-500 font-semibold  text-[11px]">
                      {t?.subscription?.name} - {t?.subscription?.id}{" "}
                    </Text>
                  </View>
                  <View className="w-full flex mb-2 flex-row justify-between">
                    <Text className="text-gray-400  font-semibold  text-[11px]">
                      {"Start Date "}
                    </Text>
                    <Text className="text-gray-500 font-semibold  text-[11px]">
                      {getLocalDate(t?.subscription?.start_date).format(
                        "DD/MM/YYYY"
                      )}
                    </Text>
                  </View>
                  <View className="w-full flex mb-2 flex-row justify-between">
                    <Text className="text-gray-400  font-semibold  text-[11px]">
                      {"End Date  "}
                    </Text>
                    <Text className="text-gray-500 font-semibold  text-[11px]">
                      {getLocalDate(t?.subscription?.end_date).format(
                        "DD/MM/YYYY"
                      )}
                    </Text>
                  </View>
                  <View className="w-full flex mb-2 flex-row justify-between">
                    <Text className="text-gray-400  font-semibold  text-[11px]">
                      {"User Allowed  "}
                    </Text>
                    <Text className="text-gray-500 font-semibold  text-[11px]">
                      {t?.subscription?.user_count +
                        " - " +
                        t?.subscription?.allowed_user_count}
                      {" Users  "}
                    </Text>
                  </View>
                  <View className="w-full flex  flex-row justify-between items-center">
                    <Text className="text-gray-400  font-semibold  text-[11px]">
                      {"Add users "}
                    </Text>
                    <Text className="text-white p-1 px-2 font-semibold rounded-lg text-[9px] bg-red-500">
                      {"Add Users "}
                    </Text>
                  </View> */}
                </View>
              );
            })}
          </React.Fragment>
        )}
      </View>
      {isOpen ? <CreateTeamModal /> : null}
      {addUserModal ? <AddUserModal team={team} /> : null}
      {!isEmpty(plans) ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(setCreateTeamModal(true));
          }}
          style={{
            bottom: 100,
            right: 20,
          }}
          className=" bg-[#d10000] p-2 absolute rounded-full "
        >
          <Text className="">
            <GetSvg name="addIcon" color="white" classN="w-8 h-8" />
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ManageTeams;
