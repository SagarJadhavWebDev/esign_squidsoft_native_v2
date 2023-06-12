import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GetSvg from "../../../utils/GetSvg";
import renderFieldIcon from "../../../utils/renderFieldIcon";
import {
  useEnvelope,
  useInitial,
  usePdfData,
  useSignature,
  useStamps,
} from "../../../utils/useReduxUtil";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useDispatch } from "react-redux";
import { setAddedFields } from "../../../redux/reducers/PdfSlice";
import { FILLEDDATATYPE, PageFieldType } from "../../../types/FieldTypes";
import { useToast } from "react-native-toast-notifications";
import CredentialsModal from "../../../components/modals/CredentialsModal";
import UploadCredentials from "../../Credentials/UploadCredentials";
import SelectStampModal from "../../Credentials/SelectStampModal";
import { isEmpty, isNull } from "lodash";
import dayjs from "dayjs";

interface EachFieldProps {
  i: any;
}
const EachField: React.FC<EachFieldProps> = ({ i }) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const [fixedFieldFontSize, setfixedFieldFontSize] = useState(0);
  useEffect(() => {
    if (i) {
      if (i?.width / 3 > i?.height) {
        setfixedFieldFontSize(i?.height / 10);
      } else {
        setfixedFieldFontSize(i?.width / 14);
      }
    }
  }, []);
  const { addedFields } = usePdfData();
  const removeAddedField = (field: any) => {
    const data = addedFields?.filter(
      (f: any) => f?.meta?.uniqueID !== field?.meta?.uniqueID
    );
    dispatch(setAddedFields(data));
  };
  const [showPicker, setShowPicker] = useState<"DATE" | "TIME" | any>();
  const [dateValue, setDateValue] = useState<any>(null);
  const [ShowDateTimePicker, setShowDateTimePicker] = useState(false);
  const [inputTextField, setInputText] = useState<any>({
    id: null,
    view: null,
  });
  const [uploadInitialModal, setuploadInitialModal] = useState({
    type: "initial",
    isOpen: false,
  });
  const [selectStampModal, setselectStampModal] = useState({
    type: "stamp",
    isOpen: false,
  });
  const toast = useToast();
  const initial = useInitial();
  const stamps = useStamps();
  const signature = useSignature();
  const defaultStamp = stamps?.find((s) => s?.is_default === 1)?.source?.base64;
  const handleUpdateEnvelope = (value: any, field: any) => {
    const foundIndex = addedFields?.findIndex(
      (f: any) => f?.meta?.uniqueID === field?.meta?.uniqueID
    ) as number;
    const updatedField = {
      ...field,
      value: value,
    };
    const ned = { ...addedFields, [foundIndex]: updatedField };
    const newData = Object.keys(ned).map((key: any) => ned?.[key]);
    dispatch(setAddedFields(newData));
    // setEnvelope((prev: any) => ({
    //   ...prev,
    //   document_fields: f,
    // }));
  };
  const handleEditableField = (
    type: any,
    data: any,
    height?: number,
    width?: number
  ) => {
    const url = data?.value;
    console.log("CORDINATES", type);
    switch (type) {
      case "time":
      case "date":
        return (
          <TouchableOpacity
            onPress={() => {
              //setSelectedField(data);
              type === "date" ? setShowPicker("DATE") : setShowPicker("TIME");
            }}
            style={{
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: data?.meta?.rgbaColor,
            }}
            className="relative bg-[#ffffffe1] justify-center items-center w-full h-full"
          >
            <Text
              numberOfLines={1}
              style={{ fontSize: (width ?? 0) / 12 }}
              className="w-full"
            >
              {data?.value}{" "}
            </Text>
          </TouchableOpacity>
        );
      case "text":
        return (
          <TouchableOpacity
            onPress={() => {
              //setSelectedField(data);
            }}
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: data?.meta?.rgbaColor,
            }}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            <TextInput
              value={data?.value ?? ""}
              onChangeText={(e) => {
                handleUpdateEnvelope(e, data);
              }}
              style={{ fontSize: (width ?? 0) / 12 }}
              className="w-full h-full"
            ></TextInput>
          </TouchableOpacity>
        );
      case "initial":
      case "signature":
      case "stamp":
        return (
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: data?.meta?.rgbaColor,
            }}
            className="relative bg-[#ffffffe1]"
          >
            <Image
              className="w-full h-full"
              resizeMode="contain"
              source={{
                uri: url,
              }}
            />
          </TouchableOpacity>
        );
    }
  };
  const handleCallback = (data: any) => {
    //console.log("STAMP DATA", data?.source?.base64);
    switch (i?.type?.toLowerCase()) {
      case "stamp":
        const value = data?.find((s: any) => s?.is_default === 1)?.source
          ?.base64;
        handleUpdateEnvelope(value, i);
        break;
      case "signature":
        if (data?.source?.base64) {
          handleUpdateEnvelope(data?.source?.base64, i);
        }
        break;
      case "initial":
        if (data?.source?.base64) {
          handleUpdateEnvelope(data?.source?.base64, i);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (dateValue) {
      const value =
        i?.type.toLowerCase() === "date"
          ? dayjs(dateValue).format("YYYY-MM-DD")
          : dayjs(dateValue).format("hh:mm:ss");
      handleUpdateEnvelope(value, i);
      setShowPicker("");
      setShowDateTimePicker(false);
    }
  }, [dateValue]);
  const envelope = useEnvelope();
  return (
    <React.Fragment>
      {uploadInitialModal.isOpen ? (
        <CredentialsModal
          isOpen={uploadInitialModal.isOpen}
          modalType={uploadInitialModal.type}
          setIsOpen={setuploadInitialModal}
        >
          <UploadCredentials
            modalType={uploadInitialModal.type}
            setIsOpen={setuploadInitialModal}
            callback={handleCallback}
          />
        </CredentialsModal>
      ) : null}
      {selectStampModal?.isOpen ? (
        <CredentialsModal
          isOpen={selectStampModal.isOpen}
          modalType={selectStampModal.type}
          setIsOpen={setselectStampModal}
        >
          <SelectStampModal
            modalType={selectStampModal.type}
            setIsOpen={setselectStampModal}
            callback={handleCallback}
          />
        </CredentialsModal>
      ) : null}
      {ShowDateTimePicker && showPicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateValue ?? new Date()}
          mode={showPicker.toLowerCase() as any}
          is24Hour={true}
          onChange={(e, selectedDate) => {
            if (
              e?.type === "dismissed" ||
              e.type === "set" ||
              e.type === "neutralButtonPressed"
            ) {
              if (selectedDate) {
                setDateValue(selectedDate);
              }
              
            }
          }}
        />
      ) : null}

      <Pressable
        className="absolute"
        key={i.id}
        style={{
          transform: [
            { translateX: i?.x_coordinate ?? 0 },
            { translateY: i?.y_coordinate ?? 0 },
          ],
          height: i.height,
          width: i.width,
        }}
        onPress={() => {
          if (envelope?.self_sign) {
            switch (i.type.toLowerCase()) {
              case "initial":
                if (initial) {
                  handleUpdateEnvelope(initial?.source?.base64, i);
                } else {
                  setuploadInitialModal({
                    isOpen: true,
                    type: "initial",
                  });
                }
                break;
              case "signature":
                if (signature) {
                  handleUpdateEnvelope(signature?.source?.base64, i);
                } else {
                  setuploadInitialModal({
                    isOpen: true,
                    type: "signature",
                  });
                }
                break;
              case "stamp":
                if (stamps?.length === 1) {
                  handleUpdateEnvelope(defaultStamp, i);
                } else if (stamps && stamps?.length > 1) {
                    setselectStampModal({
                      isOpen: true,
                      type: "stamp",
                    });
                } else {
                    setuploadInitialModal({
                      isOpen: true,
                      type: "stamp",
                    });
                  //MODAL OPEN TO UPLOAD STAMP
                }
                break;
              case "date":
                setShowPicker("DATE");
                setShowDateTimePicker(true);
                break;
              case "time":
                setShowPicker("TIME");
                setShowDateTimePicker(true);
                break;
              default:
                break;
            }
            setIsClicked(true);
          }
        }}
      >
        {isClicked ? (
          handleEditableField(
            i.type.toLowerCase(),
            i,
            i?.meta?.height,
            i?.meta?.width
          )
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "blue",
              borderStyle: "dashed",
              borderWidth: 1.8,
              borderColor: i?.meta?.rgbaColor,
              // backgroundColor: i?.rgbaColor+'e1',
            }}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            <View className="w-1/4 justify-center items-center">
              {i?.type?.toLowerCase() === "text" ? (
                <Text className="font-semibold text-base leading-5">Aa</Text>
              ) : (
                <GetSvg
                  name={renderFieldIcon(i?.type?.toLowerCase()) ?? ""}
                  classN="w-5 h-5"
                  color={i?.meta?.rgbaColor}
                />
              )}
            </View>
            <View className="w-3/4 items-start justify-center">
              <Text
                style={{
                  fontSize: fixedFieldFontSize * 1.2,
                }}
                className="capitalize font-semibold w-full text-gray-900"
                numberOfLines={1}
              >
                {i?.meta?.name ?? "name"}
              </Text>
              <Text
                style={{
                  fontSize: fixedFieldFontSize,
                }}
                className="capitalize font-semibold w-full text-gray-600"
                numberOfLines={1}
              >
                {i?.meta?.email ?? "email"}
              </Text>
              <Text
                style={{
                  fontSize: fixedFieldFontSize * 0.8,
                }}
                className="capitalize font-medium w-full text-gray-500"
                numberOfLines={1}
              >
                {i?.type}
              </Text>
            </View>
          </View>
        )}
        <Pressable
          onPress={() => {
            //console.log("REMOVE CALLED");
            removeAddedField(i);
          }}
          className="absolute -top-1.5 -right-1.5   rounded-full bg-[#d10000] justify-center items-center p-0.5"
        >
          <GetSvg
            name="closeWithoutCircleIcon"
            classN=" w-3 h-3"
            color="white"
            strokeWidth={2}
          />
        </Pressable>
      </Pressable>
    </React.Fragment>
  );
};
export default EachField;
