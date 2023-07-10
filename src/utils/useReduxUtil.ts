import apiEndpoint from "../constants/apiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { setAddresses } from "../redux/reducers/AddressesSlice";
import { setCountriesData } from "../redux/reducers/countrySelectorSlice";
import {
  setIntial,
  setSignature,
  setStamps,
} from "../redux/reducers/CredentialsSlice";
import { setPlans } from "../redux/reducers/PlansSlice";
import { setUsdToInrRate } from "../redux/reducers/uiSlice";
import { setUser } from "../redux/reducers/userSlice";
import { ApplicationState } from "../redux/store";
import Addressservice from "../services/AddressService";
import AuthService from "../services/AuthService";
import CountryService from "../services/CountryService";
import CredentialsService from "../services/CredentialsService";
import getUsdToInrService from "../services/getUsdToInrService";
import PlansService from "../services/PlansService";
import omit from "lodash/omit";

import { setTotalPages } from "../redux/reducers/PaginationSlice";
import NotificationsService from "../services/NotificationsService";
import { setNotifications } from "../redux/reducers/NotificationSlice";
import OrganizationsService from "../services/OrganizationsService";
import { setOrganization } from "../redux/reducers/ListOrganizationSlice";
import { setTeams } from "../redux/reducers/TeamsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SP from "../types/LocalStorageType";
import useAuth from "./auth";

const useToken = () => {
  const { token } = useAuth();
  return token;
};
const useUser = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const user = useSelector((state: ApplicationState) => state?.user?.data);
  if (user) {
    return user;
  } else if (token) {
    AuthService.handleGetProfile((data) => {
      dispatch(setUser(data));
      return data;
    });
    // return user;
  }
};

const useUI = () => {
  const uiState = useSelector((state: ApplicationState) => state?.ui);
  return uiState;
};

const useEnvelope = () => {
  const envelope = useSelector(
    (state: ApplicationState) => state?.envelope?.data
  );
  return envelope;
};
const useViewEnvelope = () => {
  const envelope = useSelector(
    (state: ApplicationState) => state?.envelope?.viewEnvelope
  );
  return envelope;
};
const useDocuments = () => {
  const documents = useSelector(
    (state: ApplicationState) => state?.documents?.data
  );
  const SelectedDocuments =
    useSelector(
      (state: ApplicationState) => state?.documents?.selecteDocument
    ) ?? documents?.[0];
  return { documents, SelectedDocuments };
};
const usePlans = () => {
  const dispatch = useDispatch();
  const token = useToken();

  const plans = useSelector((state: ApplicationState) => state?.plans?.data);
  if (plans) {
    return plans;
  } else if (token) {
    PlansService.handleGetPlans((data: any) => {
      dispatch(setPlans(data));
      return data;
    });
  }
};
// const useTitle = () => {
//   const currentPath = useCurrentPath();
//   switch (currentPath) {
//     case ProtectedRoutes.DASHBOARD:
//       return "Dashboard";
//     case ProtectedRoutes.settings:
//       return "Settings";
//     case ProtectedRoutes.profileSettings:
//       return "Profile Settings";
//     case ProtectedRoutes.checkout:
//       return "Checkout";
//     case ProtectedRoutes.manage:
//       return "Manage";
//     case ProtectedRoutes.addRecipient:
//       return "Add Recipients";
//     case ProtectedRoutes.createEnvelope:
//       return "Create Envelope";
//     case ProtectedRoutes.organizations:
//       return "Organization";
//     case ProtectedRoutes.teams:
//       return "Team Details";
//     case ProtectedRoutes.plans:
//       return "Plans";
//     case ProtectedRoutes.templates:
//       return "Templates";
//     case ProtectedRoutes.subscriptions:
//       return "Subscriptions";
//     case ProtectedRoutes.uploadDocumentsTemplates:
//       return "Template Documents";
//     default:
//       return "Dashboard";
//   }
// };
const useValidateObjectValues = (objectToValidate: any, validateBy: any) => {
  // const [isValid, setIsValid] = useState(false);
  // useEffect(() => {
  //   const validate = Object.values(objectToValidate).every(
  //     (i) => i !== validateBy
  //   );
  //   setIsValid(validate);
  // }, [objectToValidate]);
  // return isValid;
  const validated = Object.values(objectToValidate).every(
    (i) => i !== validateBy
  );
  return validated;
};
const useInitial = () => {
  const dispatch = useDispatch();
  const initial = useSelector(
    //@ts-ignore
    (state: ApplicationState) => state?.credentials?.data?.["initial"]
  );
  const token = useToken();

  if (initial !== null) {
    return initial;
  } else if (token) {
    CredentialsService.handleGetCredentials((data) => {
      dispatch(setIntial(data?.["initials"]?.[0]));
      dispatch(setSignature(data?.["signatures"]?.[0]));
      dispatch(setStamps(data?.["stamps"]));
    });
  }
};
const useSignature = () => {
  const dispatch = useDispatch();
  const signature = useSelector(
    //@ts-ignore
    (state: ApplicationState) => state?.credentials?.data?.["signature"]
  );
  const token = useToken();

  if (signature !== undefined) {
    return signature;
  } else if (token) {
    CredentialsService.handleGetCredentials((data) => {
      return dispatch(setSignature(data?.["signatures"]?.[0]));
    });
  }
};
const useStamps = () => {
  const dispatch = useDispatch();
  const stamps = useSelector(
    (state: ApplicationState) => state?.credentials?.data?.["stamps"]
  );
  const token = useToken();
  if (stamps !== undefined) {
    return stamps;
  } else if (token) {
    CredentialsService.handleGetCredentials((data) => {
      return dispatch(setStamps(data?.["stamps"]));
    });
  }
};

