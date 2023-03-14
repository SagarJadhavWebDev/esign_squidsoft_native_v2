import { View, Text } from "react-native";
import GetSvg from "../../utils/GetSvg";

interface NoDataFoundProps {
  width: string|number;
  height: string|number;
  title?: string;
  subTitle?: string;
}
const NoDataFound: React.FC<NoDataFoundProps> = ({
  width,
  height,
  title = "No Data Found ",
  subTitle,
}) => {
  return (
    <>
      <View
        style={{
          width: width,
          height: height,
        }}
      >
        <GetSvg name="noDataFoundIcon" classN={`h-full w-full border mb-1  `} />
      </View>
      <Text className="font-semibold w-full text-gray-600 text-xl my-1 mt-3 text-center">{title}{" "}</Text>
      {subTitle ? <Text className="text-xs w-full text-center">{subTitle}{" "}</Text> : null}
    </>
  );
};

export default NoDataFound;
