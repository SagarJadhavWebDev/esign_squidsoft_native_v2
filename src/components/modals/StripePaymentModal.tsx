import { Platform, Text, View } from "react-native";
import StripeCheckout from "../../screens/Checkout/StripeCheckout";
import CustomModal from "./CustomModal";
import {
  CardField,
  CardFieldInput,
  useStripe,
  CardFormView,
  CardForm,
  usePaymentSheet,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import AppConfig from "../../constants/appConfig";
import ApiConfig from "../../constants/ApiConfig";

interface StripePaymentModalProps {
  setIsOpen: any;
  token: string;
  isOpen: boolean;
  intent: any;
  addressPayload: any;
  user: any;
  setIsLoading: any;
}
const StripePaymentModal: React.FC<StripePaymentModalProps> = ({
  setIsOpen,
  token,
  isOpen,
  intent,
  addressPayload,
  user,
  setIsLoading,
}) => {
  const { initPaymentSheet } = usePaymentSheet();
  useEffect(() => {
    const customAppearance = {
      font: {
        family:
          Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
      },
      shapes: {
        borderRadius: 12,
        borderWidth: 0.5,
      },
      primaryButton: {
        shapes: {
          borderRadius: 20,
        },
      },
      colors: {
        primary: "#fcfdff",
        background: "#ffffff",
        componentBackground: "#f3f8fa",
        componentBorder: "#f3f8fa",
        componentDivider: "#000000",
        primaryText: "#000000",
        secondaryText: "#000000",
        componentText: "#000000",
        placeholderText: "#73757b",
      },
    };
    (async () => {
      initPaymentSheet({
        appearance: customAppearance,
        // customerId: "1",
        merchantDisplayName: AppConfig.APP_NAME,
        // setupIntentClientSecret: ApiConfig.STRIPE_KEY,
        paymentIntentClientSecret: intent,
        customFlow: true,
        style: "automatic",
      }).then((res) => {
        //console.log("ERROR:", res.paymentOption?.image);
      });
    })();
  }, []);
  const [card, setCard] = useState<any>(null);
  return (
    <CustomModal
      children={
        <View className="w-full">
          {/* <CardField
            style={{
              width: 200,
              height: 40,
              borderColor: "lightgray",
              borderStyle: "dashed",
              borderWidth: 1,
              display: "flex",
              flexWrap: "wrap",
            }}
            postalCodeEnabled={true}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
              //   borderColor: "lightgray",
              //   borderRadius: 20,
              borderWidth: 1,
              fontSize: 12,
            }}
            onCardChange={(cardDetails) => {
              setCard(cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          /> */}
        </View>
      }
      handleCancel={() => {
        setIsLoading(false);
        setIsOpen(false);
      }}
      handleSubmit={() => {
        // confirmPayment(intent, {
        //   paymentMethodType: "Card",
        //   paymentMethodData: {
        //     billingDetails: {
        //       address: addressPayload,
        //       email: user?.email,
        //       name: user?.name,
        //       phone: user?.phone_number,
        //     },
        //   },
        // })
        //   .then((res) => {
        //     console.log("STRIPE PAYEMNT SUCCESS", res);
        //     setIsLoading(false);
        //   })
        //   .catch((err) => {
        //     console.log("STRIPE PAYMENT ERR", err);
        //     setIsLoading(false);
        //   });
      }}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Stripe Payment"
      isLoading={false}
      setIsLoading={() => {}}
    />
  );
};

export default StripePaymentModal;
