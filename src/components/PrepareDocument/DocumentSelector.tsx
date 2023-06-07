import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CustomSelector from "../molecules/CustomSelector";
import GetSvg from "../../utils/GetSvg";

interface DocumentSelectorProps {
  documents: any;
  selectedDocument: any;
  setSelectedDocument: any;
}
const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documents,
  selectedDocument,
  setSelectedDocument,
}) => {
  //console.log("setSelectedDocument", selectedDocument);
  return (
    // <SelectDropdown
    //   dropdownIconPosition="right"
    //   buttonStyle={{
    //     width: "50%",
    //     height: 40,
    //     backgroundColor: "white",
    //     borderColor: "lightgrey",
    //     borderWidth: 1,
    //     borderRadius: 10,
    //   }}
    //   renderDropdownIcon={() => (
    //     <View className="w-auto h-full border border-gray-50 justify-center items-center">
    //       {isOpen ? (
    //         <GetSvg name="rightArrowIcon" classN="w-5 h-5" />
    //       ) : (
    //         <GetSvg name="arrowDownIcon" classN="w-5 h-5" />
    //       )}
    //     </View>
    //   )}
    //   //defaultValue="xys"
    //   defaultValueByIndex={0}
    //   buttonTextStyle={{ backgroundColor: "yellow" }}
    //   data={documents}
    //   dropdownOverlayColor={"transparent"}
    //   renderCustomizedButtonChild={() => (
    //     <View className=" w-full h-full flex flex-row">
    //       <View className="w-1/4 h-full justify-center items-center">
    //         <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" />
    //       </View>
    //       <View className="w-3/4  h-full flex items-start justify-center">
    //         <Text
    //           className="text-black text-base font-semibold"
    //           numberOfLines={1}
    //         >
    //           {selectedDocument?.name}
    //         </Text>
    //       </View>
    //     </View>
    //   )}
    //   onFocus={() => {
    //     setOpen(true);
    //   }}
    //   onBlur={() => {
    //     setOpen(false);
    //   }}
    //   onSelect={(e, index) => {
    //     console.log(e, index);
    //     setSelectedDocument(e);
    //   }}
    //   dropdownStyle={{
    //     backgroundColor: "white",
    //     borderRadius: 10,
    //   }}
    //   renderCustomizedRowChild={(item) => (
    //     <View className=" w-full h-full bg-white rounded-xl flex flex-row">
    //       <View className="w-1/4 h-full justify-center items-center">
    //         <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" />
    //       </View>
    //       <View className="w-3/4  h-full flex items-start justify-center">
    //         <Text
    //           className="text-black text-base font-semibold"
    //           numberOfLines={1}
    //         >
    //           {item?.name}
    //         </Text>
    //       </View>
    //     </View>
    //   )}
    // />
    <CustomSelector
      dataList={documents}
      setSelectedValue={setSelectedDocument}
      selectedItem={() => (
        <View className=" w-full h-full flex flex-row">
          <View className="w-1/4 h-full justify-center items-center">
            <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" />
          </View>
          <View className="w-3/4  h-full flex items-start justify-center">
            <Text
              className="text-black text-[12px] font-semibold capitalize"
              numberOfLines={1}
            >
              {selectedDocument?.name}
            </Text>
            <Text
              className=" text-gray-500 text-[10px] font-normal"
              numberOfLines={1}
            >
              {selectedDocument?.id}
            </Text>
          </View>
        </View>
      )}
      dropDownItems={(item) => (
        <View className=" w-full h-full bg-white rounded-xl flex flex-row">
          <View className="w-1/4 h-full justify-center items-center">
            <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" />
          </View>
          <View className="w-3/4  h-full flex items-start justify-center">
            <Text
              className="text-black text-[12px] font-semibold capitalize"
              numberOfLines={1}
            >
              {item?.name}
            </Text>
            <Text
              className=" text-gray-500 text-[10px] font-normal"
              numberOfLines={1}
            >
              {item?.id}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default DocumentSelector;
