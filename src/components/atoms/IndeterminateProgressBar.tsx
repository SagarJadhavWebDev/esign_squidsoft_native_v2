import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, View } from "react-native";

interface IndeterminateProgressBarProps {
  loading: boolean;
  innerColor?: string;
}

const IndeterminateProgressBar: React.FC<IndeterminateProgressBarProps> = ({
  loading = false,
  innerColor,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get("screen").width;
  useEffect(() => {
    if (loading) {
      startLoader();
    }
  }, [loading]);

  const startLoader = () => {
    Animated.timing(progressWidth, {
      toValue: width * 0.7,
      duration: 500,
      useNativeDriver: false,
    }).start((result) => {});
    Animated.timing(progressAnim, {
      delay: 250,
      toValue: width,
      duration: 1000,
      useNativeDriver: false,
    }).start((result) => {
      if (loading) {
        progressAnim.setValue(0);
        progressWidth.setValue(0);
        startLoader();
      }
    });
  };
  return (
    <View
      className={`w-full h-1 z-48 bg-[#b7b7b799]  absolute top-0 ${
        loading ? "visible" : "hidden"
      }`}
    >
      <Animated.View
        className={` h-full ${innerColor ? innerColor : " bg-[#d10000]"} `}
        style={{
          width: progressWidth,
          transform: [{ translateX: progressAnim }],
        }}
      ></Animated.View>
    </View>
  );
};
export default IndeterminateProgressBar;
