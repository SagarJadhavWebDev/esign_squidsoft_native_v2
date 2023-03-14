import { isEmpty, isNumber, isObject } from "lodash";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import IndeterminateProgressBar from "../../components/atoms/IndeterminateProgressBar";
import Stepper from "../../components/molecules/Stepper";
import routes from "../../constants/routes";
import useAuth from "../../utils/auth";
import GetSvg from "../../utils/GetSvg";
import AddRecipients from "./AddRecipients";
import PrepareDocument from "./PrepareDocument";
import SendEnvelope from "./SendEnvelope";
import UploadDocuments from "./UploadDocuments";

interface CreateEnvelopeProps {
  navigation: any;
  route?: any;
}

const CreateEnvelope: React.FC<CreateEnvelopeProps> = ({
  navigation,
  route,
}) => {
  // const { step, existingEnvelope } = route?.params;
  console.log("STEP:", route?.params?.step, route?.params?.existingEnvelope);
  const [currentStep, setCurrentStep] = useState<any>(route?.params?.step ?? 0);
  const steps: any = [
    {
      name: "Upload Documents",
    },
    {
      name: "Add Recepients",
    },
    {
      name: "Prepare",
    },
    {
      name: "Review and Send",
    },
  ];
  const [envelope, setEnvelope] = useState(
    route?.params?.existingEnvelope ?? null
  );
  useEffect(() => {
    if (route?.params?.step) {
      setCurrentStep(route?.params?.step);
    }
  }, [route?.params?.step]);
  useEffect(() => {
    if (route?.params?.existingEnvelope) {
      setEnvelope(route?.params?.existingEnvelope);
    }
  }, [route?.params?.existingEnvelope]);
  const [isloading, setIsLoading] = useState(false);
  const renderSteps = () => {
    console.log("STEP:", currentStep);
    switch (currentStep) {
      case 0:
        return (
          <UploadDocuments
            setEnvelope={setEnvelope}
            envelope={envelope}
            setCurrentStep={setCurrentStep}
            navigation={navigation}
            setIsLoading={setIsLoading}
          />
        );
      case 1:
        return (
          <AddRecipients
            setEnvelope={setEnvelope}
            envelope={envelope}
            setCurrentStep={setCurrentStep}
            setIsLoading={setIsLoading}
          />
        );
      case 2:
        return (
          <PrepareDocument
            setEnvelope={setEnvelope}
            envelope={envelope}
            setCurrentStep={setCurrentStep}
            setIsLoading={setIsLoading}
          />
        );
      case 3:
        return (
          <SendEnvelope
            setEnvelope={setEnvelope}
            envelope={envelope}
            setCurrentStep={setCurrentStep}
            navigation={navigation}
            setIsLoading={setIsLoading}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <SafeAreaView className="w-full h-full bg-white">
        <View className="bg-white w-full h-20">
          <View className="bg-white w-full h-1/2 flex flex-row justify-between items-center border-b border-gray-200 px-4">
            <View className="h-full bg-white w-5/6 justify-center">
              <Text className="text-base font-semibold">
                {steps?.[currentStep]?.name}
              </Text>
            </View>
            <View className="h-full bg-white w-1/6 justify-center items-end">
              <GetSvg
                name="closeWithoutCircleIcon"
                classN="w-6 h-6"
                callBack={() => {
                  navigation.push(routes.dashboard);
                }}
              />
            </View>
          </View>
          <IndeterminateProgressBar loading={isloading ?? false} />
          <View className="bg-white w-full max-w-md mx-auto px-12 pt-1 h-1/2 flex-row flex justify-around items-center">
            <Stepper steps={steps} currentStep={currentStep} />
          </View>
        </View>
        <ScrollView
          className=" w-full h-full px-4"
          contentContainerStyle={{
            height: "100%",
          }}
        >
          {renderSteps()}
        </ScrollView>
      </SafeAreaView>
      {isloading ? (
        <View className="absolute w-full h-full bg-[#00000055] justify-center items-center">
          <ActivityIndicator size={"large"} color="#d10000" />
        </View>
      ) : null}
    </>
  );
};
export default CreateEnvelope;
