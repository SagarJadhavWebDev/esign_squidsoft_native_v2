import {
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";
import OrganizationsService from "../../services/OrganizationsService";
import SubscriptionService from "../../services/SubscriptionService";
import { setOrganization } from "../../redux/reducers/ListOrganizationSlice";
import { setTeams } from "../../redux/reducers/TeamsSlice";
import { setSubscription } from "../../redux/reducers/SubscriptionSlice";

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
  // console.log("TEAMS", teams);
  const plans = organization?.meta?.available_subscriptions;
  const [refreshing, setRefreshing] = React.useState(false);

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

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              OrganizationsService.handleGetOrganizations((data: any) => {
                dispatch(setOrganization(data));
                dispatch(setTeams(data?.teams));
                return data;
              });
              SubscriptionService.handleGetSubscription((data) => {
                dispatch(setSubscription(data));
              });
            }}
          />
        }
      >
        <View className="w-full px-3 h-full flex gap-y-3 items-center ">
          {isEmpty(teams) ? (
            <View className="w-full gap-y-3 items-center justify-center p-3 border border-gray-200 h-1/6 rounded-xl">
              <Text className="text-gray-500 text-xs">
                You dont't have any teams yet!
              </Text>
              <TouchableOpacity className="flex mt-2 flex-row justify-center items-center rounded-xl bg-red-500 p-2">
                <Text
                  onPress={() => {
                    // console.log("MODAL");
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
                            setTeam(t);
                            dispatch(setAddUserModal(true));
                          }}
                          className="text-white p-1 px-2 font-semibold rounded-lg text-[9px] bg-red-500"
                        >
                          {"Add Users "}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </React.Fragment>
          )}
        </View>
      </ScrollView>

      {isOpen ? <CreateTeamModal /> : null}
      {addUserModal ? <AddUserModal team={team} /> : null}
      {!isEmpty(organization?.meta?.available_subscriptions) ? (
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
          <Text className="text-white text-xs px-2 font-extrabold">
            Add New Team{" "}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ManageTeams;
