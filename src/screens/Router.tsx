import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isEmpty, isNull, isString } from "lodash";
import React, { useEffect, useState } from "react";
import routes from "../constants/routes";
import useAuth from "../utils/auth";
import Checkout from "./Checkout/Checkout";
import CreateEnvelope from "./CreateEnvelope/CreateEnvelope";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Manage from "./Manage/Manage";
import Plans from "./Plans/Plans";
import Register from "./Register";
import Settings from "./Settings";
import SignEnvelop from "./SignEnvelop/SignEnvelop";
import ViewEnvelope from "./SignEnvelop/ViewEnvelope";
import SplashScreen from "./SplashScreen";
import TemplateDocumentList from "./Templates/TemplateDocuments";
const Stack = createNativeStackNavigator();

const Router = () => {
  const { token } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 800);
  }, []);
  console.log("TOKEN:", token);

  return (
    <React.Fragment>
      <NavigationContainer>
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
            </>
          ) : (
            <>
              <Stack.Screen
                name={routes.dashboard}
                component={Dashboard}
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
              <Stack.Screen
                name={routes.TemplateDocument}
                component={TemplateDocumentList}
                options={{ headerShown: false }}
              />
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
};

export default Router;
