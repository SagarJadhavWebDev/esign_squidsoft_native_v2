import React from "react";
import Router from "./src/screens/Router";
import { AuthProvider } from "./src/utils/auth";
import "./ignoreWarnings";
import { Text, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import GetSvg from "./src/utils/GetSvg";
import { StripeProvider } from "@stripe/stripe-react-native";
import ApiConfig from "./src/constants/ApiConfig";
import { Provider } from "react-redux";
import store from "./src/redux/store";
export default function App() {
  const switchIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <View className="w-5  h-5 justify-center items-center rounded-full bg-[#61d345]">
            <GetSvg
              name={"tickIcon"}
              classN="w-4 h-4"
              color="white"
              pathStrokeWidth={3}
            />
          </View>
        );
      case "error":
        return (
          <View className="w-5  h-5 justify-center items-center rounded-full bg-[#d10000]">
            <GetSvg
              name={"closeWithoutCircleIcon"}
              classN="w-3 h-3"
              color="white"
              pathStrokeWidth={2.5}
            />
          </View>
        );
      case "warning":
        return (
          <View className="w-5  h-5 justify-center items-center rounded-full bg-[#f59e0b]">
            <GetSvg
              name={"warningIcon"}
              classN="w-5 h-5"
              color="white"
              pathStrokeWidth={0.5}
            />
          </View>
        );

      default:
        return null;
    }
  };
  
  return (
    <React.Fragment>
       <Provider store={store}>
      <StripeProvider
        publishableKey={ApiConfig.STRIPE_KEY}
        threeDSecureParams={{
          backgroundColor: "#d10000",
        }}
      >
        <ToastProvider
          placement="bottom"
          duration={2000}
          animationType="slide-in"
          successColor="#16a34a"
          animationDuration={500}
          swipeEnabled={true}
          offsetBottom={90}
          renderToast={(toastOptions) => (
            <View className="bg-white w-fit max-w-[80%] p-1 -z-50 h-fit rounded-full  border border-gray-200 flex flex-row ">
              <View className=" max-w-[10%] h-full justify-center items-center">
                {switchIcon(toastOptions.type ?? "")}
              </View>
              <View className="justify-center max-w-[90%] p-1 items-start mx-1 text-center">
                <Text
                  className="text-black font-bold text-center font-poppins"
                  adjustsFontSizeToFit={true}
                >
                  {toastOptions.message}{" "}
                </Text>
              </View>
            </View>
          )}
        >
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ToastProvider>
      </StripeProvider>
      </Provider>
    </React.Fragment>
  );
}
