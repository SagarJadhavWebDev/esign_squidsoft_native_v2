import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  TextProps,
} from "react-native";

interface WFullBlackButtonProps extends TextProps {
  text: string;
  onPress: () => void;
}

const WFullBlackButton: React.FC<WFullBlackButtonProps> = ({
  text,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        "border-gray-200 border-solid border rounded-lg bg-black  p-2 my-2"
      }
    >
      <Text {...props} className="text-xl text-center text-white font-bold">
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default WFullBlackButton;
