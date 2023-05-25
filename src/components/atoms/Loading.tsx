import { ActivityIndicator, Text, View } from "react-native";
import { useIsLoading } from "../../utils/useReduxUtil";
import React from "react";

const Loading = () => {
  const isLoading = useIsLoading();
  return isLoading ? (
    <View className="absolute w-full h-full bg-[#00000055] flex flex-col justify-center content-center items-center">
      <View className="p-5 flex justify-center items-center rounded-3xl bg-white">
        <ActivityIndicator size={"large"} className="p-2 " color={"gray"} />
        <Text className="text-black px-2">Loading...</Text>
      </View>
    </View>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default Loading;
