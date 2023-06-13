import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import WFullInputField from "../../components/atoms/WFullInputField";
import TemplateListCard from "../../components/Templates/TemplateListCard";
import apiEndpoints from "../../constants/apiEndpoints";
import { TemplateCategoryType, TemplateType } from "../../types/TemplateType";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import GetSvg from "../../utils/GetSvg";
import HttpService from "../../utils/HttpService";
import { handleGetTemplates } from "../../services/TemplatesService";
import { useDispatch } from "react-redux";
import { setTemplates } from "../../redux/reducers/TemplatesSlice";
import { useTemplates } from "../../utils/useReduxUtil";
interface TemplatesProps {
  navigation: any;
  setIsLoading: any;
}
const Templates: React.FC<TemplatesProps> = ({ setIsLoading, navigation }) => {
  const { token } = useAuth();

  //const [templates, setTemplates] = useState<TemplateType[] | null>(null);
  const [allTemplates, setAllTemplates] = useState<TemplateType[] | null>(null);
  const [categories, setCategories] = useState<TemplateCategoryType[] | null>(
    null
  );
  const templates = useTemplates();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const getTemplates = () => {
    setIsLoading && setIsLoading(true);

    handleGetTemplates(1, 5, (data) => {
      //console.log("TEMPLATES", data);
      if (data) {
        dispatch(setTemplates(data));
        setIsLoading && setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };
 
  useEffect(() => {
    getTemplates();
  }, []);

  useEffect(() => {
    if (selectedCategory?.id !== 0) {
      allTemplates &&
        setTemplates(
          allTemplates?.filter(
            (item) => item?.category?.id === selectedCategory?.id
          )
        );
    } else {
      setTemplates(allTemplates);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (searchText?.length >= 3) {
      const searchData =
        selectedCategory?.id !== 0
          ? allTemplates &&
            allTemplates
              .filter((f: any) => f?.category?.id === selectedCategory?.id)
              .filter((f: any) => {
                //console.log();
                return Object.values(f)
                  .join("")
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              })
          : allTemplates &&
            allTemplates.filter((f: any) => {
              return Object.values(f)
                .join("")
                .toLowerCase()
                .includes(searchText.toLowerCase());
            });
      setTemplates(searchData);
    } else {
      const data =
        selectedCategory?.id !== 0
          ? allTemplates &&
            allTemplates.filter((f: any) => {
              return f?.category?.id === selectedCategory?.id;
            })
          : allTemplates;
      setTemplates(data);
    }
  }, [searchText]);

  const dimensions = useWindowDimensions();

  return (
    <View className="bg-white">
      {/* <View className="absolute text-center z-10   top-0 bottom-32 left-0 right-0 justify-center align-middle items-center">
        <ActivityIndicator className="text-4xl" size="large" color="#d10000" />

      </View> */}
      {/* <View
        style={{
          paddingHorizontal: 8,
          width: Dimensions.get("window").width,
          height: 45,
        }}
        className="flex flex-row justify-between items-center"
      >
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.32,
            shadowRadius: 0.26,
            elevation: 2,
          }}
          className="w-full h-full "
        >
          <WFullInputField
            onChangeText={setSearchText}
            className="text-sm"
            svgIcon1={<GetSvg name="searchIcon" classN="w-5 h-5 my-auto" />}
          />
        </View>
        <View className="w-1/6 h-full justify-center items-center">
          <View className="border border-white p-2.5 rounded-xl bg-[#e24343]">
            <GetSvg name="filterIcon" color="white" classN="w-6 h-6" />
          </View>
        </View>
      </View> */}
     
      <ScrollView
        style={{
          paddingHorizontal: 8,
          width: dimensions.width,
          height: dimensions.height ,
        }}
        contentContainerStyle={{
          paddingBottom: 90,
        }}
        className="bg-white "
      >
        {templates?.data &&
          templates?.data?.map((template) => {
            return (
              <TemplateListCard
                key={template?.id}
                template={template}
                navigation={navigation}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};
export default Templates;
