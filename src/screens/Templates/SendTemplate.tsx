import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";

import GetSvg from "../../utils/GetSvg";
import DateTimePicker from "@react-native-community/datetimepicker";
import utc from "dayjs/plugin/utc.js";
import Error from "../../components/atoms/Error";
import { isEmpty, times } from "lodash";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setEnvelopeStep, setIsLoading } from "../../redux/reducers/uiSlice";
import {
  useIsLoading,
  useRecipients,
  useToken,
  useUser,
} from "../../utils/useReduxUtil";
import WFullInputField from "../../components/atoms/WFullInputField";
import routes from "../../constants/routes";
import TemplateSendController from "../../controllers/TemplateSendController";
import ApiInstance from "../../services/ApiInstance";
import apiEndpoint from "../../constants/apiEndpoints";
import handleResponse from "../../services/handleResponse";
import {
  setTemplate,
  setTemplateFieldSet,
} from "../../redux/reducers/TemplateSlice";
import { ApplicationState } from "../../redux/store";
dayjs.extend(utc);
interface SendTemplateProps {
  navigation: any;
  route: any;
}
const SendTemplate: React.FC<SendTemplateProps> = ({ navigation, route }) => {
  const { templateId } = route?.params;
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<any>(null);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState<any>(
    "Please sign this document asap."
  );
  const [message, setMessage] = useState<any>(
    "Hi can you please review and sign this document thank you."
  );
  const toast = useToast();
  const [errors, setErrors] = useState({
    dateError: "",
    subjectError: "",
    messageError: "",
  });
  const user = useUser();
  const token = useToken();
  const [payload, setPayload] = useState<any>({
    subject: "Please sign this document asap.",
    message: "Hi can you please review and sign this document thank you.",
    expire_at: null,
    reciever_emails: null,
    save_as_template: false,
    sign_by_order: false,
  });
  const handleSendTemplate = () => {
    dispatch(setIsLoading(true));
    const re = payload?.reciever_emails?.split(",");
    const recieverEmails: any = [];
    re?.map((s: any) => {
      if (
        s &&
        s.trim() !== "" &&
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          s.trim()
        )
      ) {
        recieverEmails.push(s.trim());
      }
    });

    const data = {
      ...payload,
      reciever_emails: recieverEmails,
      field_sets: fieldSets,
    };
    console.log("SEND TEMLATE", data);
    TemplateSendController.TemplateSendController(templateId, data, token).then(
      (res) => {
        console.log("RESKNKN", res);
        if (!res?.success) {
          dispatch(setIsLoading(false));
          toast.show(res?.message, { type: "error" });
        } else {
          dispatch(setIsLoading(false));
          toast.show(res?.message, { type: "success" });
          navigation.navigate(routes.dashboard);
        }
      }
    );
  };
  // useEffect(() => {
  //   dispatch(setIsLoading(false));
  // }, []);
  const isloading = useIsLoading();
  const recipients = useSelector(
    (state: ApplicationState) => state?.template?.templateFieldSet
  );
  const [fieldSets, setFieldsSets] = useState(recipients);
  const handleGetTemplate = () => {
    ApiInstance.get(apiEndpoint.templates.getTemplate(templateId))
      .then(async (res) => {
        const data = await handleResponse(res as any);
        if (data) {
          dispatch(setTemplate(data));
          dispatch(setTemplateFieldSet(data?.template_field_sets));
          setFieldsSets(data?.template_field_sets);
        } else {
        }
      })
      .catch((err) => {
        console.log("GET TEMPLATE ERR", err);
      });
  };
  useEffect(() => {
    if (templateId) {
      handleGetTemplate();
    }
  }, [templateId]);
  const handleFieldSetChange = (
    id: number,
    text: string,
    type: "EMAIL" | "NAME" = "EMAIL"
  ) => {
    const set = fieldSets?.map((s: any) => {
      if (s?.id === id) {
        if (type === "EMAIL") {
          return s?.email?.split("@")?.[0] === s?.user_name
            ? { ...s, email: text, user_name: text?.split("@")?.[0] }
            : { ...s, email: text };
        } else {
          return { ...s, user_name: text };
        }
      }
      return s;
    });
    setFieldsSets(set);
  };
  return (
    <React.Fragment>
      <SafeAreaView className="w-full h-full bg-white p-2 flex flex-col justify-between max-w-sm mx-auto">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="h-[90%] bg-white w-full flex flex-col  justify-start items-center">
            <Text className="w-full my-3 text-start font-semibold px-1 text-sm">
              Signers
            </Text>
            {fieldSets ? (
              <View className="min-h-16 h-[25%]    max-h-56 flex justify-center my-2 py-2 items-center border border-gray-300 rounded-xl">
                <ScrollView
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                  contentInsetAdjustmentBehavior="always"
                  className="px-2 w-full "
                >
                  {fieldSets?.map((t: any) => {
                    return (
                      <View key={t.id} className="w-full rounded-xl  ">
                        <View className="flex flex-col w-full justify-center ">
                          {/* <Text className="text-[10px]">Enter signer email</Text> */}
                          <WFullInputField
                            placeholder={`Enter ${t?.name} email`}
                            className="text-xs h-5 w-full"
                            textContentType="emailAddress"
                            onChangeText={(e) => {
                              handleFieldSetChange(t?.id, e, "EMAIL");
                            }}
                            value={t?.email}
                          />
                        </View>
                        <View className="flex flex-col justify-center ">
                          {/* <Text className="text-[10px]">Enter signer name</Text> */}
                          <WFullInputField
                            placeholder={`Enter ${t?.name} name`}
                            className="text-xs h-5 w-full"
                            textContentType="name"
                            onChangeText={(e) => {
                              handleFieldSetChange(t?.id, e, "NAME");
                            }}
                            value={t?.user_name}
                          />
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : null}
            <Text className="w-full mt-3 text-start font-semibold px-1 text-sm">
              Send a copy to
            </Text>

            <View className="w-full h-14 flex flex-row  ">
              <WFullInputField
                className="h-full w-full text-xs"
                onChangeText={(e: any) => {
                  setPayload((prev: any) => ({
                    ...prev,
                    reciever_emails: e,
                  }));
                }}
                placeholder="Enter receiver email and use comma to separate multiple emails "
              />
            </View>

            <Text className="w-full text-start font-semibold px-1 mt-2 text-sm">
              Envelope Expiry :
            </Text>
            <View
              // style={{
              //   borderRadius: 8,
              //   width: "100%",
              //   borderStyle: "dashed",
              //   borderWidth: 1.5,
              //   borderColor: "rgba(161,155,183,0.8)",
              // }}
              className={`p-1 w-full flex flex-row border border-gray-300 rounded-xl ${
                !isEmpty(errors?.dateError) ? "mt-2" : "my-2"
              }`}
            >
              <Pressable
                onPress={() => {
                  setshowDatePicker(true);
                }}
                className="w-11/12  flex flex-row items-center "
              >
                <Text
                  //placeholder="Select Date & Time"
                  //editable={false}
                  style={{
                    color: "black",
                  }}
                  className="px-1 place-items-center "
                  //value={dayjs(dateValue).format("DD/MM/YYYY hh:mm A") ?? null}
                  //autoFocus={true}
                >
                  {dateValue
                    ? dayjs(dateValue).format("DD/MM/YYYY hh:mm A")
                    : "dd-mm-yyyy"}
                </Text>
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
                    if (e.type === "set") {
                      console.log("selectedDate", selectedDate);
                      if (selectedDate) {
                        setPayload((prev: any) => ({
                          ...prev,
                          expire_at: selectedDate,
                        }));
                        setDateValue(selectedDate);
                        setshowDatePicker(false);
                      }
                    }
                  }}
                />
              ) : null}
            </View>
            {!isEmpty(errors?.dateError) ? (
              <Error text={errors?.dateError} classN="mb-1" />
            ) : null}

            <Text className="w-full text-start font-semibold px-1 mt-2 text-sm">
              Subject :
            </Text>
            <View
              // style={{
              //   borderRadius: 8,
              //   width: "100%",
              //   borderStyle: "dashed",
              //   borderWidth: 1.5,
              //   borderColor: "rgba(161,155,183,0.8)",
              // }}
              className={`p-1 border w-full border-gray-300 rounded-xl ${
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
            <Text className="w-full text-start font-semibold px-1 mt-2 text-sm">
              Message to Recipients :
            </Text>
            <View
              style={{
                // borderRadius: 12,
                // width: "100%",
                // borderStyle: "dashed",
                // borderWidth: 1.5,
                // borderColor: "rgba(161,155,183,0.8)",
                height: 100,
              }}
              className={`p-1 w-full  border border-gray-300 rounded-xl ${
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
          </View>
        </ScrollView>
        <View className=" w-full flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.dashboard);
            }}
            className="bg-slate-800  rounded-full p-1.5 px-4"
          >
            <Text className="text-white  text-xs font-extrabold">Back </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const isDataFilled = fieldSets?.every(
                (f: any) => !isEmpty(f?.email)
              );
              console.log("fieldSets", isDataFilled);
              if (isDataFilled) {
                handleSendTemplate();
              } else {
                toast.show("Please enter recipient email and name ", {
                  type: "error",
                });
              }
            }}
            className="bg-[#d10000] rounded-full p-1.5 px-4"
          >
            <Text className="text-white  text-xs font-extrabold">
              Finish & Send{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isloading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
    </React.Fragment>
  );
};
export default SendTemplate;
