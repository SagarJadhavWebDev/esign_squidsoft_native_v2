import { ActivityIndicator, Pressable, Text, View } from "react-native";
import GetSvg from "../../utils/GetSvg";
import { useAddresses } from "../../utils/useReduxUtil";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import Addressservice from "../../services/AddressService";
import { Address } from "../../types/AddressTypes";
import { TouchableOpacity } from "react-native";
import NoDataFound from "../../components/atoms/NoDataFound";
import AddAddressModal from "../../components/modals/AddAddressModal";
import { useDispatch } from "react-redux";
import { setAddresses } from "../../redux/reducers/AddressesSlice";
import { showAddressModal } from "../../redux/reducers/uiSlice";
interface ManageAddressProps {
  navigation: any;
  showHeader?: boolean;
}
const ManageAddress: React.FC<ManageAddressProps> = ({
  navigation,
  showHeader = true,
}) => {
  // const [address, setAddress] = useState<Address[]>();
  const address = useAddresses();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleGetAddress = () => {
    setIsLoading(true);
    Addressservice.handleGetAddresses(async (data) => {
      setIsLoading(false);
      const addresses = await data;
      dispatch(setAddresses(addresses));
    });
  };
  //console.log("address", address);
  useEffect(() => {
    handleGetAddress();
  }, []);

  return (
    <View className="bg-white p-0  w-full flex gap-y-3  items-center">
      {showHeader ? (
        <View className="w-full h-12 border-b border-gray-300 justify-between items-center flex flex-row   ">
          <Text className="text-base mx-5 font-semibold">
            {"Manage Address "}
          </Text>

          <Pressable
            onPress={() => {
              navigation.pop();
            }}
          >
            <GetSvg name="closeWithoutCircleIcon" classN="mx-3 w-5 h-5" />
          </Pressable>
        </View>
      ) : null}
      <View className="w-full px-5 h-full flex gap-y-3 items-center">
        {!isEmpty(address) && !isLoading ? (
          address?.map((a: any) => {
            return (
              <View
                key={a?.id}
                className="w-full flex flex-col border  border-gray-300  p-4 rounded-xl"
              >
                <View className="w-full flex flex-row gap-x-2 justify-start items-center  ">
                  <GetSvg
                    className="text-gray-900 h-7 w-[10%] my-3 rounded-full"
                    name="locationIcon"
                    strokeWidth={1.5}
                  />
                  <Text className="text-[12px]   font-medium text-gray-900 pl-1 w-[70%] ">
                    {a?.address_line} , {a?.street} , {a?.state} , {a?.country}{" "}
                    , {a?.postal_code}
                  </Text>
                  <View className=" w-[20%] flex flex-row justify-between items-center md:cursor-pointer">
                    <TouchableOpacity
                      onPress={() => {
                        setIsLoading(true);
                        Addressservice.handleSetDefaultAddresses(
                          a?.id,
                          (data) => {
                            dispatch(setAddresses(data?.reverse()));
                            setIsLoading(false);
                          }
                        );
                        console.log("ss");
                      }}
                    >
                      <GetSvg
                        name="tickIconRounded"
                        color={a?.default ? "green" : "black"}
                        className="w-3.5 h-3.5 "
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsLoading(true);
                        Addressservice.handleDeleteAddresses(a?.id, (data) => {
                          // setAddress(data);
                          dispatch(setAddresses(data));
                          setIsLoading(false);
                        });
                        console.log("sagar");
                      }}
                      //title="Delete Address"
                      className="p-1 rounded-full hover:bg-gray-300 "
                    >
                      <GetSvg name="deleteIcon" className="w-3.5 h-3.5" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        ) : isLoading ? (
          <View className="w-full h-full p-3 mx-auto flex flex-col justify-center items-center gap-y-6">
            <ActivityIndicator color="black" size={"large"} />
            <Text className="text-sm w-full text-center text-gray-500 font-semibold">
              Loading your addresses....{" "}
            </Text>
          </View>
        ) : isEmpty(address) ? (
          <View className="w-full h-full items-center justify-center">
            {showHeader ? (
              <NoDataFound
                width={200}
                height={200}
                title={"No Address Found"}
                subTitle="You don't have any address please add one"
              />
            ) : null}
            <TouchableOpacity className="flex mt-2 flex-row justify-center items-center rounded-xl bg-red-500 p-2">
              <Text
                onPress={() => {
                  dispatch(showAddressModal(true));
                }}
                className="text-white text-sm text-center font-semibold"
              >
                Create New Address
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {showHeader ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(showAddressModal(true));
          }}
          style={{
            bottom: 100,
            right: 20,
          }}
          className=" bg-[#d10000] p-2 absolute rounded-full "
        >
          <Text className="">
            <GetSvg name="addIcon" color="white" classN="w-8 h-8" />
          </Text>
        </TouchableOpacity>
      ) : null}
     <AddAddressModal /> 
    </View>
  );
};
export default ManageAddress;
