import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GetSvg from "../../utils/GetSvg";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import DocumentSelector from "../../components/PrepareDocument/DocumentSelector";
import RecipientSelector from "../../components/PrepareDocument/RecepientSelector";
import DocumentDiv from "./PrepareDocumentView/DocumentDiv";
import { FieldPayload } from "../../types/FieldTypes";
import HttpService from "../../utils/HttpService";
import apiEndpoints from "../../constants/apiEndpoints";
import useAuth from "../../utils/auth";
import CryptoHandler from "../../utils/EncryptDecryptHandler";
import { useToast } from "react-native-toast-notifications";
interface PrepareDocumentProps {
  envelope: any;
  setEnvelope: any;
  setCurrentStep: any;
  setIsLoading: any;
}

const PrepareDocument: React.FC<PrepareDocumentProps> = ({
  envelope,
  setEnvelope,
  setCurrentStep,
  setIsLoading,
}) => {
  const { token } = useAuth();
  const toast = useToast();
  const recipients = envelope?.recipients ?? [];
  console.log("recipients:", recipients);
  const documents = envelope?.documents ?? [];
  const [addedFields, setAddedFields] = useState<FieldPayload[]>([]);
  const [selectedRecepient, setSelectedRecipient] = useState<any>({
    option: recipients?.filter((r: any) => r.operation === "1")?.[0],
    index: 0,
  });
  const [selectedDocument, setSelectedDocument] = useState<any>({
    option: documents?.[0],
    index: 0,
  });

  const [selectedField, setSelectedField] = useState<any>(null);

  const fieldTypes = [
    {
      name: "Intials",
      type: "initial",
      icon: <GetSvg name="pencilIcon" classN="w-5 h-5" />,
      width: 200,
      height: 100,
      iconName: "pencilIcon",
    },
    {
      name: "Signature",
      type: "signature",
      icon: <GetSvg name="signatureIcon" classN="w-5 h-5" />,
      width: 200,
      height: 100,
      iconName: "signatureIcon",
    },
    {
      name: "Stamp",
      type: "stamp",
      icon: <GetSvg name="stampIcon" classN="w-5 h-5" strokeWidth={2} />,
      width: 200,
      height: 100,
      iconName: "stampIcon",
    },
    {
      name: "Text",
      type: "text",
      icon: <Text className="font-semibold text-base leading-5">Aa</Text>,
      width: 200,
      height: 100,
      iconName: "Aa",
    },
    {
      name: "Date",
      type: "date",
      icon: <GetSvg name="dateIcon" classN="w-5 h-5" />,
      width: 200,
      height: 100,
      iconName: "dateIcon",
    },
    {
      name: "Time",
      type: "time",
      icon: <GetSvg name="timeIcon" classN="w-5 h-5" />,
      width: 200,
      height: 100,
      iconName: "timeIcon",
    },
  ];

  useEffect(() => {
    if (token && envelope) {
      HttpService.get(apiEndpoints.getEnvelope(envelope?.id), {
        token: token ?? "",
      }).then((res) => {
        const data = CryptoHandler.response(res, token ?? "");
        const updatedFields = data.fields?.map((d: any, i: any) => {
          const v = d?.response_payload;
          const newData = { ...v, id: d?.id };
          return newData;
        });
        setAddedFields(updatedFields);
        console.log("ENEV", updatedFields);
        setEnvelope(data);
      });
    }
  }, []);

  const handleSubmitFields = () => {
    setIsLoading(true);
    HttpService.put(apiEndpoints.submitEnvelopeFields(envelope?.id), {
      body: JSON.stringify({ fields: addedFields }),
      token: token ?? "",
    }).then((res) => {
      if (res?.status) {
        setCurrentStep(3);
        setIsLoading(false);
      }
    });
  };
  console.log("SLECTED  DOCUMENT:", selectedDocument);

  return (
    <ScrollView className="w-full h-full bg-white p-2">
      <View className="w-full h-[90%]">
        <View className="flex flex-row w-full justify-between items-center">
          <View className="w-[48%]">
            <Text className="px-2 py-1 text-xs">Select Recipient</Text>
            {recipients && (
              <RecipientSelector
                recipients={recipients?.filter((r: any) => r.operation === "1")}
                selectedRecipient={selectedRecepient}
                setSelectedRecipient={setSelectedRecipient}
              />
            )}
          </View>
          <View className="w-[48%]">
            <Text className="px-2 py-1 text-xs">Select Document</Text>
            {documents && (
              <DocumentSelector
                selectedDocument={selectedDocument}
                setSelectedDocument={setSelectedDocument}
                documents={documents}
              />
            )}
          </View>
        </View>
        <View className="w-full max-w-sm mx-auto h-10 my-3 flex flex-row justify-around items-center">
          {fieldTypes?.map((f) => {
            return (
              <TouchableOpacity
                key={f.name}
                onPress={() => setSelectedField(f)}
                className=" border border-gray-300 rounded-full justify-center items-center p-2"
              >
                {f?.icon}
              </TouchableOpacity>
            );
          })}
        </View>
        <View className="w-full  ">
          <DocumentDiv
            envelope={envelope}
            setEnvelope={setEnvelope}
            setCurrentStep={setCurrentStep}
            selectedRecipient={selectedRecepient}
            selectedDocument={selectedDocument}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            addedFields={addedFields}
            setAddedFields={setAddedFields}
          />
        </View>
      </View>
      <View className=" w-full h-[10%] z-50 flex flex-row justify-between items-center mb-5">
        <TouchableOpacity
          onPress={() => {
            setCurrentStep(1);
          }}
          className=" bg-slate-800 rounded-full p-1.5 px-4"
        >
          <Text className="text-white text-xs font-extrabold">Prev </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (addedFields?.length) {
              handleSubmitFields();
            } else {
              console.log("Pls add atleat 1 field ");
            }
          }}
          className={`rounded-full  p-1.5 px-4 ${
            addedFields?.length ? "bg-[#d10000]" : "bg-[#ef9393]"
          }`}
        >
          <Text className="text-white text-xs font-extrabold ">Next </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default PrepareDocument;
