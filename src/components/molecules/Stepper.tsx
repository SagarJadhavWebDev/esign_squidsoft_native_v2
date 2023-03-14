import React from "react";
import { Text, View } from "react-native";

interface StepperProps {
  steps: any;
  currentStep: any;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <>
      {steps?.map((i: any, key: any) => {
        const isActive = key <= currentStep;
        return (
          <React.Fragment key={key}>
            <View
              className={`w-6 h-6 rounded-full justify-center items-center ${
                isActive ? "bg-[#d10000]" : "bg-white border border-black"
              }`}
            >
              <Text
                className={` font-semibold text-xs leading-4 ${
                  isActive ? "text-white" : "text-black"
                }`}
              >
                {key + 1}
              </Text>
            </View>
            {key !== steps.length - 1 && (
              <View
                className={`border w-12 ${
                  key + 1 <= currentStep
                    ? "border-[#d10000] bg-[#d10000]"
                    : " border-black bg-black"
                }`}
              ></View>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Stepper;
