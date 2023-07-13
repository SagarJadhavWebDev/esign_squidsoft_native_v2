import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux/store";
interface LoadingModalProps {}
const LoadingModal: React.FC<LoadingModalProps> = () => {
  const isLoading = useSelector(
    (state: ApplicationState) => state?.ui?.showLoadingModal
  );
  const modalType = useSelector(
    (state: ApplicationState) => state?.ui?.modalType
  );
  if (!isLoading) return null;
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        position: "absolute",
        backgroundColor: "rgba(17, 24, 39, 0.5)",
      }}
    >
      <View
        style={{
          padding: 30,
          paddingBottom: 20,
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
          width: "auto",
          backgroundColor: "white",
          borderRadius: 25,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"gray"} />
        <Text
          style={{
            marginTop: 30,
            width: "100%",
          }}
        >
          {`${modalType}  `}
        </Text>
      </View>
    </View>
  );
};

export default LoadingModal;
