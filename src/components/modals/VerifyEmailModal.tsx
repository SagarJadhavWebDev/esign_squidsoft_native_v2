import { isEmpty, isString } from "lodash";
import { useState } from "react";
import { Text, View } from "react-native";
import WFullInputField from "../atoms/WFullInputField";
import CustomModal from "./CustomModal";
import Error from "../atoms/Error";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import useAuth from "../../utils/auth";
import { useToast } from "react-native-toast-notifications";

interface VerifyEmailModalProps {
  setIsOpen: any;
  user: any;
  token: string;
  isOpen: boolean;
}
const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  setIsOpen,
  user,
  token,
  isOpen,
}) => {
  const [otpValue, setOtpValue] = useState<any>(null);
  const [otpError, setOtpError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { RefreshUser } = useAuth();
  const handleSubmit = () => {
    setIsLoading(true);
    const payload = {
      email: user?.email,
      otp: otpValue,
    };
    if (isEmpty(otpValue)) {
      setOtpError("Please enter valid otp ");
      return;
    }
    HttpService.post(apiEndpoints.verifyEmail, {
      token: token,
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("SUBMIT OTP", res, payload);
        setIsLoading(false);
        RefreshUser && RefreshUser(token);
        setIsOpen(false);
        setOtpValue(null);
        if (res?.message) {
          toast.show(res?.message, { type: "success" });
        }
      })
      .catch((err) => {
        console.log("VERIFY EMAIL ERR", err);
        setOtpValue(null);
      });
  };

  return (
    <CustomModal
      children={
        <View className="w-full">
          <Text className=" mx-1 text-gray-400 font-medium text-xs">
            Enter otp
          </Text>
          <WFullInputField
            textContentType="oneTimeCode"
            keyboardType="number-pad"
            placeholder="Enter Otp"
            onChangeText={(e: any) => {
              setOtpValue(e);
            }}
            value={otpValue}
            className="h-5 text-sm"
          />
          {isString(otpError) ? (
            <Error text={otpError} classN="text-center items-center mb-5" />
          ) : null}
          <Text className=" mx-1  text-gray-400 font-medium text-xs text-center">
            OTP has been sent on your register email id
          </Text>
        </View>
      }
      handleCancel={() => setIsOpen(false)}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Verify Email"
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default VerifyEmailModal;
