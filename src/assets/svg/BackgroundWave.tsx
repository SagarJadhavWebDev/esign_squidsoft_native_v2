import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
interface BackgroundWavePorps {
  style?: any;
  className?: string;
}
const BackgroundWave = ({ style, className }: BackgroundWavePorps) => {
  return (
    <View style={style} className={className}>
      <View style={{ backgroundColor: "#d71a1a", width: "100%", height: 100 }}>
        <Svg
          viewBox="0 0 1440 700"
          width={"100%"}
          height={200}
          style={{ position: "absolute", top: 86 }}
          // xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <Path
            fill="#d71a1a"
            d="m0 32 48 10.7C96 53 192 75 288 74.7 384 75 480 53 576 85.3 672 117 768 203 864 250.7c96 48.3 192 58.3 288 48 96-10.7 192-42.7 240-58.7l48-16V0H0Z"
          />
          {/* <Path
            d="M1440 0v350c-143.321-25.179-286.643-50.357-411-22-124.357 28.357-229.75 110.25-347 92S435.643 283.357 320 255 102.179 288.321 0 350V0Z"
            fill="#d71a1a"
            // className="transition-all duration-300 ease-in-out delay-150 path-0"
          /> */}
        </Svg>
      </View>
    </View>
  );
};
export default BackgroundWave;

{
  /* <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
<Path
  fill="#d71a1a"
  d="m0 32 48 10.7C96 53 192 75 288 74.7 384 75 480 53 576 85.3 672 117 768 203 864 250.7c96 48.3 192 58.3 288 48 96-10.7 192-42.7 240-58.7l48-16V0H0Z"
/>
</Svg> */
}
