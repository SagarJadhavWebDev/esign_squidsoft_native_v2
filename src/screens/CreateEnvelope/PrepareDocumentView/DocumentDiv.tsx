import { isString, times, uniqBy } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { PdfUtil, PdfView } from "react-native-pdf-light";
import { useToast } from "react-native-toast-notifications";
import RNFetchBlob from "rn-fetch-blob";
import { ResizeIcon } from "../../../assets/SvgAssets";
import ApiConfig from "../../../constants/ApiConfig";
import apiEndpoints from "../../../constants/apiEndpoints";
import colorList from "../../../constants/colorList";
import { FieldPayload } from "../../../types/FieldTypes";
import useAuth from "../../../utils/auth";
import { rgbToHex } from "../../../utils/colorUtil";
import CryptoHandler from "../../../utils/EncryptDecryptHandler";
import GetSvg from "../../../utils/GetSvg";
import HttpService from "../../../utils/HttpService";
import renderFieldIcon from "../../../utils/renderFieldIcon";

interface DocumentDivProps {
  envelope: any;
  setEnvelope?: any;
  setCurrentStep?: any;
  selectedDocument: any;
  selectedRecipient?: any;
  selectedField?: any;
  setSelectedField?: any;
  addedFields: any;
  setAddedFields?: any;
}