const useModalType = () => {
  const modalType = useSelector(
    (state: ApplicationState) => state?.ui?.modalType
  );
  return modalType;
};
const useAddresses = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(
    (state: ApplicationState) => state?.addresses?.data
  );
  const token = useToken();

  if (addresses) {
    return addresses;
  } else if (token) {
    Addressservice.handleGetAddresses(async (data) => {
      return await dispatch(setAddresses(data));
    });
  }
};
const useCountryList = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const countries = useSelector(
    (state: ApplicationState) => state?.countrySelector?.countries
  );
  if (countries) {
    return countries;
  } else {
    CountryService.handleGetCountry((data) => {
      dispatch(setCountriesData(data));
    });
  }
};
const useStateList = () => {
  const dispatch = useDispatch();
  const states = useSelector(
    (state: ApplicationState) => state?.countrySelector?.states
  );
  if (states) {
    return states;
  } else {
    return null;
  }
};
const useCitiesList = () => {
  const dispatch = useDispatch();
  const cities = useSelector(
    (state: ApplicationState) => state?.countrySelector?.cities
  );
  if (cities) {
    return cities;
  } else {
    return null;
  }
};

const useCheckoutData = () => {
  const checkoutData = useSelector(
    (state: ApplicationState) => state?.checkoutData?.data
  );
  return checkoutData;
};

const useUsdToInr = () => {
  const dispatch = useDispatch();
  const usdToInr = useSelector(
    (state: ApplicationState) => state?.ui?.usdToInr
  );
  if (usdToInr) {
    return usdToInr;
  } else {
    getUsdToInrService((data) => {
      dispatch(setUsdToInrRate(data));
    });
  }
};

const useClientSecret = () => {
  const clientSecret = null;
  return clientSecret;
};
const useIsLoading = () => {
  const loading = useSelector(
    (state: ApplicationState) => state?.ui?.isLoading
  );
  return loading;
};
const useSubscription = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const subscription = useSelector(
    (state: ApplicationState) => state?.subscription?.data
  );
  return subscription;
};

const useManageTabType = () => {
  const manageTabType = useSelector(
    (state: ApplicationState) => state?.ui?.ManageTabType
  );
  return manageTabType;
};

const useEnvelopeStep = () => {
  const currentStep = useSelector(
    (state: ApplicationState) => state?.ui?.EnvelopeStep
  );
  return currentStep;
};
const useRecipients = () => {
  const recipients = useSelector(
    (state: ApplicationState) => state?.recipients?.data
  );
  const localRecipients = useSelector(
    (state: ApplicationState) => state?.recipients?.localRecipients
  );
  const selectedRecipient =
    useSelector(
      (state: ApplicationState) => state?.recipients?.selectedRecipients
    ) ?? recipients?.[0];
  return { recipients, localRecipients, selectedRecipient };
};

