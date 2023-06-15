import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty, set } from "lodash";
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import ApiConfig from "../constants/ApiConfig";
import SP from "../types/LocalStorageType";
import CryptoHandler from "./EncryptDecryptHandler";
import EncryptDecrypt from "./EncryptionDecryption";
import HttpService from "./HttpService";
import Storage from "./StorageHandler";
import ApiInstance from "../services/ApiInstance";
import apiEndpoint from "../constants/apiEndpoints";

// type UserType = {
//   [x: string]: any;
//   email_verified_at: string;
//   subscriptions: any;
//   id: string;
//   name: String;
//   email: String;
//   phone_number: String;
//   phone_number_country_code: String;
//   updated_at: String;
//   signature: any;
//   stamps: any;
//   tenants: any;
//   initials: any;
// };

// type AuthData = {
//   [x: string]: any;
//   tenant: any;
//   user: UserType;
//   token: string;
// };

// type AuthContextData = {
//   authUser:any;
//   signIn: (userData: AuthData, callback: Function) => void;
//   signOut: (callback: Function) => void;
//   updateUser: (user: UserType, callback: Function) => void;
//   refreshUser: () => void;
// };
// let AuthContext = React.createContext<AuthContextData>(null!);

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   //The loading part will be explained in the persist step session

//   const signIn = (userData: AuthData, callback: Function) => {
//     const token = EncryptDecrypt.decrypt(
//       userData?.token,
//       ApiConfig.APP_AUTH_TOKEN_KEY,
//       ApiConfig.APP_AUTH_TOKEN_KEY
//     );

//     console.log("PAYLOAD:", userData);
//     console.log("TOKEN:", token);
//     EncryptedStorage.setItem(SP.AUTHTOKEN, token);
//     EncryptedStorage.setItem(
//       SP.CREDENTIALS,
//       JSON.stringify({ e_payload: userData?.e_payload })
//     );
//     callback();
//   };

//   const signOut = (callback: Function) => {
//     Storage.set(SP.CREDENTIALS, "");
//     Storage.set(SP.AUTHTOKEN, "");
//     callback();
//   };

//   const updateUser = (user: UserType, callback: Function) => {
//     callback();
//   };

//   const refreshUser = async () => {
//     const response = await HttpService.get(
//       "/" + HttpService.getHostName() + "/user/refreshuser",
//       {
//         token: authToken() as any,
//       }
//     );
//     const data = CryptoHandler.response(response, authToken() as any);
//     if (data?.user != null) {
//       updateUser(response, () => {});
//     }
//   };

//  const authToken = async ()=> {
//     const a = await EncryptedStorage.getItem(SP.AUTHTOKEN).then((res) => {
//       return res;
//     });
//     console.log("AUTHTOKEN FETCH", a);
//     return a;
//   }

//   const test = async () => {
//     return await EncryptedStorage.getItem(SP.CREDENTIALS).then((value) => value);
//   };

// const authUser = async ()=> {
//     const token = await authToken();
//     const data = await test();

//     if (token && !isEmpty(data)) {
//       const a = CryptoHandler.response(JSON.parse(data as any), token as any);
//       if (a?.user) {
//         return a?.user;
//       }
//     }
//   }

//   const value = useMemo(async () => {
//     return {
//       authUser:await authUser(),
//       signIn,
//       signOut,
//       updateUser,
//       refreshUser,
//     };
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={value as any}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider };

// export function useAuth() {
//   return React.useContext(AuthContext);
// }

type UserType = {
  [x: string]: any;
  email_verified_at: string;
  subscriptions: any;
  id: string;
  name: String;
  email: String;
  phone_number: String;
  phone_number_country_code: String;
  updated_at: String;
  signature: any;
  stamps: any;
  tenants: any;
  initials: any;
};

type AuthData = {
  [x: string]: any;
  tenant: any;
  user: UserType;
  token: string;
};

type AuthContextData = {
  auth?: AuthData;
  token?: string | null;
  SignIn?: (userData: AuthData, callback: Function) => void;
  SignOut?: (callback: Function) => void;
  UpdateUser?: (user: UserType, token: any, callback: Function) => void;
  RefreshUser?: (token: any) => void;
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
};

const AuthContext = React.createContext<AuthContextData>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuthState] = useState({});
  const [authToken, setAuthToken] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false);
  const getAuthToken = async () => {
    try {
      const authDataString = await AsyncStorage.getItem(SP.AUTHTOKEN);
      setAuthToken(authDataString as any);
      return authDataString;
    } catch (err) {}
  }; // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    const t = await getAuthToken();
    try {
      const authDataString = await AsyncStorage.getItem(SP.CREDENTIALS);
      const authData = JSON.parse((authDataString as any) || {});
      const result = CryptoHandler.response(authData, t as any);
      setAuthState(result);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const SignIn = async (token: any, callback: Function) => {
    try {
      // const token = EncryptDecrypt.decrypt(
      //   payload?.token,
      //   ApiConfig.APP_AUTH_TOKEN_KEY,
      //   ApiConfig.APP_AUTH_TOKEN_KEY
      // );
      //console.log("FROM AUTH", token);
      AsyncStorage.setItem(SP.AUTHTOKEN, token);
      setAuthToken(token);
      // AsyncStorage.setItem(
      //   SP.CREDENTIALS,
      //   JSON.stringify({ e_payload: payload?.e_payload })
      // );
      // const authData = CryptoHandler.response(
      //   { e_payload: payload?.e_payload },
      //   token
      // );
      // setAuthState(authData);
      callback();
    } catch (error) {
      Promise.reject(error).catch((err) => console.log("LOGIN ERR", err));
    }
  };

  const SignOut = async (callback: Function) => {
    console.log("LOGOUT", ApiConfig.API_URL + apiEndpoint.auth.logout);
    ApiInstance.delete(apiEndpoint.auth.logout).then(async (res) => {
      callback();
      await AsyncStorage.clear();
      setAuthState({});
      setAuthToken(null);
    });
  };
  const RefreshUser = async (token: any) => {
    await HttpService.get(HttpService.getHostName() + "/user/refreshuser", {
      token: token,
    })
      .then((res) => {
        const data = CryptoHandler.response(res, token);
        UpdateUser(res, token, () => {});
        //console.log("REFRESH USER called", data);
      })
      .catch((err) => {
        // console.log("REFRESH USER AUTH ERR");
      });
  };
  const UpdateUser = (payload: any, updatedToken: any, callback: Function) => {
    try {
      AsyncStorage.setItem(SP.AUTHTOKEN, updatedToken);
      AsyncStorage.setItem(
        SP.CREDENTIALS,
        JSON.stringify({ e_payload: payload?.e_payload })
      );
      const authData = CryptoHandler.response(
        { e_payload: payload?.e_payload },
        updatedToken
      );
      setAuthState(authData);
      callback();
    } catch (error) {
      //console.log("ERROR", error);
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthToken();
    getAuthState();
  }, []);

  useEffect(() => {
    getAuthToken();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={
        {
          auth,
          token: authToken,
          SignIn,
          SignOut,
          RefreshUser,
          UpdateUser,
          isLoading,
          setIsLoading,
        } as any
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
const useAuth = () => React.useContext(AuthContext);
export default useAuth;

const getAuthToken = async () => {
  try {
    const authDataString = await AsyncStorage.getItem(SP.AUTHTOKEN);
    return authDataString;
  } catch (err) {}
};
export { getAuthToken };
