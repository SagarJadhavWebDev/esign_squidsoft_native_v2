import { StatusBar } from "expo-status-bar";
import { times } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  PermissionsAndroid,
  Dimensions,
  Animated,
  PanResponder,
  Text,
  View,
} from "react-native";
import { Pdf, PdfUtil, PdfView } from "react-native-pdf-light";
import RNFetchBlob from "rn-fetch-blob";
import { ResizeIcon } from "./src/assets/SvgAssets";

export default function App() {
  const source = `${RNFetchBlob.fs.dirs.DocumentDir}/example.pdf`;
  const docRef = useRef(null);
  const [docUri, setDocUri] = useState(null) as any;
  const [totalPages, setTotalPages] = useState(0) as any;
  const [docList, setDocList] = useState(null) as any;
  const [divPosition, setDivPosition] = useState(null as any);
  // const source = {
  //   uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
  //   cache: true,
  // };
  useEffect(() => {
    (async () => {
      const per = await PermissionsAndroid.check(
        "android.permission.READ_EXTERNAL_STORAGE"
      );
      if (per) {
        const response = await RNFetchBlob.config({
          path: source,
        }).fetch(
          "GET",
          "http://samples.leanpub.com/thereactnativebook-sample.pdf"
        );
        PdfUtil.getPageCount(source)
          .then((res) => {
            console.log(res);
            setTotalPages(res);
          })
          .catch((err) => console.log(err));
      } else {
        PermissionsAndroid.request("android.permission.READ_EXTERNAL_STORAGE", {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        });
      }
      // const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
      // PdfUtil.getPageCount(cachePath).then(console.log);
      // const response = await fetch(url);
      // const blob = await response.blob();
      // var reader = new FileReader();
      // reader.onload = async () => {
      //   const pdfDoc = await PDFDocument.load(reader.result);
      //   setDocUri(source);
      //   setTotalPages(pdfDoc.getPageCount());
      // };
      // reader.readAsDataURL(blob);

      // var reader1 = new FileReader();
      // reader1.onload = async () => {
      //   console.log(reader1.result.toString('base64'));
      // };
      // reader1.readAsText(blob);
    })();
  }, []);

  // console.log("URI:",docUri);
  const resolveSize = (height: number, width: number) => {
    let maxAllowedWidth = Dimensions.get("screen").width * 0.9;
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

  const [dragContainerSize, setDragContainerSize] = useState(
    resolveSize(792, 612)
  );

  const [fieldSize, setFieldSize] = useState({
    height: 150,
    width: 150,
  });

  const handlePan = () => {
    let panX = Number(JSON.stringify(pan.x));
    let panY = Number(JSON.stringify(pan.y));
    let maxPanX = panX + fieldSize.width;
    let maxPanY = panY + fieldSize.height;

    // console.log(panX, panY);
    // console.log(dragContainerSize);
    // console.log(maxPanX, maxPanY);
    if (
      panX >= 0 &&
      panY >= 0 &&
      maxPanX <= dragContainerSize.width &&
      maxPanY <= dragContainerSize.height
    ) {
      // console.log("CALLED 1st");
      setDivPosition({ x: panX, y: panY });
    } else if (panX < 0 && panY >= 0) {
      // console.log("CALLED 2nd");
      if (maxPanY > dragContainerSize.height) {
        setDivPosition({
          x: 0,
          y: dragContainerSize.height - fieldSize.height,
        });
      } else {
        setDivPosition({ x: 0, y: panY });
      }
    } else if (panY < 0 && panX >= 0) {
      // console.log("CALLED 3rd");
      if (maxPanX > dragContainerSize.width) {
        setDivPosition({ x: dragContainerSize.width - fieldSize.width, y: 0 });
      } else {
        setDivPosition({ x: panX, y: 0 });
      }
    } else if (panX < 0 && panY < 0) {
      // console.log("CALLED 4th");
      setDivPosition({ x: 0, y: 0 });
    } else if (
      maxPanX > dragContainerSize.width &&
      maxPanY > dragContainerSize.height
    ) {
      // console.log("CALLED 5th");
      setDivPosition({
        x: dragContainerSize.width - fieldSize.width,
        y: dragContainerSize.height - fieldSize.height,
      });
    } else if (
      maxPanX > dragContainerSize.width &&
      maxPanY <= dragContainerSize.height
    ) {
      // console.log("CALLED 6th");
      setDivPosition({ x: dragContainerSize.width - fieldSize.width, y: panY });
    } else if (
      maxPanX <= dragContainerSize.width &&
      maxPanY > dragContainerSize.height
    ) {
      // console.log("CALLED 7th");
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
    width: savedFieldSize.x + differenceFieldSize.x!==0?savedFieldSize.x + differenceFieldSize.x:fieldSize.width,
    height: savedFieldSize.y + differenceFieldSize.y !==0?savedFieldSize.y + differenceFieldSize.y:fieldSize.height
  });
  }, [differenceFieldSize]);


  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
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
        // }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const FieldPanResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setTempDiffField({
            x: 0,
            y: 0,
          });
        },
        onPanResponderMove: (e: any, gesture: any) => {
          console.log(
            "onPanResponderMove",
            gesture.dx - tempDiffField.x,
            gesture.dy - tempDiffField.y
          );

          setDifferenceFieldSize({
            x: gesture.dx - tempDiffField.x,
            y: gesture.dy - tempDiffField.y,
          });
          setTempDiffField({
            x: gesture.dx,
            y: gesture.dy,
          });
        },
        onPanResponderRelease: (event, gesture) => {
        },
      })).current;

      FieldPanResponder.panHandlers.onResponderGrant = (e:any)=>{
        //console.log("PanResponder", fieldSize);
        setSavedFieldSize({ x: fieldSize.width, y: fieldSize.height });
      }

  return (
    <View className="p-3 h-full w-full">
      <View className="border">
        <Text className="text-red-500 text-lg">Hello</Text>
        <Text>TEST</Text>
      </View>
      {times(totalPages).map((v, i) => {
        return (
          <View key={i} className="relative h-full w-full">
            <View className="bg-transparent w-full h-full -z-10">
              <PdfView
                key={i}
                source={source}
                page={1}
                onLoadComplete={(page) => {
                  // console.log(page);
                }}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  height: dragContainerSize.height,
                  width: dragContainerSize.width,
                }}
              />
            </View>
            <View className="border absolute z-50 w-full h-full bg-transparent">
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
                    backgroundColor: "blue",
                    borderRadius: 5,
                  }}
                  {...panResponder.panHandlers}
                />
                <Animated.View
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: "transparent",
                    transform: [{ rotate: "-45deg" }],
                    top: -10,
                    right: -10,
                    alignSelf: "flex-end",
                    borderRadius: 5,
                  }}
                  {...FieldPanResponder.panHandlers}
                >
                  <ResizeIcon />
                </Animated.View>
              </Animated.View>
            </View>
          </View>
        );
      })}
      
    </View>
  );
}


