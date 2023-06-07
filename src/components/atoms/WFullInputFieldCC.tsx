import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInputProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import * as Animatable from "react-native-animatable";
import { useRef, useEffect, useState } from "react";
import PhoneInput from "react-native-phone-number-input";

const Error = ({ text }: any) => {
  const viewElement = useRef(null as any);
  const [alreadyDispalyed, setDisplayed] = useState(false);

  useEffect(() => {
    if (alreadyDispalyed) {
      viewElement?.current.shake(); //animate("shake", 500, "linear");
    } else {
      setDisplayed(true);
      viewElement?.current.bounceIn(); //animate("bounceInDown", 500, "linear");
    }
  }, [text]);
  return (
    <Animatable.View className="w-full " ref={viewElement}>
      <Animatable.Text className="text-red-600 text-sm font-medium px-3">
        {text}
      </Animatable.Text>
    </Animatable.View>
  );
};

interface WFullInputFieldProps extends TextInputProps {
  error?: string | null;
  setPhoneNumber?: any;
  setCountryCode?: any;
  setPhoneNumberLength?: any;
  toggleIcon?: boolean;
  svgIcon1?: any;
  svgIcon2?: any;
  height?: any;
  defaultValue?: any;
  phoneCodeFontSize?: any;
}
const WFullInputFieldCC: React.FC<WFullInputFieldProps> = ({
  error,
  setPhoneNumber,
  setCountryCode,
  setPhoneNumberLength,
  toggleIcon = true,
  svgIcon1,
  svgIcon2,
  height = 12,
  defaultValue,
  phoneCodeFontSize = 20,
  ...props
}) => {
  const [value, setValue] = useState("");
  const phoneRef = useRef<PhoneInput>(null);
  const [maxAllowedPhoneNumberLength, setMaxAllowedPhoneLength] = useState(100);

  useEffect(() => {
    if (phoneRef?.current) {
    }
  }, []);

  useEffect(() => {
    const callingCode = phoneRef.current?.getCallingCode();
    const callingNumber =
      phoneRef.current?.getNumberAfterPossiblyEliminatingZero().number;
    const isPhoneValid = phoneRef.current?.isValidNumber(callingNumber ?? "");
    if (isPhoneValid) {
      setMaxAllowedPhoneLength(callingNumber?.length ?? 0);
    } else {
      setMaxAllowedPhoneLength(100);
    }
    setCountryCode(callingCode);
    setPhoneNumber(callingNumber);
    setPhoneNumberLength(maxAllowedPhoneNumberLength);
    // console.log("CALLING CODE:", phoneRef.current?.getCallingCode());
    // console.log(
    //   "CALLING CODE:",
    //   phoneRef.current?.getNumberAfterPossiblyEliminatingZero()
    // );
    // console.log(
    //   "CALLING CODE:",
    //   phoneRef.current?.isValidNumber(
    //     phoneRef.current?.getNumberAfterPossiblyEliminatingZero().number
    //   )
    // );
    // console.log("CALLING CODE:",phoneRef.current?.getCallingCode())
  }, [value]);

  return (
    <>
      <View
        className={`border-gray-200 border-solid border h-${height} p-0 rounded-lg my-2 flex flex-row justify-between`}
      >
        <PhoneInput
          ref={phoneRef}
          defaultValue={defaultValue ?? value}
          // defaultCode="IN"
          layout="first"
          onChangeText={(text) => {
           // console.log(text);
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
           // console.log(text);
          }}
          // {...props}
          flagButtonStyle={{ backgroundColor: "transparent" }}
          containerStyle={{
            backgroundColor: "transparent",
            width:'91.66%',
            padding: 0,
            margin: 0,
          }}
          textInputStyle={{
            backgroundColor: "transparent",
            fontSize: 16,
            padding: 0,
          }}
          textInputProps={{ ...props, maxLength: maxAllowedPhoneNumberLength }}
          textContainerStyle={{
            backgroundColor: "transparent",
            height: "100%",
            paddingHorizontal: 0,
            paddingVertical: 0,
            margin: 0,
          }}
          codeTextStyle={{
            backgroundColor: "transparent",
            fontSize: phoneCodeFontSize ?? 20,
            fontWeight: "400",
          }}
          countryPickerButtonStyle={{
            backgroundColor: "transparent",
            height: "100%",
            width: "20%",
          }}
          // withDarkTheme
          // withShadow
          // autoFocus
        />
        {/* <TextInput
          //   secureTextEntry={!showPassword}
          //   onChangeText={setPassword}
          //   value={password}
          // placeholder="Password"
          className="text-xl w-11/12"
          {...props}
        ></TextInput> */}
        {svgIcon1 && (
          <>
            {toggleIcon ? (
              <View className="my-auto mr-3">{svgIcon1}</View>
            ) : (
              svgIcon2
            )}
          </>
        )}
      </View>
      {error && <Error text={error} />}
    </>
  );
};
export default WFullInputFieldCC;
