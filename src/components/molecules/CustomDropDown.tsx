import React, { useState } from "react";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import GetSvg from "../../utils/GetSvg";
import CustomSelector from "./CustomSelector";
interface CustomDropDownProps {
  items: any;
  onSelect: any;
  selectedValue: any;
  placeholder: string;
  setMainScrollState: any;
  width?: any;
  height?: any;
}
const CustomDropDown: React.FC<CustomDropDownProps> = ({
  items,
  onSelect,
  width,
  height,
  selectedValue,
  placeholder,
  setMainScrollState,
}) => {
  return (
    <CustomSelector
      dataList={items}
      dropDownItems={(item: any, index: any) => {
        return <Text className="px-4 text-xs ">{item?.label}</Text>;
      }}
      selectedItem={(item: any, index: any) => {
        return <Text>{selectedValue?.label}</Text>;
      }}
      setSelectedValue={onSelect}
      height={35}
      style={{
        height: 25,
      }}
    />
  );
};

export default CustomDropDown;
