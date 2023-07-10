import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import dayjs from "dayjs";

import GetSvg from "../../utils/GetSvg";
import DateTimePicker from "@react-native-community/datetimepicker";
import utc from "dayjs/plugin/utc.js";
import Error from "../../components/atoms/Error";
import { isEmpty, times } from "lodash";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import {
  setEnvelopeStep,
  setIsLoading,
  setLoadingModal,
  setModalType,
} from "../../redux/reducers/uiSlice";
import EnvelopeService from "../../services/EnvelopeService";
import {
  useEnvelope,
  useRecipients,
  useToken,
  useUser,
} from "../../utils/useReduxUtil";
import AuthService from "../../services/AuthService";
import { setUser } from "../../redux/reducers/userSlice";
import { setSelecteDocument } from "../../redux/reducers/documentsSlice";
import { setAddedFields, setFixedFields } from "../../redux/reducers/PdfSlice";
import {
  setRecipients,
  setselectedRecipients,
} from "../../redux/reducers/RecipientSlice";
import { setCurrentTab } from "../../redux/reducers/ManageSlice";
import { setEnvelope } from "../../redux/reducers/envelopeSlice";
import WFullInputField from "../../components/atoms/WFullInputField";
import routes from "../../constants/routes";
import HttpService from "../../controllers/HttpService";
import apiEndpoint from "../../constants/apiEndpoints";
import EnvelopeController from "../../controllers/EnvelopeController";
dayjs.extend(utc);
interface SendEnvelopeProps {
  navigation: any;
}
const SendEnvelope: React.FC<SendEnvelopeProps> = ({ navigation }) => {
  const envelope = useEnvelope();
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<any>(null);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState<any>(
    "Please sign this document asap."
  );
  const [message, setMessage] = useState<any>(
    "Hi can you please review and sign this document thank you."
  );
  const { recipients } = useRecipients();
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
  });
  const handleSendEnvelope = () => {
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
    };

    EnvelopeController.manageRecipient(envelope?.id, data, token).then(
      (res) => {
        console.log("RESKNKN", res);
        if (!res?.success) {
          dispatch(setIsLoading(false));
          toast.show(res?.message, { type: "error" });
        } else {
          dispatch(setIsLoading(false));
          toast.show(res?.message, { type: "success" });
          if (user?.user_type === "MEMBER") {
            AuthService.handleGetProfile((data) => {
              dispatch(setUser(data));
            });
          }
          if (envelope?.self_sign) {
            dispatch(setEnvelope(null));
            dispatch(setSelecteDocument(null));
            dispatch(setFixedFields(null));
            dispatch(setRecipients(null));
            dispatch(setModalType(""));
            dispatch(setLoadingModal(false));
            dispatch(setCurrentTab("inbox"));
            dispatch(setselectedRecipients(null));
            dispatch(setEnvelopeStep(0));
            dispatch(setAddedFields(null));
            navigation.navigate(routes.dashboard);
          } else {
            dispatch(setEnvelope(null));
            dispatch(setSelecteDocument(null));
            dispatch(setFixedFields(null));
            dispatch(setRecipients(null));
            dispatch(setModalType(""));
            dispatch(setLoadingModal(false));
            dispatch(setCurrentTab("inbox"));
            dispatch(setselectedRecipients(null));
            dispatch(setEnvelopeStep(0));
            navigation.navigate(routes.dashboard);
          }
        }
      }
    );
  };
  // useEffect(() => {
  //   dispatch(setIsLoading(false));
  // }, []);
  return (
    <SafeAreaView className="w-full h-full bg-white p-2 flex flex-col justify-between max-w-sm mx-auto">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-[90%] bg-white w-full flex flex-col  justify-start items-center">
          <Text className="w-full text-start font-semibold px-1 text-sm">
            Recipients :
          </Text>
          <View className="min-h-16 h-24  max-h-56 flex justify-center my-2 py-2 items-center border border-gray-300 rounded-xl">
            <ScrollView nestedScrollEnabled={true} className="px-2  ">
              {recipients?.map((t) => {
                return (
                  <View className="w-full   rounded-xl my-1 p-2 border border-gray-300">
                    <View className="w-full flex flex-row  ">
                      <Text
                        className="w-[40%] px-2 text-gray-500"
                        numberOfLines={1}
                      >
                        {t?.user?.name}
                      </Text>
                      <Text
                        className="w-[60%]  text-gray-500 text-end "
                        numberOfLines={1}
                      >
                        {t?.user?.email}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <Text className="w-full text-start font-semibold px-1 text-sm">
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
            // setCurrentStep(2);
            dispatch(setEnvelopeStep(2));
          }}
          className="bg-slate-800  rounded-full p-1.5 px-4"
        >
          <Text className="text-white  text-xs font-extrabold">Back </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(setIsLoading(true));
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
