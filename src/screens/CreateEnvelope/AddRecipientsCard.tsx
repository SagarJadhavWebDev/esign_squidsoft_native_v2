import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import WFullInputField from "../../components/atoms/WFullInputField";
import { useDispatch } from "react-redux";
import { useRecipients } from "../../utils/useReduxUtil";
import { setRecipients } from "../../redux/reducers/RecipientSlice";
import ApiInstance from "../../services/ApiInstance";
import apiEndpoint from "../../constants/apiEndpoints";
import handleResponse from "../../services/handleResponse";
import { useToast } from "react-native-toast-notifications";
interface AddRecipientsCardProps {}
const AddRecipientsCard: React.FC<AddRecipientsCardProps> = () => {
  const dispatch = useDispatch();
  const { recipients } = useRecipients();
  const [errors, setErrors] = useState<any>();
  const [searchUsers, setSearchUser] = useState<any>(null);
  const [showSearchList, setShowSearchList] = useState(false);
  const toast = useToast();
  const [currentRecipient, setcurrentRecipient] = useState<any>({
    name: null,
    email: null,
    order: 1,
    action: "SIGNER",
  });
  useEffect(() => {
    setcurrentRecipient({
      name: null,
      email: null,
      action: "SIGNER",
      order: recipients?.length ? recipients?.length : 0,
    });
  }, [recipients?.length]);
  const handleAddUser = () => {
    setErrors(null);
    const userEXists = recipients?.some(
      (recipient: any) =>
        recipient?.email === currentRecipient?.email &&
        recipient.action === currentRecipient?.action
    );
    if (!userEXists) {
      dispatch(setRecipients([...(recipients ?? []), currentRecipient]));
    } else {
      toast.show("This user is already assigned with same operation", {
        type: "error",
      });
    }
  };
  const handleSearchUsers = (q: any) => {
    ApiInstance.get(apiEndpoint.envelope.searchRecipients(q)).then((res) => {
      const data = handleResponse(res as any);
      if (data) {
        setSearchUser(data);
      }
    });
  };
  useEffect(() => {
    setcurrentRecipient((prev: any) => ({
      ...prev,
      name: currentRecipient?.email?.split("@")?.[0],
    }));
  }, [currentRecipient?.email]);
  // console.log(currentRecipient);
  useEffect(() => {
    if (
      currentRecipient?.name?.length &&
      !currentRecipient?.email?.includes("@")
    ) {
      handleSearchUsers(currentRecipient?.name);
      setShowSearchList(true);
    }
  }, [currentRecipient?.name]);
  // console.log(recipients);
  return (
    <React.Fragment>
      {recipients?.map((s: any) => {
        return (
          <View key={s?.email} className="w-full flex flex-row my-2  border border-gray-300 rounded-xl  items-center">
            <View className="flex ml-2 mr-3  justify-center w-[70%] ">
              {/* <Text className="text-[10px]">Enter signer email</Text> */}
              <WFullInputField
                placeholder="Enter signer email"
                className="text-xs w-full h-5"
                textContentType="emailAddress"
                value={s?.email ?? s?.user?.email}
                editable={false}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                const data = recipients?.filter((user: any) => {
                  if (user?.id) {
                    return user?.id !== s?.id;
                  } else {
                    return user?.order !== s?.order;
                  }
                });
                // console.log("DATA", data);
                dispatch(setRecipients(data));
              }}
              className="w-[20%] rounded-xl flex p-2 flex-row  my-1 bg-red-500  "
            >
              <Text className="text-[10px] text-center w-full text-white font-semibold">
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <View className="w-full flex flex-col p-1 my-2  border border-gray-300 rounded-xl justify-center items-center">
        <View className="flex flex-col justify-center ">
          {/* <Text className="text-[10px]">Enter signer email</Text> */}
          <WFullInputField
            placeholder="Enter signer email"
            className="text-xs h-5"
            textContentType="emailAddress"
            onChangeText={(e) => {
              setcurrentRecipient((prev: any) => ({
                ...prev,
                email: e,
              }));
            }}
            value={currentRecipient?.email}
          />
        </View>
        <View className="flex flex-col justify-center ">
          {/* <Text className="text-[10px]">Enter signer name</Text> */}
          <WFullInputField
            placeholder="Enter signer name"
            className="text-xs h-5"
            textContentType="name"
            onChangeText={(e) => {
              setcurrentRecipient((prev: any) => ({
                ...prev,
                name: e,
              }));
            }}
            value={currentRecipient?.name}
          />
        </View>
        <TouchableOpacity
          onPress={handleAddUser}
          className="w-24 rounded-xl flex p-2 flex-row self-end mx-3 my-1 bg-red-500  "
        >
          <Text className="text-xs text-center w-full text-white font-semibold">
            Add signer
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

export default AddRecipientsCard;
