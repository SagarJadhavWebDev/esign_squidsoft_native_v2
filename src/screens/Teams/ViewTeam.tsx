import { Pressable, Text, TouchableOpacity, View } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
import {
  setAddUserModal,
  setCreateTeamModal,
  setshowRemoveUserModal,
} from "../../redux/reducers/uiSlice";
import CreateTeamModal from "../../components/modals/CreateTeamModal";
import { useTeams } from "../../utils/useReduxUtil";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import getLocalDate from "../../utils/getLocalDate";
import AddUserModal from "../../components/modals/AddUserModal";
import TeamsService from "../../services/TeamsService";
import OrganizationsService from "../../services/OrganizationsService";
import { setOrganization } from "../../redux/reducers/ListOrganizationSlice";
import { setTeams, setselectedUser } from "../../redux/reducers/TeamsSlice";
import SubscriptionService from "../../services/SubscriptionService";
import { setSubscription } from "../../redux/reducers/SubscriptionSlice";
import routes from "../../constants/routes";
import DeleteUserModal from "../../components/modals/DeleteUserModal";

interface ViewTeamProps {
  route: any;
  navigation: any;
}
const ViewTeam: React.FC<ViewTeamProps> = ({ route, navigation }) => {
  const { team } = route?.params;
  const isOpen = useSelector(
    (state: ApplicationState) => state?.ui?.createTeamModal
  );
  const addUserModal = useSelector(
    (state: ApplicationState) => state?.ui?.addUserModal
  );
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const dispatch = useDispatch();
  const teams: any = useTeams();
  // console.log("TEAMS2", team);
  const [user, setUser] = useState<any>(null);
  const handleRemoveUser = (
    actionType: "MIGRATE" | "IGNORE",
    transferTo: any
  ) => {
    const payload = {
      email: user?.email,
      team_id: team?.id,
      action_over_data: actionType,
      transfer_to: transferTo,
    };

    //console.log("payload", payload);
    TeamsService.handleRemoveUser(payload, (data: any) => {
      if (data) {
        if (data) {
          OrganizationsService.handleGetOrganizations((data: any) => {
            dispatch(setOrganization(data));
            dispatch(setTeams(data?.teams));
            return data;
          });
          SubscriptionService.handleGetSubscription((data) => {
            dispatch(setSubscription(data));
          });
          dispatch(setshowRemoveUserModal(false));
          navigation.navigate(routes.Settings);
        }
      }
    });
  };
  const showRemoveUserModal = useSelector(
    (state: ApplicationState) => state?.ui?.showRemoveUserModal
  );
  return (
    <View className="bg-white p-0  w-full flex gap-y-3  items-center">
      <View className="w-full h-12 border-b border-gray-300 justify-between items-center flex flex-row   ">
        <Text className="text-base mx-5 font-semibold">{"Team details "}</Text>

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
                  <Text className="w-full mb-3 font-semibold">
                    Team Information{" "}
                  </Text>
                  {/* <View className="w-full flex flex-row items-center justify-between">
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
                      <GetSvg name="eyeOpenIcon" classN="w-5 h-5 mx-3" />
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
                  </View> */}
                  <View className="w-full flex mb-2 flex-row justify-between">
                    <Text className="text-gray-400  font-semibold  text-[11px]">
                      {"Team Name  "}
                    </Text>
                    <Text className="text-gray-500 font-semibold  text-[11px]">
                      {t?.name}{" "}
                    </Text>
                  </View>
                  <View className="w-full flex mb-2 flex-row justify-between">
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
                </View>
              );
            })}

            <View className="w-full  p-3 border flex border-gray-200 items-center  justify-between rounded-xl">
              <Text className="w-full mb-3 font-semibold">Team Members </Text>
              {isEmpty(team?.users) ? (
                <View className="my-2">
                  <Text className="text-gray-500 text-xs">
                    You dont't have any teams member yet!
                  </Text>
                  <TouchableOpacity className="flex  bg-red-500 mt-2 flex-row justify-center items-center rounded-xl  p-2">
                    <Text
                      onPress={() => {
                        dispatch(setAddUserModal(true));
                      }}
                      className="text-white text-[11px] w-1/2  text-center font-semibold"
                    >
                      Add new member{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <React.Fragment>
                  {team?.users?.map((t: any) => {
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
                          <View className=" flex flex-row justify-center items-center">
                            <Text
                              onPress={() => {
                                setUser(t);
                                dispatch(setselectedUser(t?.email));
                                dispatch(setshowRemoveUserModal(true));
                              }}
                              className="text-white p-1 text-center px-2 font-semibold rounded-lg text-[9px] bg-red-500"
                            >
                              {"Delete user"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </React.Fragment>
              )}
            </View>
          </React.Fragment>
        )}
      </View>
      {isOpen ? <CreateTeamModal /> : null}
      {addUserModal ? <AddUserModal team={selectedTeam} /> : null}
      {showRemoveUserModal ? (
        <DeleteUserModal callBack={handleRemoveUser} team={team} />
      ) : null}
      <TouchableOpacity
        onPress={() => {
          dispatch(setAddUserModal(true));
        }}
        style={{
          bottom: 100,
          right: 20,
        }}
        className=" bg-[#d10000] p-2 absolute rounded-full "
      >
        <Text className="text-white text-xs px-2 font-extrabold">
          Add new member +{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewTeam;