const usePdfData = () => {
  const pdf = useSelector((state: ApplicationState) => state?.pdfData?.pdf);
  const currentPage = useSelector(
    (state: ApplicationState) => state?.pdfData?.currentPage
  );
  const totalPages = useSelector(
    (state: ApplicationState) => state?.pdfData?.totalPage
  );
  const droppedField = useSelector(
    (state: ApplicationState) => state?.pdfData?.droppedField
  );
  const addedFields = useSelector(
    (state: ApplicationState) => state?.pdfData?.addedFields
  );
  const fixedFields = useSelector(
    (state: ApplicationState) => state?.pdfData?.fixedFields
  );
  const containerZIndex = useSelector(
    (state: ApplicationState) => state?.pdfData?.containerZIndex
  );
  const selfSignFields = useSelector(
    (state: ApplicationState) => state?.tempFiled?.selfSignFields
  );
  return {
    pdf,
    currentPage,
    totalPages,
    droppedField,
    addedFields,
    fixedFields,
    containerZIndex,
    selfSignFields,
  };
};
const useIsFullScreen = () => {
  const isFullScreen = useSelector(
    (state: ApplicationState) => state?.ui?.isFullScreen
  );
  return isFullScreen;
};
const useManageList = () => {
  const dispatch = useDispatch();
  const list = useSelector(
    (state: ApplicationState) => state?.manage?.data?.data
  );
  const meta = useSelector((state: ApplicationState) =>
    omit(state?.manage?.data, ["data"])
  );
  dispatch(setTotalPages(meta?.last_page));
  const currentTab = useSelector(
    (state: ApplicationState) => state?.manage?.currentTab
  );
  return { list, meta, currentTab };
};

const useEnvelopesCount = () => {
  const dispatch = useDispatch();
  const counts = useSelector((state: ApplicationState) => state?.manage?.count);
  return counts;
};

const useCurrentPage = () => {
  const paginationData = useSelector(
    (state: ApplicationState) => state?.pagination
  );
  return paginationData?.currentPage;
};
const usePagination = () => {
  const paginationData = useSelector(
    (state: ApplicationState) => state?.pagination
  );
  return paginationData?.currentPage;
  // const pages = getPaginationPages(
  //   paginationData?.totalPages,
  //   5,
  //   paginationData?.currentPage
  // );
  // const perPage = paginationData?.perPage;
  // return {
  //   currentPage: paginationData?.currentPage,
  //   totalPages: paginationData?.totalPages,
  //   pages,
  //   perPage,
  // };

  // return paginationData?.currentPage;
};

const useSignUserType = () => {
  const type = useSelector(
    (state: ApplicationState) => state?.ui?.signUserType
  );
  return type;
};

const useNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: ApplicationState) => state?.notifications?.data
  );
  const token = useToken();

  if (notifications) {
    return notifications;
  } else if (token) {
    NotificationsService.getAllNotifications((data) => {
      if (data) {
        dispatch(setNotifications(data));
        return data;
      }
    });
  }
};

const useOrganization = () => {
  const organization = useSelector(
    (state: ApplicationState) => state?.organization?.data
  );
  const token = useToken();

  const dispatch = useDispatch();
  if (organization) {
    return organization;
  } else if (token) {
    OrganizationsService.handleGetOrganizations((data: any) => {
      dispatch(setOrganization(data));
      dispatch(setTeams(data?.teams));
      console.log("ORG", data);
      return data;
    });
  }
};
const useTeams = () => {
  const teams = useSelector((state: ApplicationState) => state?.teams?.data);
  return teams;
};
const useInvitations = () => {
  const invitations = useSelector(
    (state: ApplicationState) => state?.invitations?.data
  );

  return { invitations };
};
const useOrders = () => {
  const orders = useSelector((state: ApplicationState) => state?.orders);

  return { orders };
};

const useTemplates = () => {
  const templates = useSelector(
    (state: ApplicationState) => state?.templates?.data
  );
  return templates;
};
// const useIsMobile = () => {
//   const toMatch = [
//     /Android/i,
//     /webOS/i,
//     /iPhone/i,
//     /iPad/i,
//     /iPod/i,
//     /BlackBerry/i,
//     /Windows Phone/i,
//   ];

//   return toMatch.some((toMatchItem) => {
//     return navigator.userAgent.match(toMatchItem);
//   });
// };
export {
  useCurrentPage,
  useOrders,
  useUser,
  useUI,
  useEnvelope,
  useDocuments,
  usePlans,
  useValidateObjectValues,
  useInitial,
  useSignature,
  useStamps,
  useModalType,
  useAddresses,
  useCountryList,
  useStateList,
  useCitiesList,
  useCheckoutData,
  useUsdToInr,
  useClientSecret,
  useIsLoading,
  useSubscription,
  useManageTabType,
  useEnvelopeStep,
  useRecipients,
  usePdfData,
  useIsFullScreen,
  useManageList,
  useEnvelopesCount,
  useViewEnvelope,
  useSignUserType,
  useNotifications,
  useOrganization,
  useTeams,
  useToken,
  useInvitations,
  useTemplates,
};
