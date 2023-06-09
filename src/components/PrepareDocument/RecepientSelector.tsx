import { Image, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CustomSelector from "../molecules/CustomSelector";
import GetSvg from "../../utils/GetSvg";
import AppConfig from "../../constants/appConfig";
import ApiConfig from "../../constants/ApiConfig";
import colorList from "../../constants/colorList";

interface RecipientSelectorProps {
  recipients: any;
  selectedRecipient: any;
  setSelectedRecipient: any;
}
const RecipientSelector: React.FC<RecipientSelectorProps> = ({
  recipients,
  selectedRecipient,
  setSelectedRecipient,
}) => {
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
      dataList={recipients}
      setSelectedValue={setSelectedRecipient}
      selectedItem={(item, index) => (
        <View className=" w-full h-full bg-white rounded-xl flex flex-row pr-2">
          <View className="w-[25%] h-full justify-center items-center">
            {/* <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" /> */}
            <View className="w-10 h-10 justify-center items-center">
              {selectedRecipient?.user?.profile_picture ? (
                <Image
                  className="rounded-full bg-gray-300 shadow-2xl"
                  resizeMode="contain"
                  source={{
                    width: "60%",
                    height: "60%",
                    uri: selectedRecipient?.user?.profile_picture as any,
                  }}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: colorList?.[index],
                  }}
                  className=" w-3 h-3  rounded-full"
                ></View>
              )}
            </View>
          </View>
          <View className="w-[70%]  h-full flex items-start justify-center">
            <Text
              className="text-black text-[12px] font-semibold capitalize"
              numberOfLines={1}
            >
              {selectedRecipient?.user?.name}
            </Text>
            <Text
              className="text-gray-500 text-[10px] font-normal"
              numberOfLines={1}
            >
              {selectedRecipient?.user?.email}
            </Text>
          </View>
          <View className="w-[5%] justify-center items-center">
            <View
              style={{
                backgroundColor: colorList?.[index],
              }}
              className="w-3 h-3 rounded-full"
            ></View>
          </View>
        </View>
      )}
      dropDownItems={(item, index) => (
        <View className=" w-full h-full bg-white rounded-xl flex flex-row pr-2">
          <View className="w-[25%] h-full justify-center items-center">
            {/* <GetSvg name="documentIcon" pathStrokeWidth={1} classN="w-6 h-6" /> */}
            <View className="w-10 h-10 justify-center items-center">
              <Image
                className="rounded-full bg-gray-300 shadow-2xl"
                resizeMode="contain"
                source={{
                  width: "60%",
                  height: "60%",
                  uri: item?.user?.profile_picture,
                }}
              />
            </View>
          </View>
          <View className="w-[70%]  h-full flex items-start justify-center">
            <Text
              className="text-black text-[12px] font-semibold capitalize"
              numberOfLines={1}
            >
              {item?.user?.name}
            </Text>
            <Text
              className="text-gray-500 text-[10px] font-normal"
              numberOfLines={1}
            >
              {item?.user?.email}
            </Text>
          </View>
          <View className="w-[5%] justify-center items-center">
            <View
              style={{
                backgroundColor: colorList?.[index],
              }}
              className=" w-3 h-3  rounded-full"
            ></View>
          </View>
        </View>
      )}
    />
  );
};

export default RecipientSelector;