const DocumentDiv: React.FC<DocumentDivProps> = ({
  envelope,
  setEnvelope,
  setCurrentStep,
  selectedDocument,
  selectedRecipient,
  selectedField,
  addedFields,
  setSelectedField,
  setAddedFields,
}) => {
  // const source = RNFetchBlob.fs.dirs.DocumentDir + "/" + selectedDocument?.name;
  const [source, setSource] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0) as any;
  // const [addedFields, setAddedFields] = useState<FieldPayload[]>([]);
  // {"auth": 57, "authFields": [], "body": null, "completed": true, "created_date": "2023-01-10T08:26:30.000000Z", "created_time": "2023-01-10T08:26:30.000000Z", "documents": [{"id": 1050, "name": "T&C.pdf", "pages": [], "path": "userdata/57/Envelopes/857/Documents/1050/unsigned_document"}], "expire_at": null, "expire_time": null, "fields": [], "id": 857, "recipients": [{"id": 1318, "level": 0, "operation": "3", "signed_at": null, "user": {"created_at": "2022-10-10T17:00:20.000000Z", "email": "sagar@squidsoft.tech", "id": 57, "name": "sagar@squidsoft.tech", "updated_at": "2023-01-06T03:50:38.000000Z"}}, {"id": 1319, "level": 1, "operation": "1", "signed_at": null, "user": {"created_at": "2022-10-10T17:00:20.000000Z", "email": "sagar@squidsoft.tech", "id": 57, "name": "sagar@squidsoft.tech", "updated_at": "2023-01-06T03:50:38.000000Z"}}], "self_sign": 0, "sent_at": null, "sent_date": null, "sent_time": null, "subject": null, "user": {"created_at": "2022-10-10T17:00:20.000000Z", "email": "sagar@squidsoft.tech", "id": 57, "name": "sagar@squidsoft.tech", "updated_at": "2023-01-06T03:50:38.000000Z"}}
  const [divPosition, setDivPosition] = useState(null as any);
  const { token } = useAuth();
  const toast = useToast();
  console.log("selectedDocument?.name", selectedDocument?.option?.name);
  const handleDocumentFetch = async () => {
    console.log("selectedDocument?.name", selectedDocument?.option?.name);
    // const s = RNFetchBlob.fs.dirs.DocumentDir + "/" + selectedDocument?.option?.name;
    const response = await RNFetchBlob.config({
      // path: s,
      fileCache: true,
    })
      .fetch(
        "GET",
        `${
          ApiConfig.FILES_URL +
          selectedDocument?.option?.path +
          "/" +
          selectedDocument?.option?.name
        }`
      )
      .then((value) => {
        setSource(value.path());
        console.log("RESPONSE FROM RN FECTH BLOB:", value.path());
        // console.log("RESPONSE FROM RN FECTH BLOB:", value);
      })
      .catch((error) => {
        toast.show(
          "Failed to open document please try with different document",
          { type: "error" }
        );
        console.log("ERRORwe:", error);
      });
  };

  useEffect(() => {
    if (source) {
      PdfUtil.getPageCount(source)
        .then((res) => {
          console.log(res);
          setTotalPages(res);
        })
        .catch((err) => console.log(err));
    }
  }, [source]);

  useEffect(() => {
    handleDocumentFetch();
  }, []);

  useEffect(() => {
    if (selectedDocument?.option?.name) {
      handleDocumentFetch();
    }
  }, [selectedDocument]);

  const resolveSize = (height: number, width: number) => {
    let maxAllowedWidth = dimentions.width * 0.88;
    let diffPercent =
      width - maxAllowedWidth != 0
        ? ((maxAllowedWidth - width) / width) * 100
        : 0;
    let containerWidth = maxAllowedWidth;
    let containerHeight = height + height * (diffPercent / 100);
    return { height: containerHeight, width: containerWidth };
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const fieldPan = useRef(new Animated.ValueXY()).current;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const dimentions = useWindowDimensions();

  const [dragContainerSize, setDragContainerSize] = useState({
    height: dimentions.height * 2,
    width: dimentions.width * 2,
  });
  const [actualPageSize, setActualPageSize] = useState({
    height: 0,
    width: 0,
  });

  const [fieldSize, setFieldSize] = useState({
    height: selectedField?.height ?? 0,
    width: selectedField?.width ?? 0,
  });

  const handlePan = () => {
    let panX = Number(JSON.stringify(pan.x));
    let panY = Number(JSON.stringify(pan.y));
    let maxPanX = panX + fieldSize.width;
    let maxPanY = panY + fieldSize.height;

    // console.log("FIELDSIZE:", fieldSize);
    // console.log("PAN X:", panX);
    // console.log("PAN Y:", panY);
    // console.log("MAX PAN X:", maxPanX);
    // console.log("MAX PAN Y:", maxPanY);

    if (
      panX >= 0 &&
      panY >= 0 &&
      maxPanX <= dragContainerSize.width &&
      maxPanY <= dragContainerSize.height
    ) {
      console.log("CALLED 1st");
      setDivPosition({ x: panX, y: panY });
    } else if (panX < 0 && panY >= 0) {
      console.log("CALLED 2nd");
      if (maxPanY > dragContainerSize.height) {
        setDivPosition({
          x: 0,
          y: dragContainerSize.height - fieldSize.height,
        });
      } else {
        setDivPosition({ x: 0, y: panY });
      }
    } else if (panY < 0 && panX >= 0) {
      console.log("CALLED 3rd");
      if (maxPanX > dragContainerSize.width) {
        setDivPosition({ x: dragContainerSize.width - fieldSize.width, y: 0 });
      } else {
        setDivPosition({ x: panX, y: 0 });
      }
    } else if (panX < 0 && panY < 0) {
      console.log("CALLED 4th");
      setDivPosition({ x: 0, y: 0 });
    } else if (
      maxPanX > dragContainerSize.width &&
      maxPanY > dragContainerSize.height
    ) {
      console.log("CALLED 5th");
      setDivPosition({
        x: dragContainerSize.width - fieldSize.width,
        y: dragContainerSize.height - fieldSize.height,
      });
    } else if (
      maxPanX > dragContainerSize.width &&
      maxPanY <= dragContainerSize.height
    ) {
      console.log("CALLED 6th");
      setDivPosition({ x: dragContainerSize.width - fieldSize.width, y: panY });
    } else if (
      maxPanX <= dragContainerSize.width &&
      maxPanY > dragContainerSize.height
    ) {
      console.log("CALLED 7th");
      setDivPosition({
        x: panX,
        y: dragContainerSize.height - fieldSize.height,
      });
    }
  };

  const [tempDiffField, setTempDiffField] = useState({
    x: 0,
    y: 0,
  });

  const [differenceFieldSize, setDifferenceFieldSize] = useState({
    x: 0,
    y: 0,
  });

  const [savedFieldSize, setSavedFieldSize] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setFieldSize({
      width:
        savedFieldSize.x + differenceFieldSize.x !== 0
          ? savedFieldSize.x + differenceFieldSize.x
          : fieldSize.width,
      height:
        savedFieldSize.y + differenceFieldSize.y !== 0
          ? savedFieldSize.y + differenceFieldSize.y
          : fieldSize.height,
    });
  }, [differenceFieldSize]);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          //@ts-ignore
          x: pan.x._value,
          //@ts-ignore
          y: pan.y._value,
        });
      },
      onPanResponderMove: (e: any, gesture: any) => {
        return Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
          listener(event) {
            handlePan();
          },
        })(e, gesture);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    });
  }, [dragContainerSize, fieldSize, selectedField]);

  const FieldPanResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setTempDiffField({
          x: 0,
          y: 0,
        });
      },
      onPanResponderMove: (e: any, gesture: any) => {
        setDifferenceFieldSize({
          x: gesture.dx - tempDiffField.x,
          y: gesture.dy - tempDiffField.y,
        });
        setTempDiffField({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (event, gesture) => {},
    });
  }, [dragContainerSize, selectedField]);

  FieldPanResponder.panHandlers.onResponderGrant = (e: any) => {
    // console.log("PanResponder", fieldSize);
    setSavedFieldSize({ x: fieldSize.width, y: fieldSize.height });
  };
  const [tempFieldsView, setTempFieldView] = useState<any>(null);
  const handleFix = () => {
    let differencePercentage =
      ((dragContainerSize.width - actualPageSize.width) /
        ((dragContainerSize.width + actualPageSize.width) / 2)) *
      100;
    const payload = {
      id: Date.now().toString() + selectedRecipient?.option?.user?.email,
      envelopeid: envelope?.id,
      documentid: selectedDocument?.option?.id,
      pageno: currentPageNumber,
      type: selectedField?.type,
      userid: selectedRecipient?.option?.user?.id,
      email: selectedRecipient?.option?.user?.email,
      data: null,
      name: selectedRecipient?.option?.user?.name,
      xCord: divPosition?.x ?? 0,
      yCord: divPosition?.y ?? 0,
      width: fieldSize?.width,
      height: fieldSize?.height,
      actualpageheight: actualPageSize?.height,
      actualpagewidth: actualPageSize?.width,
      xdifpercentage: differencePercentage,
      ydifpercentage: differencePercentage,
      dispalypagewidth: dragContainerSize?.width,
      displaypageheight: dragContainerSize?.height,
      rgbaColor: colorList?.[selectedRecipient?.index],
      uniqueID:
        Date.now().toString() +
        Math.random().toFixed() +
        selectedRecipient?.option?.user?.email,
      iconName: selectedField?.iconName,
    };
    pan.setOffset({ x: 0, y: 0 });
    setAddedFields([...addedFields, payload]);
    setTempFieldView(null);
    setSelectedField(null);
  };
  const handleTempRemove = () => {
    setTempFieldView(null);
    setSelectedField(null);
  };
  const [fontSize, setFontSize] = useState(0);
  const calculateFont = (h: number, w: number) => {
    if (w / 3 > h) {
      setFontSize(h / 10);
    } else {
      setFontSize(w / 14);
    }
  };
  useEffect(() => {
    calculateFont(fieldSize.height, fieldSize.width);
  }, [fieldSize.height, fieldSize.width]);
  useEffect(() => {
    if (selectedField) {
      setTempFieldView(
        <Animated.View
          style={{
            transform: [
              { translateX: divPosition?.x ?? 0 },
              { translateY: divPosition?.y ?? 0 },
            ],
            height: fieldSize.height,
            width: fieldSize.width,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "blue",
              borderStyle: "dashed",
              borderWidth: 1.8,
              borderColor: colorList?.[selectedRecipient?.index],
            }}
            {...panResponder.panHandlers}
            className="relative bg-[#ffffffe1] flex flex-row"
          >
            <View className="w-1/4 justify-center items-center">
              {selectedField?.type === "text" ? (
                <Text className="font-semibold text-base leading-5">Aa</Text>
              ) : (
                <GetSvg
                  name={selectedField?.iconName}
                  classN="w-5 h-5"
                  color={`${colorList?.[selectedRecipient?.index]}`}
                />
              )}
            </View>
            <View className="w-3/4 items-start justify-center">
              <Text
                style={{
                  fontSize: fontSize,
                }}
                className="capitalize font-semibold text-gray-500"
              >
                {selectedField?.type}{" "}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              handleTempRemove();
            }}
            className="absolute -top-2 -left-2   rounded-full bg-[#d10000] justify-center items-center p-0.5"
          >
            <GetSvg
              name="closeWithoutCircleIcon"
              classN=" w-3 h-3   "
              color="white"
              strokeWidth={2}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              handleFix();
            }}
            className="absolute -top-2 -right-2    rounded-full bg-[#78A95E] justify-center items-center p-0.5"
          >
            <GetSvg
              name="tickIcon"
              classN=" w-3 h-3   "
              color="white"
              strokeWidth={2}
            />
          </Pressable>
          <Animated.View
            className="absolute -bottom-1 -right-1   rounded-full bg-[#fd8469] justify-center items-center p-1"
            {...FieldPanResponder.panHandlers}
          >
            <GetSvg
              name="resizeIcon"
              classN=" w-2 h-2   "
              color="white"
              strokeWidth={2}
            />
          </Animated.View>
        </Animated.View>
      );
    }
  }, [selectedField, divPosition, fieldSize]);

  //on user Change remove temp feild
  useEffect(() => {
    if (tempFieldsView) {
      setTempFieldView(null);
      setSelectedField(null);
    }
  }, [selectedRecipient, selectedDocument]);
  useEffect(() => {
    setCurrentPageNumber(1);
  }, [selectedDocument]);
  const removeAddedField = (id: any) => {
    if (isString(id)) {
      if (addedFields) {
        const filterFileds = addedFields?.filter((s: any) => s?.id !== id);
        setAddedFields(filterFileds);
      }
    } else {
      HttpService.delete(apiEndpoints.removeEnvelopeField(envelope?.id, id), {
        token: token ?? "",
      })
        .then((res) => {
          const data = CryptoHandler.response(res, token ?? "");
          const updatedFields = data?.fields?.map((d: any, i: any) => {
            const v = d?.response_payload;
            const newData = { ...v, id: d?.id };
            return newData;
          });
          const filteredFileds = addedFields.filter((f: any) => f.id !== id);
          setAddedFields(
            uniqBy([...filteredFileds, ...updatedFields], "uniqueID")
          );
        })
        .catch((err) => {
          console.log("REMOVE FIELD ERR", err);
        });
    }
  };
  useEffect(() => {
    if (selectedField) {
      setFieldSize({
        width: selectedField?.width,
        height: selectedField?.height,
      });
    }
  }, [selectedField]);

  return (
    <>
      <View
        className="relative my-2"
        style={{
          height: dragContainerSize.height,
          width: dragContainerSize.width,
        }}
      >
        <View className="bg-transparent border border-gray-100 w-full h-full -z-10">
          {source && (
            <PdfView
              source={source}
              page={currentPageNumber - 1}
              onError={(e) => {
                toast.hideAll();
                toast.show(
                  "Failed to open document please try with different document",
                  { type: "error" }
                );
                console.log("Error:", e);
              }}
              onLoadComplete={(page) => {
                // console.log("PAGE", resolveSize(page?.height, page?.width));
                setActualPageSize({
                  width: page?.width,
                  height: page?.height,
                });
                setDragContainerSize(resolveSize(page?.height, page?.width));
              }}
              style={{
                position: "absolute",
                zIndex: 1,
                height: "100%",
                width: "100%",
              }}
            />
          )}
        </View>
        <View className="border absolute z-50 w-full h-full ">
          {addedFields
            .filter(
              (f: FieldPayload) =>
                f?.documentid === selectedDocument?.option?.id &&
                f?.pageno === currentPageNumber
            )
            .map((i: FieldPayload) => {
              let fixedFieldFontSize = 0;
              if (i?.width / 3 > i?.height) {
                fixedFieldFontSize = i?.height / 10;
              } else {
                fixedFieldFontSize = i?.width / 14;
              }
              return (
                <View
                  className="absolute"
                  key={i.id}
                  style={{
                    transform: [
                      { translateX: i?.xCord ?? 0 },
                      { translateY: i?.yCord ?? 0 },
                    ],
                    height: i.height,
                    width: i.width,
                  }}
                >
                  <View
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
                          fontSize: fixedFieldFontSize * 1.2,
                        }}
                        className="capitalize font-semibold w-full text-gray-900"
                        numberOfLines={1}
                      >
                        {i?.name ?? "name"}
                      </Text>
                      <Text
                        style={{
                          fontSize: fixedFieldFontSize,
                        }}
                        className="capitalize font-semibold w-full text-gray-600"
                        numberOfLines={1}
                      >
                        {i?.email ?? "email"}
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
                    <Pressable
                      onPress={() => {
                        console.log("REMOVE CALLED");
                        removeAddedField(i.id);
                      }}
                      className="absolute -top-2 -right-2   rounded-full bg-[#d10000] justify-center items-center p-0.5"
                    >
                      <GetSvg
                        name="closeWithoutCircleIcon"
                        classN=" w-3 h-3   "
                        color="white"
                        strokeWidth={2}
                      />
                    </Pressable>
                  </View>
                </View>
              );
            })}
        </View>
        {selectedField ? (
          <View className="border absolute z-50 w-full h-full">
            {tempFieldsView ? tempFieldsView : null}
          </View>
        ) : null}
      </View>
      <View className=" w-full justify-center items-center my-2 flex flex-row">
        <Pressable
          onPress={() => {
            console.log("CALLED:");
            if (currentPageNumber !== 1) {
              setCurrentPageNumber(currentPageNumber - 1);
            }
          }}
        >
          <GetSvg
            name="leftArrowIcon"
            classN="w-6 h-6 px-2 "
            color="#374151"
            callBack={() => {
              if (currentPageNumber !== 1) {
                setCurrentPageNumber(currentPageNumber - 1);
              }
            }}
          />
        </Pressable>
        <Text className="mx-5">
          Page {currentPageNumber} of {totalPages}{" "}
        </Text>
        <Pressable
          onPress={() => {
            if (currentPageNumber !== totalPages) {
              setCurrentPageNumber(currentPageNumber + 1);
            }
          }}
        >
          <GetSvg name="rightArrowIcon" classN="w-6 h-6 px-2" color="#374151" />
        </Pressable>
      </View>
    </>
  );
};
export default DocumentDiv;
