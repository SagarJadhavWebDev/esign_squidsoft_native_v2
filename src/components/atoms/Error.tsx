import { useRef, useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
interface ErrorProps {
  text: string;
  classN?: string;
}
const Error: React.FC<ErrorProps> = ({ text, classN}: any) => {
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
    <Animatable.View className={`w-full ${classN} `} ref={viewElement}>
      <Animatable.Text className="text-red-600 text-sm font-medium px-3">
        {text}
      </Animatable.Text>
    </Animatable.View>
  );
};

export default Error;
