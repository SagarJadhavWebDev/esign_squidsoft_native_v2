import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { RecipientsTypes } from "../types/AddedRecipientsTypes";
import { Addresses } from "../types/AddressTypes";
import { CredentialsType } from "../types/CredentialsTypes";
import { DocumentTypes } from "../types/DocumentTypes";
import { EnvelopeType } from "../types/EnvelopeType";
import { InvitationTypes } from "../types/InvitationTypes";
import { DocumentFields, ManageList } from "../types/ManageListTypes";
import { NotificationTypes } from "../types/NotificationTypes";
import { OrganizationTypes, Team } from "../types/OrganizationsType";
import { PlanTypes } from "../types/PlanType";
import { TemplatesTypes } from "../types/TemplatesTypes";
import { UserTypes } from "../types/UserTypes";
import { DocumentField } from "../types/ViewEnvelopeTypes";
import { AddressesSlice } from "./reducers/AddressesSlice";
import { CheckoutSlice } from "./reducers/CheckoutSlice";
import {
  CountrySelectorSlice,
  CountrySelectorTypes,
} from "./reducers/countrySelectorSlice";
import { CredentialsSlice, Initial, Stamp } from "./reducers/CredentialsSlice";
import { DocumentsSlice } from "./reducers/documentsSlice";
import { EnvelopeSlice } from "./reducers/envelopeSlice";
import { InvitationSlice } from "./reducers/InvitationSlice";
import { ListOrganizationSlice } from "./reducers/ListOrganizationSlice";
import { ManageSlice } from "./reducers/ManageSlice";
import { NotificationSlice } from "./reducers/NotificationSlice";
import { PaginationSlice } from "./reducers/PaginationSlice";
import { PdfSlice } from "./reducers/PdfSlice";
import { PlansSlice } from "./reducers/PlansSlice";
import { RecipientSlice } from "./reducers/RecipientSlice";
import { SubscriptionSlice } from "./reducers/SubscriptionSlice";
import { TeamsSlice } from "./reducers/TeamsSlice";
import { TempFieldSlice } from "./reducers/TempFieldSlice";
import { TemplatesSlice } from "./reducers/TemplatesSlice";

import { UiSlice, uiState } from "./reducers/uiSlice";
import { UserSlice } from "./reducers/userSlice";
import { SubscriptionTypes } from "../types/SubscriptionTypes";
import { OrderTypes } from "../types/OrderTypes";
import { OrdersSlice } from "./reducers/OrdersSlice";
import { TemplateSlice } from "./reducers/TemplateSlice";
import { ICONTYPE } from "../types/IconTypes";

export const revertAll = createAction("REVERT_ALL");
export interface ApplicationState {
  user: UserTypes;
  ui: uiState;
  envelope: EnvelopeType;
  documents: DocumentTypes;
  plans: PlanTypes;
  credentials: CredentialsType;
  addresses: Addresses;
  countrySelector: CountrySelectorTypes;
  checkoutData: any;
  subscription: SubscriptionTypes;
  recipients: RecipientsTypes;
  pdfData: {
    pdf: any;
    totalPage: number;
    currentPage: number;
    droppedField: any;
    addedFields: {
      minHeight: string | number;
      offsetY: number;
      offsetX: number;
      maxHeight: number;
      maxWidth: number;
      displayname: string;
      type: string;
      defaultheight: number;
      defaultwidth: number;
      minheight: number;
      minwidth: number;
      icon: ICONTYPE;
      className: string;
      boxHeight: number;
      boxWidth: number;
    }[];
    fixedFields: any;
    containerZIndex: 0;
    remoteFields: any;
  };
  manage: ManageList;
  pagination: {
    currentPage: number;
    totalPages: number;
    perPage: number;
  };
  tempFiled: {
    allTempFields: any;
    field: any;
    tempStamp: Stamp[];
    tempSignature: string;
    tempInitial: string;
    selfSignFields: DocumentField[];
  };
  notifications: NotificationTypes;
  organization: OrganizationTypes;
  teams: { data: Team[]; selectedUser: string };
  invitations: InvitationTypes;
  orders: OrderTypes;
  templates: TemplatesTypes;
  template: any;
}

const combinedReducer = combineReducers({
  user: UserSlice.reducer,
  ui: UiSlice.reducer,
  envelope: EnvelopeSlice.reducer,
  documents: DocumentsSlice.reducer,
  plans: PlansSlice.reducer,
  credentials: CredentialsSlice.reducer,
  addresses: AddressesSlice.reducer,
  countrySelector: CountrySelectorSlice.reducer,
  checkoutData: CheckoutSlice.reducer,
  subscription: SubscriptionSlice.reducer,
  recipients: RecipientSlice.reducer,
  pdfData: PdfSlice.reducer,
  manage: ManageSlice.reducer,
  pagination: PaginationSlice.reducer,
  tempFiled: TempFieldSlice.reducer,
  notifications: NotificationSlice.reducer,
  organization: ListOrganizationSlice.reducer,
  teams: TeamsSlice.reducer,
  invitations: InvitationSlice.reducer,
  templates: TemplatesSlice.reducer,
  orders: OrdersSlice.reducer,
  template: TemplateSlice.reducer,
});

const rootReducer = (state:any, action:any) => {
  if (action.type === "REVERT_ALL") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

const store = makeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
