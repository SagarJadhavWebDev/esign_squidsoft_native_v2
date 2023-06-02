import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useToast } from "react-native-toast-notifications";
import apiEndpoints from "../../constants/apiEndpoints";
import GetSvg from "../../utils/GetSvg";
import HttpService from "../../utils/HttpService";

interface CustomPlanCardProps {
  token: any;
}
const CustomPlanCard: React.FC<CustomPlanCardProps> = ({ token }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const items = [
    { label: "Monthly", value: "Monthly" },
    { label: "Yearly", value: "Yearly" },
  ];
  const [value, setValue] = useState({ label: "Monthly", value: "Monthly" });
  const [customQuery, setCustomQuery] = useState<any>({
    additional_requirement: null,
    noofenvelopes: null,
    noofuser: null,
    organization: null,
    subscriptiontype: value,
  });
  useEffect(() => {
    setCustomQuery((prev: any) => ({
      ...prev,
      subscriptiontype: value,
    }));
  }, [value]);
  const isDisabled = Object.values(customQuery).every(
    (o) => !isNull(o) && !isEmpty(o)
  );
  const handleSubmitQuery = () => {
    HttpService.post(apiEndpoints.submitEnquiry, {
      token: token,
      body: JSON.stringify({
        content: customQuery,
      }),
    }).then((res) => {
      //console.log("QUERY ", res);
      if (res) {
        setIsLoading(false);
        setQuerySubmitted(true);
      }
      if (res?.message) {
        setIsLoading(false);
        toast.show(res?.message, { type: "success" });
      }
    });
  };
  return (
    <View className="w-[80%] my-2 mx-5  max-h-max  border border-gray-300 rounded-xl  ">
      {querySubmitted ? (
        <View className="px-3 mx-2 w-full items-center justify-center h-56">
          <View className="bg-green-400 rounded-full my-3">
            <GetSvg name="tickIcon" classN="w-20 h-20" color="white" />
          </View>
          <Text className="text-2xl my-2">Submitted Your Enquiry </Text>
          <Text>We will get back to you soon! </Text>
        </View>
      ) : (
        <>
          <View className="px-3 mx-2 w-full">
            <View className="w-full my-1 mb-2  ">
              <Text className="text-black text-2xl my-2">{"Custom Plan "}</Text>
              <Text className="w-[90%] text-start">
                {"Fill your requirement to design a best custom plan. "}
              </Text>
            </View>
            <View className=" w-full ">
              <View className="my-1 w-full flex flex-row items-center justify-between ">
                <Text className=" mx-1 font-medium text-sm ">
                  No. of Users / Month{" "}
                </Text>
                <TextInput
                  onChangeText={(e) => {
                    setCustomQuery((prev: any) => ({
                      ...prev,
                      noofuser: e,
                    }));
                  }}
                  className="border text-xl border-gray-300 p-1  rounded-lg w-14 mx-2 h-8"
                  keyboardType="number-pad"
                />
              </View>
              <View className="my-1 w-full flex flex-row items-center justify-between ">
                <Text className=" mx-1 font-medium text-sm w-[70%] ">
                  No. of Envelopes / Month{" "}
                </Text>
                <TextInput
                  onChangeText={(e) => {
                    setCustomQuery((prev: any) => ({
                      ...prev,
                      noofenvelopes: e,
                    }));
                  }}
                  className="border text-xl border-gray-300 p-1   rounded-lg w-1/5 mx-2 h-8"
                  keyboardType="number-pad"
                />
              </View>
              <View className="my-1 w-full flex flex-row items-center justify-between ">
                <Text className=" mx-1 font-medium text-sm ">
                  No. of Organizations{" "}
                </Text>
                <TextInput
                  onChangeText={(e) => {
                    setCustomQuery((prev: any) => ({
                      ...prev,
                      organization: e,
                    }));
                  }}
                  className="border text-xl border-gray-300 p-1  rounded-lg w-14 mx-2 h-8"
                  keyboardType="number-pad"
                />
              </View>
              <View className="my-1 w-full flex flex-row items-center justify-between ">
                <Text className=" mx-1 font-medium text-sm ">
                  Subscription Type{" "}
                </Text>
                <DropDownPicker
                  style={{
                    width: 100,
                    position: "relative",
                    borderColor: "white",
                    minHeight: 10,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                  containerStyle={{
                    width: 100,
                  }}
                  listItemContainerStyle={{
                    borderColor: "white",
                    zIndex: 111,
                  }}
                  textStyle={{
                    fontSize: 12,
                  }}
                  open={isDropDownOpen}
                  items={items}
                  setOpen={() => {
                    setIsDropDownOpen(!isDropDownOpen);
                  }}
                  setValue={setValue}
                  value={value as any}
                  placeholder="Monthly "
                />
              </View>
              <View className="my-2 w-full -z-10  bg-white  ">
                <Text className=" mx-1 font-medium text-sm ">
                  Additional Requirement
                </Text>
                <TextInput
                  onChangeText={(e) => {
                    setCustomQuery((prev: any) => ({
                      ...prev,
                      additional_requirement: e,
                    }));
                  }}
                  textAlignVertical="top"
                  multiline={true}
                  placeholder="Enter any additional requirements"
                  className="border my-2 p-3 text-sm border-gray-300   rounded-lg w-[95%] h-20"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!isDisabled) {
                return null;
              } else {
                setIsLoading(true);
                handleSubmitQuery();
              }
            }}
            className={`w-64 h-8 mb-2  justify-center items-center rounded-lg mx-auto flex flex-row ${
              !isDisabled ? "bg-[#d1000099]" : "bg-[#d10000]"
            }`}
          >
            <Text className="text-sm text-white">Submit </Text>
            {isLoading ? (
              <ActivityIndicator
                className="mx-2"
                color={"white"}
                size="small"
              />
            ) : null}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CustomPlanCard;
