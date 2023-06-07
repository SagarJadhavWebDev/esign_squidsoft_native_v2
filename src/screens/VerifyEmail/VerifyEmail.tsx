import { useEffect } from "react";
import useAuth from "../../utils/auth";
import ApiInstance from "../../services/ApiInstance";
import { useToken } from "../../utils/useReduxUtil";
import { useDispatch } from "react-redux";
import apiEndpoint from "../../constants/apiEndpoints";
import { setUser } from "../../redux/reducers/userSlice";
import { ActivityIndicator, Text, View } from "react-native";
import React from "react";
import ApiConfig from "../../constants/ApiConfig";
import { useToast } from "react-native-toast-notifications";

interface VerifyEmailProps {
  naviagtion?: any;
  route?: any;
}
const VerifyEmail: React.FC<VerifyEmailProps> = ({ route }) => {
  const { token: verifyToken } = route?.params;
  const token = useToken();
  const { SignIn } = useAuth();
  const toast = useToast();
  // const location = useLocation();

  // const naviagtion = useNavigate();
  const value = verifyToken?.split("/verify/")?.[1];
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("VERIFY TOKEN",ApiConfig.API_URL+ apiEndpoint.auth.verifyEmail + value);
    if (!token) {
      ApiInstance.get(apiEndpoint.auth.verifyEmail + value).then((res: any) => {
        if (res?.status === 200) {
          if (res?.data?.success) {
            SignIn &&
              SignIn(res?.data?.data?.token, () => {
                dispatch(setUser(res?.data?.data?.user));
              });
          }
        }
      });
    }
  }, []);
  return (
    <React.Fragment>
      <View className="w-full h-full flex flex-col justify-center items-center px-5">
        <View className="border border-gray-200 rounded-3xl bg-white h-56 w-full p-8">
          <Text className="text-gray-500 text-base font-semibold">
            Verifying your account...
          </Text>
          <Text className="tex``xt-gray-400 text-[11px] my-5 font-semibold">
            Account verification is in progress please wait...
          </Text>
          <View className="w-full my-5 h-full flex justify-start items-center">
            <ActivityIndicator color={"red"} size={"large"} />
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default VerifyEmail;
