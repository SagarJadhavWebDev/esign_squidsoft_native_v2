import { capitalize, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IndeterminateProgressBar from "../../components/atoms/IndeterminateProgressBar";
import ApiConfig from "../../constants/ApiConfig";
import useAuth from "../../utils/auth";
import DocumentPicker, { isInProgress } from "react-native-document-picker";
import { useToast } from "react-native-toast-notifications";
import UploadCredentialsController from "../../controllers/UploadCredentialsController";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import ManageStamps from "./ManageStamps";
interface SelectStampModalProps {
  modalType: string;
  setIsOpen: any;
  callback: any;
}

const SelectStampModal: React.FC<SelectStampModalProps> = ({
  modalType,
  setIsOpen,
  callback,
}) => {
  const [imgSrc, setImgSrc] = useState<any>(null);
  const { isLoading } = useAuth();

  return (
    <ScrollView className=" w-full text-start  flex flex-col content-center">
      <IndeterminateProgressBar loading={isLoading ?? false} />
      <Text className="text-black text-2xl capitalize font-semibold tracking-widest mx-5 pt-5 ">
        Select {modalType}
      </Text>
      <ManageStamps
        imgSrc={imgSrc}
        setIsOpen={setIsOpen}
        modalType={modalType}
        callback={callback}
        isSelectStamp={true}
      />
    </ScrollView>
  );
};

export default SelectStampModal;
