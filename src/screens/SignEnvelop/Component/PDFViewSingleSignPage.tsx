import { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { PdfView } from "react-native-pdf-light";
import { useToast } from "react-native-toast-notifications";
import ApiConfig from "../../../constants/ApiConfig";
import {
  FieldPayload,
  FILLEDDATATYPE,
  PageFieldType,
} from "../../../types/FieldTypes";
import { rgbToHex } from "../../../utils/colorUtil";
import GetSvg from "../../../utils/GetSvg";
import renderFieldIcon from "../../../utils/renderFieldIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { isNull } from "lodash";
import useAuth from "../../../utils/auth";
import CredentialsModal from "../../../components/modals/CredentialsModal";
import UploadCredentials from "../../Credentials/UploadCredentials";
import SelectStampModal from "../../Credentials/SelectStampModal";

interface PDFViewSingleSignPageProps {
  pageNumber: number;
  source: any;
  handlePageLoad: any;
  fields: PageFieldType[];
  setEnvelope?: any;
  allFields: PageFieldType[];
}
const PDFViewSingleSignPage: React.FC<PDFViewSingleSignPageProps> = ({
  pageNumber,
  source,
  handlePageLoad,
  fields,
  setEnvelope,
  allFields,
}) => {
  const [containerSize, setContainerSize] = useState({
    height: Dimensions.get("screen").height * 2,
    width: Dimensions.get("screen").width * 2,
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
  const { auth } = useAuth();

  const resolveSize = (height: number, width: number) => {
    let maxAllowedWidth = Dimensions.get("screen").width * 0.88;
    let diffPercent =
      width - maxAllowedWidth != 0
        ? ((maxAllowedWidth - width) / width) * 100
        : 0;
    let containerWidth = maxAllowedWidth;
    let containerHeight = height + height * (diffPercent / 100);
    return { height: containerHeight, width: containerWidth };
  };

  // ############# RENDER EXISING FILLED FIELDS START ##############

  const renderFilledDiv = (
    type: FILLEDDATATYPE,
    data: PageFieldType,
    height?: number,
    width?: number
  ) => {
    const url = ApiConfig.FILES_URL + data?.image_url;
    switch (type) {
      case "date":
      case "time":
      case "text":
        return (
          <View
            style={{
              width: "100%",
              height: "100%",
              // borderStyle: "dashed",
              // borderWidth: 1,
              // borderColor: data?.response_payload?.rgbaColor,
            }}
            className="justify-center items-center"
          >
            <Text
              numberOfLines={1}
              style={{ fontSize: (width ?? 0) / 12 }}
              className=""
            >
              {data?.meta_data?.fieldvalue}
            </Text>
          </View>
        );
      case "initial":
      case "stamp":
      case "signature":
        return (
          <Image
            className="w-full h-full"
            resizeMode="contain"
            source={{
              uri: url,
            }}
          />
        );
    }
  };

  // ############# RENDER EXISING FILLED FIELDS END ##############

  const handleUpdateEnvelope = (value: any, field: PageFieldType) => {
    const foundIndex = allFields.findIndex(
      (f: any) => f?.id === field?.id
    ) as number;
    const updatedField = {
      ...field,
      meta_data: { fieldvalue: value },
      user_digital_credentials_id: value,
    };
    let f = allFields;
    f[foundIndex] = updatedField as any;
    setEnvelope((prev: any) => ({
      ...prev,
      fields: f,
    }));
  };

  const handleCallback = (data: any) => {
    switch (selectedField?.type) {
      case "stamp":
        const stamps = data?.user?.stamps;
        if (stamps) {
          handleUpdateEnvelope(stamps?.[0]?.id, selectedField);
        } else {
          handleUpdateEnvelope(data?.id, selectedField);
        }
        break;
      case "signature":
        const signature = data?.user?.signature;
        if (signature) {
          handleUpdateEnvelope(signature?.id, selectedField);
        }
        break;
      case "initial":
        const intial = data?.user?.initials;
        if (intial) {
          handleUpdateEnvelope(intial?.id, selectedField);
        }
        break;
      default:
        break;
    }
  };

  const handleFillCredentials = (
    field: PageFieldType,
    type: FILLEDDATATYPE
  ) => {
    switch (type) {
      case "initial":
        const initial = auth?.user?.initials;
        if (initial) {
          handleUpdateEnvelope(initial?.id, field);
        } else {
          setuploadInitialModal({
            isOpen: true,
            type: "initial",
          });
        }
        break;
      case "signature":
        const signature = auth?.user?.signature;
        if (signature) {
          handleUpdateEnvelope(signature?.id, field);
        } else {
          setuploadInitialModal({
            isOpen: true,
            type: "signature",
          });
        }
        break;
      case "stamp":
        const stamps = auth?.user?.stamps;
        if (stamps.length === 1) {
          handleUpdateEnvelope(stamps?.[0]?.id, field);
          console.log("TESTING1");
        } else if (stamps.length > 1) {
          console.log("TESTING2");
          setselectStampModal({
            isOpen: true,
            type: "stamp",
          });
        } else {
          console.log("TESTING3");
          setuploadInitialModal({
            isOpen: true,
            type: "stamp",
          });
          //MODAL OPEN TO UPLOAD STAMP
        }
        break;
      default:
        break;
    }

    const signature = auth?.user?.signature;

    const stamps = auth?.user?.stamps;
  };

  // ############# HANDLING NEW CLICKABLE FILLING FIELDS START ##############
  const [selectedField, setSelectedField] = useState<PageFieldType | null>(
    null
  );
  const [textValue, setTextValue] = useState<any>(null);
  const [inputTextField, setInputText] = useState<any>({
    id: null,
    view: null,
  });

  const handleNewClickableField = (
    type: FILLEDDATATYPE,
    data: PageFieldType,
    height?: number,
    width?: number,
    fixedFieldFontSize?: number
  ) => {
    const url = ApiConfig.FILES_URL + data?.image_url;
    const i = data?.response_payload;
    switch (type) {
      case "date":
      case "time":
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedField(data);
              type === "date" ? setShowPicker("DATE") : setShowPicker("TIME");
            }}
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "blue",
              borderStyle: "dashed",
              borderWidth: 1.8,
              borderColor: i?.rgbaColor,
              // backgroundColor: i?.rgbaColor+'e1',
            }}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            <View className="w-1/4 justify-center items-center">
              {i?.type === "text" ? (
                <Text className="font-semibold text-base leading-5">Aa</Text>
              ) : (
                <GetSvg
                  name={renderFieldIcon(i?.type) ?? ""}
                  classN="w-5 h-5"
                  color={i?.rgbaColor}
                />
              )}
            </View>
            <View className="w-3/4 items-start justify-center">
              <Text
                style={{
                  fontSize: (fixedFieldFontSize ?? 0) * 1.2,
                }}
                className="capitalize font-semibold text-gray-900"
                numberOfLines={1}
              >
                {i?.name ?? "name"}
              </Text>
              <Text
                style={{
                  fontSize: fixedFieldFontSize,
                }}
                className="capitalize font-semibold text-gray-600"
                numberOfLines={1}
              >
                {i?.email ?? "email"}
              </Text>
              <Text
                style={{
                  fontSize: (fixedFieldFontSize ?? 0) * 0.8,
                }}
                className="capitalize font-medium text-gray-500 w-full"
                numberOfLines={1}
              >
                {i?.type}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        );
      case "text":
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedField(data);
              setInputText({
                id: data?.id,
                view: (
                  <TextInput
                    onChangeText={(e) => {
                      setTextValue(e);
                    }}
                    autoFocus={true}
                    style={{ fontSize: (width ?? 0) / 12 }}
                    className="w-full h-full"
                  ></TextInput>
                ),
              });
            }}
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dashed",
              borderWidth: 1.8,
              borderColor: i?.rgbaColor,
            }}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            {inputTextField?.id === data?.id ? (
              inputTextField?.view
            ) : (
              <>
                <View className="w-1/4 justify-center items-center">
                  {i?.type === "text" ? (
                    <Text className="font-semibold text-base leading-5">
                      Aa
                    </Text>
                  ) : (
                    <GetSvg
                      name={renderFieldIcon(i?.type) ?? ""}
                      classN="w-5 h-5"
                      color={i?.rgbaColor}
                    />
                  )}
                </View>
                <View className="w-3/4 items-start justify-center">
                  <Text
                    style={{
                      fontSize: (fixedFieldFontSize ?? 0) * 1.2,
                    }}
                    className="capitalize font-semibold text-gray-900"
                    numberOfLines={1}
                  >
                    {i?.name ?? "name"}
                  </Text>
                  <Text
                    style={{
                      fontSize: fixedFieldFontSize,
                    }}
                    className="capitalize font-semibold text-gray-600"
                    numberOfLines={1}
                  >
                    {i?.email ?? "email"}
                  </Text>
                  <Text
                    style={{
                      fontSize: (fixedFieldFontSize ?? 0) * 0.8,
                    }}
                    className="capitalize font-medium text-gray-500 w-full"
                    numberOfLines={1}
                  >
                    {i?.type}{" "}
                  </Text>
                </View>
              </>
            )}
          </TouchableOpacity>
        );
      case "initial":
      case "stamp":
      case "signature":
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedField(data);
              handleFillCredentials(data, type);
            }}
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dashed",
              borderWidth: 1.8,
              borderColor: i?.rgbaColor,
            }}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            <View className="w-1/4 justify-center items-center">
              {i?.type === "text" ? (
                <Text className="font-semibold text-base leading-5">Aa</Text>
              ) : (
                <GetSvg
                  name={renderFieldIcon(i?.type) ?? ""}
                  classN="w-5 h-5"
                  color={i?.rgbaColor}
                />
              )}
            </View>
            <View className="w-3/4 items-start justify-center">
              <Text
                style={{
                  fontSize: (fixedFieldFontSize ?? 0) * 1.2,
                }}
                className="capitalize font-semibold text-gray-900"
                numberOfLines={1}
              >
                {i?.name ?? "name"}
              </Text>
              <Text
                style={{
                  fontSize: fixedFieldFontSize,
                }}
                className="capitalize font-semibold text-gray-600"
                numberOfLines={1}
              >
                {i?.email ?? "email"}
              </Text>
              <Text
                style={{
                  fontSize: (fixedFieldFontSize ?? 0) * 0.8,
                }}
                className="capitalize font-medium text-gray-500 w-full"
                numberOfLines={1}
              >
                {i?.type}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity
            onPress={() => {
              // handleNewClickableField(i?.type, data, height, width);
              setSelectedField(data);
            }}
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "blue",
              borderStyle: "dashed",
              borderWidth: 1.8,
              borderColor: i?.rgbaColor,
              // backgroundColor: i?.rgbaColor+'e1',
            }}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            <View className="w-1/4 justify-center items-center">
              {i?.type === "text" ? (
                <Text className="font-semibold text-base leading-5">Aa</Text>
              ) : (
                <GetSvg
                  name={renderFieldIcon(i?.type) ?? ""}
                  classN="w-5 h-5"
                  color={i?.rgbaColor}
                />
              )}
            </View>
            <View className="w-3/4 items-start justify-center">
              <Text
                style={{
                  fontSize: (fixedFieldFontSize ?? 0) * 1.2,
                }}
                className="capitalize font-semibold text-gray-900"
                numberOfLines={1}
              >
                {i?.name ?? "name"}
              </Text>
              <Text
                style={{
                  fontSize: fixedFieldFontSize,
                }}
                className="capitalize font-semibold text-gray-600"
                numberOfLines={1}
              >
                {i?.email ?? "email"}
              </Text>
              <Text
                style={{
                  fontSize: (fixedFieldFontSize ?? 0) * 0.8,
                }}
                className="capitalize font-medium text-gray-500"
                numberOfLines={1}
              >
                {i?.type}
              </Text>
            </View>
          </TouchableOpacity>
        );
    }
  };

  // ############# HANDLING NEW CLICKABLE FILLING FIELDS END ##############

  // ############# HANDLING EDITABLE FIELDS START ##############

  const handleEditableField = (
    type: FILLEDDATATYPE,
    data: PageFieldType,
    height?: number,
    width?: number
  ) => {
    const url =
      ApiConfig.FILES_URL +
      "user-digital-credentials/" +
      data?.meta_data?.fieldvalue +
      ".png";
    switch (type) {
      case "time":
      case "date":
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedField(data);
              type === "date" ? setShowPicker("DATE") : setShowPicker("TIME");
            }}
            style={{
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: data?.response_payload?.rgbaColor,
            }}
            className="relative bg-[#ffffffe1] justify-center items-center w-full h-full"
          >
            <Text
              numberOfLines={1}
              style={{ fontSize: (width ?? 0) / 12 }}
              className="w-full"
            >
              {data?.meta_data?.fieldvalue}{" "}
            </Text>
          </TouchableOpacity>
        );
      case "text":
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedField(data);
            }}
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: data?.response_payload?.rgbaColor,
            }}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            <TextInput
              value={data?.meta_data?.fieldvalue}
              onChangeText={setTextValue}
              style={{ fontSize: (width ?? 0) / 12 }}
              className=""
            ></TextInput>
          </TouchableOpacity>
        );
      case "initial":
      case "signature":
      case "stamp":
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedField(data);
              handleFillCredentials(data, type);
            }}
            style={{
              width: "100%",
              height: "100%",
              // borderStyle: "dashed",
              // borderWidth: 1,
              // borderColor: data?.response_payload?.rgbaColor,
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

  // ############# HANDLING EDITABLE FIELDS END ##############

  // ############# HANDLING DATE FIELDS START ##############

  const [showPicker, setShowPicker] = useState<"DATE" | "TIME" | null>(null);
  const [dateValue, setDateValue] = useState<any>(null);

  useEffect(() => {
    if (dateValue) {
      const value =
        selectedField?.type === "date"
          ? dayjs(dateValue).format("YYYY-MM-DD")
          : dayjs(dateValue).format("h:mm A");
      const foundIndex = allFields.findIndex(
        (f: any) => f?.id === selectedField?.id
      ) as number;
      const updatedField = {
        ...selectedField,
        meta_data: { fieldvalue: value },
      };
      let f = allFields;
      f[foundIndex] = updatedField as any;
      setEnvelope((prev: any) => ({
        ...prev,
        fields: f,
      }));
    }
  }, [dateValue]);

  // ############# HANDLING DATE FIELDS END ##############

  // ############# HANDLING TEXT FIELDS STARTS ##############

  useEffect(() => {
    const foundIndex = allFields.findIndex(
      (f: any) => f?.id === selectedField?.id
    ) as number;
    const updatedField = {
      ...selectedField,
      meta_data: { fieldvalue: textValue },
    };
    let f = allFields;
    f[foundIndex] = updatedField as any;
    setEnvelope((prev: any) => ({
      ...prev,
      fields: f,
    }));
  }, [textValue]);

  // ############# HANDLING TEXT FIELDS END ##############

  return (
    <View
      key={pageNumber}
      className="relative bg-white border border-gray-300 my-2 mx-auto"
      style={{ height: containerSize?.height, width: containerSize?.width }}
    >
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
      {!isNull(showPicker) ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateValue ?? new Date()}
          mode={showPicker.toLowerCase() as any}
          is24Hour={false}
          onChange={(e, selectedDate) => {
            if (
              e?.type === "dismissed" ||
              e.type === "set" ||
              e.type === "neutralButtonPressed"
            ) {
              selectedDate && setDateValue(selectedDate);
              setShowPicker(null);
            }
          }}
        />
      ) : null}
      <View className="w-full h-full">
        <PdfView
          source={source}
          page={pageNumber}
          onLoadComplete={(e: any) => {
            setContainerSize(resolveSize(e?.height, e?.width));
            // setActualPageSize({ height: e?.height, width: e?.width });
            handlePageLoad(e);
          }}
          style={{
            position: "absolute",
            zIndex: 1,
            height: "100%",
            width: "100%",
          }}
          onError={(e) => {
            toast.hideAll();
            toast.show(
              "Failed to open document please try with different document",
              { type: "error" }
            );
            console.log("Error:", e);
          }}
        />
      </View>
      <View
        className="absolute  z-10"
        style={{ height: containerSize?.height, width: containerSize?.width }}
      >
        {fields
          ? fields?.map((f: PageFieldType) => {
              const i: FieldPayload = f?.response_payload;

              const dpw =
                ((containerSize.width - Number(i?.dispalypagewidth)) /
                  Number(i?.dispalypagewidth)) *
                100;
              const dph =
                ((containerSize.height - Number(i?.displaypageheight)) /
                  Number(i?.displaypageheight)) *
                100;
              const width = i?.width + (dpw / 100) * i?.width;
              const height = i?.height + (dph / 100) * i?.height;
              const yCord = i?.yCord + (dph / 100) * i?.yCord;
              const xCord = i?.xCord + (dpw / 100) * i?.xCord;

              let fixedFieldFontSize = 0;
              if (width / 3 > height) {
                fixedFieldFontSize = height / 10;
              } else {
                fixedFieldFontSize = width / 14;
              }
              return (
                <View
                  className="absolute"
                  key={i?.id}
                  style={{
                    transform: [
                      { translateX: xCord ?? 0 },
                      { translateY: yCord ?? 0 },
                    ],
                    height: height,
                    width: width,
                  }}
                >
                  {f?.filled_at
                    ? renderFilledDiv(i?.type, f, height, width)
                    : f?.meta_data || f?.user_digital_credentials_id
                    ? handleEditableField(i?.type, f, height, width)
                    : handleNewClickableField(
                        i?.type,
                        f,
                        height,
                        width,
                        fixedFieldFontSize
                      )}
                </View>
              );
            })
          : null}
      </View>
    </View>
  );
};

export default PDFViewSingleSignPage;
