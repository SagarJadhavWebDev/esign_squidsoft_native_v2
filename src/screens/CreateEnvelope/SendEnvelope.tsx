import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";

import WFullInputField from "../../components/atoms/WFullInputField";
import ApiConfig from "../../constants/ApiConfig";
import useAuth from "../../utils/auth";
import GetSvg from "../../utils/GetSvg";
import DateTimePicker from "@react-native-community/datetimepicker";
import utc from "dayjs/plugin/utc.js";
import Error from "../../components/atoms/Error";
import { isEmpty, isNull } from "lodash";
import HttpService from "../../controllers/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import routes from "../../constants/routes";
import { useToast } from "react-native-toast-notifications";
dayjs.extend(utc);
interface SendEnvelopeProps {
  envelope: any;
  setEnvelope: any;
  setCurrentStep: any;
  navigation: any;
  setIsLoading: any;
}
const SendEnvelope: React.FC<SendEnvelopeProps> = ({
  envelope,
  setEnvelope,
  setCurrentStep,
  navigation,
  setIsLoading,
}) => {
  const { auth, token } = useAuth();
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<any>(
    dayjs(new Date()).add(1, "day")
  );
  const [subject, setSubject] = useState<any>("Squidsoft eSign Request");
  const [message, setMessage] = useState<any>(
    "Please eSign in the following documents"
  );
  const documents = envelope?.documents;
  const recipients = envelope?.recipients;
  const recipientsTo = recipients?.filter((e: any) => e.operation == 1);
  const recipientsCC = recipients?.filter((e: any) => e.operation == 2);
  const recipientsRC = recipients?.filter((e: any) => e.operation == 3);
  const toast = useToast();
  const [errors, setErrors] = useState({
    dateError: "",
    subjectError: "",
    messageError: "",
  });

  const handleSendEnvelope = () => {
    let errorFlag = false;
    if (isEmpty(subject)) {
      errorFlag = true;
      setErrors((prev) => ({
        ...prev,
        subjectError: "Subject cannot be empty...",
      }));
    } else {
      setErrors((prev) => ({ ...prev, subjectError: "" }));
    }
    if (isEmpty(message)) {
      errorFlag = true;
      setErrors((prev) => ({
        ...prev,
        messageError: "Message cannot be empty...",
      }));
    } else {
      setErrors((prev) => ({ ...prev, messageError: "" }));
    }
    if (isNull(dateValue)) {
      errorFlag = true;
      setErrors((prev) => ({ ...prev, dateError: "Date cannot be empty..." }));
    } else {
      setErrors((prev) => ({ ...prev, dateError: "" }));
    }

    if (!errorFlag) {
      const payload = {
        body: message,
        expire_at: dateValue,
        subject: subject,
      };
      setIsLoading(true);

      HttpService.put(apiEndpoints.sendEnvelope(envelope?.id), {
        body: JSON.stringify(payload),
        token,
      })
        .then((response) => {
          console.log("RESPONSE:", response);
          if (response?.message) {
            toast.show(response?.message, { type: "error" });
            setIsLoading(false);
          } else {
            setIsLoading(false);
            navigation.navigate(routes.dashboard, { update: Date.now() });
            toast.show("envelope sent successfully", { type: "success" });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("SEND ENEVLOPE ERR", err);
        });
    }
  };
  return (
    <SafeAreaView className="w-full h-full bg-white p-2 flex flex-col justify-between max-w-sm mx-auto">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-[90%] bg-white w-full flex flex-col  justify-start items-center">
          {/* ======= Documents Section Starts ======= */}

          <Text className="w-full text-start font-semibold px-1 text-sm">
            Documents :
          </Text>
          <View className="flex flex-row w-full flex-wrap my-1 mb-3 ">
            {documents?.map((d: any) => {
              return (
                <View
                  key={d?.name}
                  className="justify-center max-w-[50%] items-center"
                >
                  <View className=" border rounded-full max-w-[95%]  my-1 bg-black flex flex-row justify-start items-center p-1 px-3">
                    <View className="items-center justify-center">
                      <GetSvg
                        name="documentIcon"
                        classN="w-4 h-4"
                        color="white"
                        pathStrokeWidth={1.8}
                      />
                    </View>
                    <View className="justify-center px-2 ">
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        className="text-[10px] text-white font-semibold"
                      >
                        {d?.name}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* ======= Documents Section Ends ======= */}

          {/* ======= Recipient Section Starts ======= */}
          <Text className="w-full text-start font-semibold px-1 text-sm">
            
            Recipients :
          </Text>

          {/* ========= TO ======== */}

          {recipientsTo?.length ? (
            <View className="w-full  my-1 mt-2 px-2">
              <View className="w-full flex flex-row">
                <Text className="w-[10%]">To :</Text>

                <ScrollView
                  className="w-[90%] max-h-24 border-0.5 rounded-xl px-2 pt-2"
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View className="max-w-[90%]  flex flex-row gap-2 flex-wrap">
                    {recipientsTo?.map((r: any) => {
                      return (
                        <View
                          key={r?.id}
                          className=" border max-w-[100%]  border-gray-400 flex flex-row justify-start  p-1 rounded-full px-2"
                        >
                          <View className="w-5 h-5 mr-2">
                            <Image
                              className="w-full h-full rounded-full"
                              resizeMode="contain"
                              source={{
                                uri:
                                  ApiConfig.FILES_URL +
                                  "profile-pictures/" +
                                  r?.user?.id +
                                  ".jpg?" +
                                  Date.now(),
                              }}
                            />
                          </View>
                          <Text
                            numberOfLines={1}
                            className="text-sm max-w-[90%]"
                          >
                            {r?.user?.email}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : null}

          {/* ========= CC ======== */}

          {recipientsCC?.length ? (
            <View className="w-full my-1 mb-3 px-2">
              <View className="w-full flex flex-row">
                <Text className="w-[10%]">Cc :</Text>

                <ScrollView
                  className="w-[90%] max-h-24 border-0.5 rounded-xl px-2 pt-2"
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View className="max-w-[90%]  flex flex-row gap-2 flex-wrap">
                    {recipientsCC?.map((r: any) => {
                      return (
                        <View
                          key={r?.id}
                          className=" border max-w-[100%]  border-gray-400 flex flex-row justify-start  p-1 rounded-full px-2"
                        >
                          <View className="w-5 h-5 mr-2">
                            <Image
                              className="w-full h-full rounded-full"
                              resizeMode="contain"
                              source={{
                                uri:
                                  ApiConfig.FILES_URL +
                                  "profile-pictures/" +
                                  r?.user?.id +
                                  ".jpg?" +
                                  Date.now(),
                              }}
                            />
                          </View>
                          <Text
                            numberOfLines={1}
                            className="text-sm max-w-[90%]"
                          >
                            {r?.user?.email}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : null}

          {/* ========= RC ======== */}

          {recipientsRC?.length ? (
            <View className="w-full my-2 px-2">
              <View className="w-full flex flex-row">
                <Text className="w-[10%]">Rc :</Text>

                <ScrollView
                  className="w-[90%] max-h-24 border-0.5 rounded-xl px-2 pt-2"
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View className="max-w-[90%]  flex flex-row gap-2 flex-wrap">
                    {recipientsRC?.map((r: any) => {
                      return (
                        <View
                          key={r?.id}
                          className=" border max-w-[100%]  border-gray-400 flex flex-row justify-start  p-1 rounded-full px-2"
                        >
                          <View className="w-5 h-5 mr-2">
                            <Image
                              className="w-full h-full rounded-full"
                              resizeMode="contain"
                              source={{
                                uri:
                                  ApiConfig.FILES_URL +
                                  "profile-pictures/" +
                                  r?.user?.id +
                                  ".jpg?" +
                                  Date.now(),
                              }}
                            />
                          </View>
                          <Text
                            numberOfLines={1}
                            className="text-sm max-w-[90%]"
                          >
                            {r?.user?.email}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : null}

          {/* ======= Recipient Section Ends ======= */}

          {/* ======= DatePicker Section Starts ======= */}

          <Text className="w-full text-start font-semibold px-1 mt-2 text-sm">
            Envelope Expiry :
          </Text>
          <View
            style={{
              borderRadius: 8,
              width: "100%",
              borderStyle: "dashed",
              borderWidth: 1.5,
              borderColor: "rgba(161,155,183,0.8)",
            }}
            className={`p-1 flex flex-row ${
              !isEmpty(errors?.dateError) ? "mt-2" : "my-2"
            }`}
          >
            <Pressable
              onPress={() => {
                setshowDatePicker(true);
              }}
              className="w-11/12 "
            >
              <TextInput
                placeholder="Select Date & Time"
                editable={false}
                style={{
                  color: "black",
                }}
                className="px-1"
                value={dayjs(dateValue).format("DD/MM/YYYY , hh:mm a")}
                autoFocus={true}
              ></TextInput>
            </Pressable>
            <Pressable
              onPress={() => {
                setshowDatePicker(true);
              }}
              className="w-[9%]"
            >
              <GetSvg name="dateIcon" color="grey" pathStrokeWidth={0.5} />
            </Pressable>
            {showDatePicker ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={"date"}
                is24Hour={false}
                onChange={(e, selectedDate) => {
                  if (
                    e?.type === "dismissed" ||
                    e.type === "set" ||
                    e.type === "neutralButtonPressed"
                  ) {
                    selectedDate && setDateValue(selectedDate);
                    setshowDatePicker(false);
                  }
                }}
              />
            ) : null}
          </View>
          {!isEmpty(errors?.dateError) ? (
            <Error text={errors?.dateError} classN="mb-1" />
          ) : null}

          {/* ======= DatePicker Section Starts ======= */}

          {/* ======= Message to Recipients Section Starts ======= */}

          <Text className="w-full text-start font-semibold px-1 mt-2 text-sm">
            Message to Recipients :
          </Text>
          <View
            style={{
              borderRadius: 8,
              width: "100%",
              borderStyle: "dashed",
              borderWidth: 1.5,
              borderColor: "rgba(161,155,183,0.8)",
            }}
            className={`p-1 ${
              !isEmpty(errors?.subjectError) ? "mt-2" : "my-2"
            }`}
          >
            <TextInput
              onChangeText={setSubject}
              value={subject}
              numberOfLines={1}
              placeholder="Enter your email subject"
              className=" w-full   px-1"
            ></TextInput>
          </View>
          {!isEmpty(errors?.subjectError) ? (
            <Error text={errors?.subjectError} classN="mb-1" />
          ) : null}
          <View
            style={{
              borderRadius: 12,
              width: "100%",
              borderStyle: "dashed",
              borderWidth: 1.5,
              borderColor: "rgba(161,155,183,0.8)",
              height: 100,
            }}
            className={`p-1 ${
              !isEmpty(errors?.messageError) ? "mt-2" : "my-2"
            }`}
          >
            <TextInput
              onChangeText={setMessage}
              value={message}
              style={{
                textAlignVertical: "top",
              }}
              numberOfLines={4}
              placeholder="Enter your email message"
              multiline={true}
              className=" w-full h-full p-1"
            ></TextInput>
          </View>
          {!isEmpty(errors?.messageError) ? (
            <Error text={errors?.messageError} classN="mb-1" />
          ) : null}
          {/* ======= Message to Recipients Section Ends ======= */}
        </View>
      </ScrollView>
      <View className=" w-full flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => {
            setCurrentStep(2);
          }}
          className="bg-slate-800  rounded-full p-1.5 px-4"
        >
          <Text className="text-white  text-xs font-extrabold">Back </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // if (isNull(dateValue)) {
            //   setshowDatePicker(true);
            // } else if (dateValue <= new Date()) {
            //   toast.show("please select future date", { type: "error" });
            // } else {
            //   // handleSendEnvelope();
            // }
            handleSendEnvelope();
          }}
          className="bg-[#d10000] rounded-full p-1.5 px-4"
        >
          <Text className="text-white  text-xs font-extrabold">Send </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SendEnvelope;
