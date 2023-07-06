import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, TextInputProps } from "react-native";
import * as Animatable from "react-native-animatable";

interface InputTextBoxProps {
  editingState: boolean;
  error?: string | null;
  toggleIcon?: boolean;
  svgIcon1?: any;
  svgIcon2?: any;
}

type InputProps = TextInputProps & InputTextBoxProps;

const InputTextBox: FunctionComponent<InputProps> = ({
  editingState,
  error,
  toggleIcon = true,
  svgIcon1,
  svgIcon2,
  ...props
}) => {
  const refInput = useRef<TextInput>(null);

  if (editingState) {
    refInput.current?.focus();
  } else {
    refInput.current?.blur();
  }
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
  return (
    <React.Fragment>
      <View
        className="border-gray-200 border-solid border rounded-lg text-xl p-2 px-3 my-2 flex flex-row justify-between"
        // pointerEvents={editingState ? "auto" : "none"}
      >
        <TextInput
          className="text-xl w-11/12"
          {...props}
          ref={refInput}
          multiline={false}
        ></TextInput>
        {svgIcon1 && <>{toggleIcon ? svgIcon1 : svgIcon2}</>}
      </View>
      {error && <Error text={error} />}
    </React.Fragment>
  );
};
export default InputTextBox;
