import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GetSvg from "../../utils/GetSvg";
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import CommonUtils from "../../utils/CommonUtils";
import EnvelopeController from "../../controllers/EnvelopeController";
import useAuth from "../../utils/auth";
import { isEmpty, isNull } from "lodash";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/atoms/Error";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import { useEnvelope, useRecipients } from "../../utils/useReduxUtil";
import { useDispatch } from "react-redux";
import {
  setEnvelopeStep,
  setIsLoading,
  setLoadingModal,
  setModalType,
} from "../../redux/reducers/uiSlice";
import EnvelopeService from "../../services/EnvelopeService";
import { setFixedFields } from "../../redux/reducers/PdfSlice";
import { setDocuments } from "../../redux/reducers/documentsSlice";
import { setRecipients } from "../../redux/reducers/RecipientSlice";
import { setEnvelope } from "../../redux/reducers/envelopeSlice";
import WFullInputField from "../../components/atoms/WFullInputField";
import AddRecipientsCard from "./AddRecipientsCard";
interface AddRecipientsProps {
  navigation: any;
}

const AddRecipients: React.FC<AddRecipientsProps> = ({ navigation }) => {
  const { recipients } = useRecipients();
  const envelope = useEnvelope();
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signByOrder, setSignByOrder] = useState(false);
  const handleSubmitRecipient = () => {
    dispatch(setIsLoading(true));
    const payloadRecipients = recipients?.map((user: any, index) => {
      const payloadRecipient = {
        name: user?.name ?? user?.user?.name,
        email: user?.email ?? user?.user?.email,
        order: index + 1 ?? user?.level,
        action: user?.action ?? user?.type,
      };
      return payloadRecipient;
    });
    const payload = {
      recipients: payloadRecipients,
      sign_by_order: signByOrder,
    };
    // console.log("DRAG PAYLOAd",payload);
    EnvelopeService.handleAddRecipients(
      payload,
      envelope?.id,
      toast,
      (data) => {
        if (data) {
          dispatch(setIsLoading(false));
          dispatch(setFixedFields(data?.document_fields));
          dispatch(setDocuments(data?.envelope_documents));
          dispatch(setRecipients(data?.envelope_recipients));
          dispatch(setEnvelope(data));
          dispatch(setEnvelopeStep(2));
        } else {
          dispatch(setIsLoading(false));
        }
        dispatch(setIsLoading(false));
      }
    );
  };

  // const reorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return dispatch(setRecipients(result));
  // };
  const toast = useToast();
  return (
    <SafeAreaView className="w-full h-full bg-white p-2 flex flex-col justify-between max-w-sm mx-auto">
      <View className=" bg-white w-full justify-start items-center">
        <AddRecipientsCard />
      </View>
      <View className=" w-full h-[10%] flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => {
            // setCurrentStep(0);
            dispatch(setEnvelopeStep(0));
          }}
          className=" bg-slate-800  rounded-full p-1.5 px-4"
        >
          <Text className="text-white text-xs font-extrabold">Prev </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // handleNext()
            if (recipients?.length) {
              handleSubmitRecipient();
            } else {
              toast.hide("recipients");
              toast.show("Please add atleast 1 recipients", {
                type: "error",
                id: "recipients",
              });
            }
          }}
          className=" bg-[#d10000] rounded-full p-1.5 px-4"
        >
          <Text className="text-white  text-xs font-extrabold">Next </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AddRecipients;
