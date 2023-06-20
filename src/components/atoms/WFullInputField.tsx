import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  TextInputProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import * as Animatable from "react-native-animatable";
import { useRef, useEffect, useState } from "react";

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
  toggleIcon?: boolean;
  svgIcon1?: any;
  svgIcon2?: any;
  ref?: any;
}
const WFullInputField: React.FC<WFullInputFieldProps> = ({
  error,
  toggleIcon = true,
  svgIcon1,
  svgIcon2,
  ref,
  ...props
}) => {
  return (
    <>
      <View className="border-gray-200 border-solid border rounded-lg text-xl p-2 px-3 my-2 flex flex-row justify-between">
        <TextInput
          ref={ref}
          //   secureTextEntry={!showPassword}
          //   onChangeText={setPassword}
          //   value={password}
          // placeholder="Password"
          className="text-xl w-11/12"
          {...props}
        ></TextInput>
        {svgIcon1 && <>{toggleIcon ? svgIcon1 : svgIcon2}</>}
      </View>
      {error && <Error text={error} />}
    </>
  );
};
export default WFullInputField;
