import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GetSvg from "../../utils/GetSvg";
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import CommonUtils from "../../utils/CommonUtils";
import EnvelopeController from "../../controllers/EnvelopeController";
import useAuth from "../../utils/auth";
import { isEmpty, isNull } from "lodash";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/atoms/Error";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
interface AddRecipientsProps {
  envelope: any;
  setEnvelope: any;
  setCurrentStep: any;
  setIsLoading: any;
}

const AddRecipients: React.FC<AddRecipientsProps> = ({
  envelope,
  setEnvelope,
  setCurrentStep,
  setIsLoading,
}) => {
  const options = [
    {
      name: "Need Sign",
      initial: "NS",
      value: "0",
    },
    {
      name: "Receive Copy",
      initial: "RC",
      value: "1",
    },
    {
      name: "Carbon Copy",
      initial: "CC",
      value: "2",
    },
  ];
  const optionList = [
    {
      label: "Need Sign",
      value: 1,
    },
    {
      label: "Carbon Copy",
      value: 2,
    },
    {
      label: "Receive Copy",
      value: 3,
    },
  ];

  const toast = useToast();
  const { token, auth } = useAuth();
  const [email, setEmail] = useState<any>(null);
  const envelopeId = envelope?.id;
  const envelopeRecipient = envelope?.recipients ?? [];
  const [errors, setErrors] = useState({
    error: "",
  });

  const [isChecked, setIsChecked] = useState(
    envelope?.self_sign === 1 ? true : false
  );
  const [selectedOption, setSelectedOption] = useState<any>(1);

  const handleUpdateSelfSign = (selfsignVal: any, type: any) => {
    console.log("selfsignVal", selfsignVal);
    HttpService.post(apiEndpoints.updateSelfSign, {
      token: token,
      body: JSON.stringify({
        envelope_id: envelope?.id,
        selfsign: selfsignVal,
        funType: type,
      }),
    })
      .then((res) => {
        console.log("RES", res);
        if (selfsignVal === 1) {
          if (res.status == true) {
            setIsChecked(true);
            toast.show("You have opted for Self-Sign", { type: "success" });
            setEnvelope((prev: any) => ({
              ...prev,
              self_sign: 1,
            }));
          }
        } else {
          setIsChecked(false);
        }
      })
      .catch((err) => {
        console.log("UPDATE SELF SIGN ERR", err);
      });
  };
  console.log("sdfghjklkjhg", envelope?.id);
  const handleAddRecipient = () => {
    if (isEmpty(email)) {
      setErrors({
        error: "Please enter recepients email",
      });
    }
    if (!isEmpty(email) && CommonUtils.ValidateEmail(email)) {
      setErrors({
        error: "",
      });
      const recipient = {
        email: email,
        name: email,
        operation: selectedOption,
        level: 1,
        action: "insert",
      };
      setIsLoading(true);
      EnvelopeController.manageRecipient(
        envelopeId,
        recipient,
        token ?? ""
      ).then((response) => {
        if (response) {
          const data = CryptoHandler.response(response, token ?? "");
          setEnvelope(data);
          setEmail(null);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
      setErrors({
        error: "Please enter valid email",
      });
    }
  };

  const handleDeleteRecipient = (selected_recipient: any) => {
    if (selected_recipient) {
      const recipient = {
        id: selected_recipient?.id,
        operation: selected_recipient?.operation,
        level: selected_recipient?.level,
        action: "delete",
      };
      setIsLoading && setIsLoading(true);
      EnvelopeController.manageRecipient(
        envelopeId,
        recipient,
        token ?? ""
      ).then((response) => {
        console.log(response);
        if (response) {
          const data = CryptoHandler.response(response, token ?? "");
          setEnvelope(data);
          setIsLoading(false);
        }
      });
    } else {
      toast.show("Invalid Recipient", { type: "error" });
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (envelopeRecipient?.length) {
      const recipientList = envelopeRecipient?.filter(
        (en: any) => en?.operation === "1"
      );
      if (recipientList?.length > 0) {
        setCurrentStep(2);
      } else {
        toast.show("No Recipient Found", { type: "error" });
      }
    } else {
      toast.show("No Recipient Found", { type: "error" });
    }
  };

  const handleSelfSign = (checked: boolean) => {
    console.log("checked", checked);
    if (checked) {
      setIsLoading(true);
      const users = envelopeRecipient?.filter((i: any) => {
        if (i?.user?.id !== auth?.user?.id) {
          return i;
        } else if (i?.operation !== "3" && i?.operation !== "1") {
          return i;
        }
      });
      users?.map((user: any) => {
        return handleDeleteRecipient(user);
      });
      console.log("USER LIST:", users);

      const isSelf = envelopeRecipient?.filter(
        (i: any) => i?.user?.id === auth?.user?.id && i?.operation === "1"
      );

      console.log("SELF SIGN:", isSelf);
      handleUpdateSelfSign(1, "selfSignChecked");
      if (isEmpty(isSelf) || isNull(isSelf)) {
        const recipient = {
          email: auth?.user?.email,
          name: auth?.user?.name,
          operation: "1",
          level: 1,
          action: "insert",
        };
        EnvelopeController.manageRecipient(envelopeId, recipient, token ?? "")
          .then((response) => {
            if (response) {
              const data = CryptoHandler.response(response, token ?? "");
              setEmail(null);
              setIsLoading(false);
              setEnvelope(data);
            }
          })
          .catch((e) => {
            console.log("ERROR:", e);
            setIsLoading(false);
          });
      }
      setIsLoading(false);
    } else {
      handleUpdateSelfSign(0, "selfSignUnChecked");
    }
  };

  // useEffect(() => {
  //   console.log("envelope?.self_sign", envelope?.self_sign);
  //   if (envelope?.self_sign === 0) {
  //     console.log("envelope?.self_sign", envelope?.self_sign);
  //     setIsChecked(false);
  //   } else if (isNull(envelope?.self_sign)) {
  //     console.log("envelope?.self_sign", envelope?.self_sign);
  //     setIsChecked(false);
  //   } else {
  //     console.log("envelope?.self_sign", envelope?.self_sign);
  //     setIsChecked(true);
  //   }
  // }, [envelope?.self_sign]);

  console.log("envelope?.self_sign", envelope?.self_sign);
  return (
    <SafeAreaView className="w-full h-full bg-white p-2 flex flex-col justify-between max-w-sm mx-auto">
      <View className="h-[90%] bg-white w-full justify-start items-center">
        <ScrollView
          style={{
            flexGrow: 0,
            maxHeight: "70%",
          }}
          className=""
        >
          {envelopeRecipient &&
            envelopeRecipient?.map((recipient: any, i: any) => {
              return (
                <View
                  key={i}
                  className=" border rounded-xl border-gray-400 w-full h-14 my-1 flex flex-row"
                >
                  <View className=" h-full w-4/6 justify-center px-4">
                    <Text
                      className="text-sm font-semibold text-black capitalize"
                      numberOfLines={1}
                    >
                      {recipient?.user?.name}
                    </Text>
                    <Text
                      className="text-xs text-gray-500 font-normal "
                      numberOfLines={1}
                    >
                      {recipient?.user?.email}
                    </Text>
                  </View>
                  <View className=" h-full w-1/6 justify-center items-center">
                    <View className="justify-center items-center bg-slate-800 py-0.5 px-2 rounded-xl">
                      <Text className="text-white font-semibold text-xs leading-5">
                        {recipient?.operation === "1"
                          ? "NS"
                          : recipient?.operation === "2"
                          ? "CC"
                          : "RC"}
                      </Text>
                    </View>
                  </View>
                  <View className=" h-full w-1/6 justify-center items-center">
                    {envelope?.user?.id === recipient?.user?.id &&
                    recipient?.operation === "3" ? (
                      <BouncyCheckbox
                        disableText={true}
                        className="m-auto"
                        size={20}
                        iconStyle={{
                          borderColor: isChecked ? "#d10000" : "gray",
                        }}
                        innerIconStyle={{
                          borderWidth: 2,
                          borderColor: isChecked ? "#d10000" : "gray",
                          backgroundColor: isChecked ? "#d10000" : "gray",
                        }}
                        iconComponent={
                          <GetSvg
                            name="tickIcon"
                            classN="w-4 h-4"
                            color="white"
                            pathStrokeWidth={3}
                          />
                        }
                        onPress={(checked: boolean) => {
                          setIsChecked(!isChecked);
                          handleSelfSign(!isChecked);
                        }}
                        isChecked={isChecked}
                      />
                    ) : (
                      <GetSvg
                        name="deleteIcon"
                        color="#d10000"
                        callBack={() => handleDeleteRecipient(recipient)}
                      />
                    )}
                  </View>
                </View>
              );
            })}
        </ScrollView>
        {isChecked ? null : (
          <View
            nativeID="nativeAddRecipient"
            style={{
              borderRadius: 12,
              width: "100%",
              borderStyle: "dashed",
              borderWidth: 1.5,
              borderColor: "rgba(161,155,183,0.8)",
            }}
            className={`rounded-xl w-full h-32 my-3 flex flex-col justify-start items-center px-2 ${
              errors?.error ? "h-32" : "h-28"
            }`}
          >
            <View className="border-gray-400 border-solid border rounded-lg text-xl p-2 px-3 my-2 flex flex-row justify-between">
              <TextInput
                onChangeText={(text) => {
                  setErrors({ error: "" });
                  setEmail(text);
                }}
                value={email}
                className="text-base w-11/12"
              ></TextInput>
              <GetSvg name="userIcon" color="grey" />
            </View>
            {errors?.error ? <Error text={errors?.error} /> : null}
            <View className="w-full h-1/3 flex flex-row">
              <View className="w-1/2 justify-center items-center flex flex-row">
                {/* <Text className="text-base font-bold">Receive a Copy</Text> */}
                <GetSvg
                  name="scrollUpDownIcon"
                  strokeWidth={0.0001}
                  color="black"
                />
                <DynamicallySelectedPicker
                  items={optionList}
                  onScroll={({ index }) => {
                    console.log(index);
                    setSelectedOption(optionList?.[index].value);
                  }}
                  initialSelectedIndex={0}
                  transparentItemRows={0}
                  height={30}
                  width={100}
                  selectedItemBorderColor="transparent"
                />
              </View>
              <View className="w-1/2 justify-center items-center">
                <TouchableOpacity
                  onPress={() => handleAddRecipient()}
                  className="bg-slate-800 px-5 py-1 rounded-3xl justify-center items-center"
                >
                  <Text className="text-white text-sm font-medium">
                    Add Recipient{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View className=" h-full w-4/6 justify-center px-4">
            <Text
              className="text-xl font-extrabold text-black"
              numberOfLines={1}
            >
              Mudassir Khan
            </Text>
            <Text className="text-gray-500 font-bold" numberOfLines={1}>
              khanmudassir124@gmail.com
            </Text>
          </View>
          <View className=" h-full w-1/6 justify-center items-center">
            <View className="justify-center items-center bg-slate-800 py-1 px-2 rounded-xl">
              <Text className="text-white font-black leading-4">CC</Text>
            </View>
          </View>
          <View className=" h-full w-1/6 justify-center items-center">
            <GetSvg name="deleteIcon" color="#d10000" />
          </View> */}
          </View>
        )}
      </View>
      <View className=" w-full h-[10%] flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => {
            setCurrentStep(0);
          }}
          className=" bg-slate-800  rounded-full p-1.5 px-4"
        >
          <Text className="text-white text-xs font-extrabold">Prev </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNext()}
          className=" bg-[#d10000] rounded-full p-1.5 px-4"
        >
          <Text className="text-white  text-xs font-extrabold">Next </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AddRecipients;
