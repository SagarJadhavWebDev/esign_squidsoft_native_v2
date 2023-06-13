import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isEmpty, isNull, isString } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import routes from "../constants/routes";
import useAuth from "../utils/auth";
import Checkout from "./Checkout/Checkout";
import CreateEnvelope from "./CreateEnvelope/CreateEnvelope";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Manage from "./Manage/Manage";
import Plans from "./Plans/Plans";
import Register from "./Register";
import Settings from "./Settings";
import SignEnvelop from "./SignEnvelop/SignEnvelop";
import ViewEnvelope from "./SignEnvelop/ViewEnvelope";
import SplashScreen from "./SplashScreen";
import TemplateDocumentList from "./Templates/TemplateDocuments";
import Address from "./Address/Address";
import ManageAddress from "./Address/Address";
import ManageTeams from "./Teams/ManageTeams";
import ViewTeam from "./Teams/ViewTeam";
import { Linking } from "react-native";
import VerifyEmail from "./VerifyEmail/VerifyEmail";
import EmailSentCard from "./VerifyEmail/EmailSentCard";
import SendTemplate from "./Templates/SendTemplate";
const Stack = createNativeStackNavigator();

const Router = () => {
  const { token } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 800);
  }, []);

  const navigationRef = useRef<any>();
  Linking.addEventListener("url", (e) => {
    //console.log("FROM LINKING", e.url);
    const url: any = e.url;
    if (url.includes("/envelope/view?")) {
      const envelope = { access_token: url };
      navigationRef?.current?.navigate(routes.viewEnvelope, {
        envelope,
        currentTab: "SIGN",
      });
    } else if (url?.includes("/email/verify/")) {
      navigationRef?.current?.navigate(routes.verifyEmail, {
        token: url,
      });
    } else if (url?.includes("/forgot-password?")) {
      navigationRef?.current?.navigate(routes.ForgotPassword, {
        token: url,
      });
    }
  });

  return (
    <React.Fragment>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={routes.splash}>
          {showSplashScreen ? (
            <Stack.Screen
              name={routes.splash}
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : null}
          {isEmpty(token) ? (
            <>
              <Stack.Screen
                name={routes.login}
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.register}
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.ForgotPassword}
                component={ForgotPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.verifyEmail}
                component={VerifyEmail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.emailSent}
                component={EmailSentCard}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={routes.dashboard}
                component={Dashboard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.sendTemplateDocument}
                component={SendTemplate}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.createEnvelope}
                component={CreateEnvelope}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.signEnvelope}
                component={SignEnvelop}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.viewEnvelope}
                component={ViewEnvelope}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.Settings}
                component={Settings}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
                name={routes.TemplateDocument}
                component={TemplateDocumentList}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name={routes.Plans}
                component={Plans}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.Checkout}
                component={Checkout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.Address}
                component={ManageAddress}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.Teams}
                component={ManageTeams}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.ViewTeam}
                component={ViewTeam}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
};

export default Router;
