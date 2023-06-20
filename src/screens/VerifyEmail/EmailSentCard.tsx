import { ActivityIndicator, Image, Text, View } from "react-native";
import AuthService from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/reducers/uiSlice";
import { useToast } from "react-native-toast-notifications";
import { useIsLoading } from "../../utils/useReduxUtil";
import React from "react";
import HttpService from "../../utils/HttpService";
import apiEndpoint from "../../constants/apiEndpoints";

interface EmailSentCardProps {
  route?: any;
}
const EmailSentCard: React.FC<EmailSentCardProps> = ({ route }) => {
  const { email, type } = route?.params;
  const dispatch = useDispatch();
  const toast = useToast();
  const isloading = useIsLoading();
  return (
    <React.Fragment>
      <View className="w-full h-full flex flex-col justify-center items-center px-5">
        <View className="border border-gray-200 rounded-3xl bg-white h-72 w-full p-8">
          <Text className="text-gray-500 text-base font-semibold">
            {type === "FORGOT_PASSWORD"
              ? "Forgot Password"
              : "Verify Your Email"}
          </Text>
          <Text className="text-gray-400 text-[11px] my-5 font-semibold">
            {type === "FORGOT_PASSWORD"
              ? "Password reset link has been sent to the e-mail id you provided."
              : "Account activation link has been sent to the e-mail id you provided."}
          </Text>
          <View className="w-full h-full flex justify-start items-center">
            <Image
              className="w-24 h-24"
              source={{
                uri: "https://esign.squidsoft.tech/static/media/mail-sent.1d05ef1b85cf74fbe1ec.gif",
              }}
            />
            <Text className="text-[10px] my-2 text-gray-500 w-full text-center">
              Didn't get the mail?{" "}
              <Text
                onPress={() => {
                  dispatch(setIsLoading(true));
                  if (type === "VERIFY_EMAIL") {
                    HttpService.post(apiEndpoint.auth.verifyEmail, {
                      body: JSON.stringify({ email: email }),
                    }).then((res) => {
                      toast.show(res?.message, {
                        type: res?.success ? "success" : "error",
                      });

                      dispatch(setIsLoading(false));
                    });
                  } else {
                    HttpService.post(apiEndpoint.auth.sendForgotLink, {
                      body: JSON.stringify({ email: email }),
                    }).then((res) => {
                      console.log("RESULt", res);
                      toast.show(res?.message, {
                        type: res?.success ? "success" : "error",
                      });

                      dispatch(setIsLoading(false));
                    });
                  }
                }}
                className="text-red-400"
              >
                Send it again
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {isloading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default EmailSentCard;
