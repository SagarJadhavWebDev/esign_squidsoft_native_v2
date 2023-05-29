import React, { useState } from "react";
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
import { isEmpty } from "lodash";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import {
  setEnvelopeStep,
  setLoadingModal,
  setModalType,
} from "../../redux/reducers/uiSlice";
import EnvelopeService from "../../services/EnvelopeService";
import { useEnvelope, useUser } from "../../utils/useReduxUtil";
import AuthService from "../../services/AuthService";
import { setUser } from "../../redux/reducers/userSlice";
import { setSelecteDocument } from "../../redux/reducers/documentsSlice";
import { setFixedFields } from "../../redux/reducers/PdfSlice";
import {
  setRecipients,
  setselectedRecipients,
} from "../../redux/reducers/RecipientSlice";
import { setCurrentTab } from "../../redux/reducers/ManageSlice";
import { setEnvelope } from "../../redux/reducers/envelopeSlice";
dayjs.extend(utc);
interface SendEnvelopeProps {
  navigation: any;
}
const SendEnvelope: React.FC<SendEnvelopeProps> = ({ navigation }) => {
  const envelope = useEnvelope();
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<any>(
    dayjs(new Date()).add(1, "day")
  );
  const dispatch = useDispatch();
  const [subject, setSubject] = useState<any>("Squidsoft eSign Request");
  const [message, setMessage] = useState<any>(
    "Please eSign in the following documents"
  );

  const toast = useToast();
  const [errors, setErrors] = useState({
    dateError: "",
    subjectError: "",
    messageError: "",
  });
  const user = useUser();

  const [payload, setPayload] = useState({
    subject: "Please sign this document asap.",
    message: "Hi can you please review and sign this document thank you.",
    expire_at: null,
    reciever_emails: null,
    save_as_template: false,
  });
  const handleSendEnvelope = () => {
    dispatch(setModalType("Sending Envelope"));
    dispatch(setLoadingModal(true));
    // const re = payload?.reciever_emails?.split(",");
    const recieverEmails: any[] = [];

    console.log("recieverEmails", envelope?.id, payload);
    EnvelopeService.handleSendEnvelope(
      envelope?.id,
      payload?.expire_at
        ? { ...payload, reciever_emails: recieverEmails }
        : {
            ...payload,
            reciever_emails: recieverEmails,
            expire_at: payload?.expire_at
              ? dayjs(payload?.expire_at).utc(true).add(1, "day").format()
              : null,
          },
      (data) => {
        if (data) {
          if (user?.user_type === "MEMBER") {
            AuthService.handleGetProfile((data) => {
              dispatch(setUser(data));
            });
          }
          if (envelope?.self_sign) {
            //setDownloadData(data);
            // dispatch(setshowDownloadEnvelopeModal(true));
            // dispatch(setEnvelope(null));
            // dispatch(setSelecteDocument(null));
            // dispatch(setFixedFields(null));
            // dispatch(setRecipients(null));
            // dispatch(setModalType(""));
            // dispatch(setLoadingModal(false));
            // dispatch(setCurrentTab("inbox"));
            // dispatch(setselectedRecipients(null));
          } else {
            // dispatch(setshowDownloadEnvelopeModal(true));
            dispatch(setEnvelope(null));
            dispatch(setSelecteDocument(null));
            dispatch(setFixedFields(null));
            dispatch(setRecipients(null));
            dispatch(setModalType(""));
            dispatch(setLoadingModal(false));
            dispatch(setCurrentTab("inbox"));
            dispatch(setselectedRecipients(null));
            // navigate(ProtectedRoutes.DASHBOARD);
          }
          // dispatch(setSelecteDocument(null));
          // dispatch(setFixedFields(null));
          // dispatch(setDocuments(null));
          // dispatch(setRecipients(null));
          // dispatch(setEnvelopeStep(0));
          // dispatch(setModalType(""));
          // dispatch(setLoadingModal(false));
          // dispatch(setCurrentTab("inbox"));
          // dispatch(setselectedRecipients(null));
          // console.log("ENVELOPE SEND", envelope?.self_sign);
        } else {
          dispatch(setModalType(""));
          dispatch(setLoadingModal(false));
        }
      }
    );
  };
  return (
    <SafeAreaView className="w-full h-full bg-white p-2 flex flex-col justify-between max-w-sm mx-auto">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-[90%] bg-white w-full flex flex-col  justify-start items-center">
          <Text className="w-full text-start font-semibold px-1 text-sm">
            Documents :
          </Text>

          <Text className="w-full text-start font-semibold px-1 text-sm">
            Recipients :
          </Text>

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
