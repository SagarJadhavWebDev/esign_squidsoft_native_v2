import React, { ReactNode, useState } from "react";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import GetSvg from "../../utils/GetSvg";
interface CustomSelectorProps {
  dataList: any;
  selectedItem: (selectedItem: any, index: number) => React.ReactNode;
  dropDownItems: (
    selectedItem: any,
    index: number,
    isSelected?: boolean
  ) => React.ReactNode;
  setSelectedValue: any;
  width?: any;
  height?: any;
  style?: any;
}
const CustomSelector: React.FC<CustomSelectorProps> = ({
  dataList,
  selectedItem,
  width,
  height,
  setSelectedValue,
  dropDownItems,
  style,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <SelectDropdown
      dropdownIconPosition="right"
      buttonStyle={{
        width: width ?? "100%",
        height: height ?? 40,
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: 10,
      }}
      renderDropdownIcon={() => (
        <View className="w-auto h-full border border-gray-50 justify-center items-center">
          {isOpen ? (
            <GetSvg name="rightArrowIcon" classN="w-5 h-5" />
          ) : (
            <GetSvg name="arrowDownIcon" classN="w-5 h-5" />
          )}
        </View>
      )}
      defaultValueByIndex={0}
      data={dataList}
      dropdownOverlayColor={"transparent"}
      renderCustomizedButtonChild={
        //() =>
        // <View className=" w-full h-full flex flex-row">
        //   <View className="w-1/4 h-full justify-center items-center">
        //     <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" />
        //   </View>
        //   <View className="w-3/4  h-full flex items-start justify-center">
        //     <Text
        //       className="text-black text-base font-semibold"
        //       numberOfLines={1}
        //     >
        //       {selectedDocument?.name}
        //     </Text>
        //   </View>
        // </View>
        selectedItem
      }
      onFocus={() => {
        setIsOpen(true);
      }}
      onBlur={() => {
        setIsOpen(false);
      }}
      onSelect={(e, index) => {
        console.log(e, index);
        setSelectedValue({ option: e, index: index });
      }}
      dropdownStyle={{
        backgroundColor: "white",
        borderRadius: 10,
      }}
      renderCustomizedRowChild={
        dropDownItems
        // (item) => (
        // // <View className=" w-full h-full bg-white rounded-xl flex flex-row">
        // //   <View className="w-1/4 h-full justify-center items-center">
        // //     <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" />
        // //   </View>
        // //   <View className="w-3/4  h-full flex items-start justify-center">
        // //     <Text
        // //       className="text-black text-base font-semibold"
        // //       numberOfLines={1}
        // //     >
        // //       {item?.name}
        // //     </Text>
        // //   </View>
        // // </View>

        //)
      }
      rowStyle={style ?? null}
    />
  );
};

export default CustomSelector;
