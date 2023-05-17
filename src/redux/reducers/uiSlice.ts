import { createSlice } from "@reduxjs/toolkit";
import { EnvelopeUserType } from "screens/envelope/View/ViewEnvelope";

export interface uiState {
  sidebarOpen: boolean;
  emailSent: boolean;
  isLoading: boolean;
  showEnvelopeTypeModal: boolean;
  showUploadCredentialsModal: boolean;
  modalType: "INITIAL" | "SIGNATURE" | "STAMP";
  showAddressModal: boolean;
  usdToInr: number;
  showStripeModal: boolean;
  viewSubscriptionModal: boolean;
  ManageTabType: string;
  EnvelopeStep: number;
  showLoadingModal: boolean;
  isFullScreen: boolean;
  signUserType: EnvelopeUserType;
  createTeamModal: boolean;
  addUserModal: boolean;
  prepareType: "ENVELOPE" | "TEMPLATE";
  deferredPrompt: any;
  showEnvelopeDraftModal: boolean;
  showSignEnvelopeTermsModal: boolean;
  showEditProfileModal: boolean;
  showEnvelopeUserWarningModal: boolean;
  showConfirmDeleteModal: boolean;
  showEditTeamModal: boolean;
  showLoginModal: boolean;
  showRemoveUserModal: boolean;
  showVoidEnvelopeModal: boolean;
  showAboutGstModal: boolean;
  showAddAddonModal: boolean;
  createTemplateModal: boolean;
  showAddFieldsetModal: boolean;
  showDownloadEnvelopeModal: boolean;
}
const INITIAL_STATE = {
  sidebarOpen: false,
  emailSent: false,
  isLoading: false,
  showEnvelopeTypeModal: false,
  showUploadCredentialsModal: false,
  showAddressModal: false,
  modalType: null,
  usdToInr: null,
  showStripeModal: false,
  viewSubscriptionModal: false,
  ManageTabType: "inbox",
  EnvelopeStep: 0,
  showLoadingModal: false,
  isFullScreen: false,
  signUserType: "REGISTERED",
  createTeamModal: false,
  addUserModal: false,
  prepareType: "ENVELOPE",
  deferredPrompt: null,
  showEnvelopeDraftModal: false,
  showSignEnvelopeTermsModal: false,
  showEditProfileModal: false,
  showEnvelopeUserWarningModal: false,
  showConfirmDeleteModal: false,
  showEditTeamModal: false,
  showLoginModal: false,
  showRemoveUserModal: false,
  showVoidEnvelopeModal: false,
  showAboutGstModal: false,
  showAddAddonModal: false,
  createTemplateModal: false,
  showAddFieldsetModal: false,
  showDownloadEnvelopeModal: false,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState: INITIAL_STATE,
  reducers: {
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action?.payload;
    },
    setEmailSent: (state, action) => {
      state.emailSent = action?.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action?.payload;
    },
    showEnvelopeTypeModal: (state, action) => {
      state.showEnvelopeTypeModal = action.payload;
    },
    showUploadCredentialsModal: (state, action) => {
      state.showUploadCredentialsModal = action.payload;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    showAddressModal: (state, action) => {
      state.showAddressModal = action.payload;
    },
    setUsdToInrRate: (state, action) => {
      state.usdToInr = action.payload;
    },
    showStripeModal: (state, action) => {
      state.showStripeModal = action.payload;
    },
    showSubscriptionModal: (state, action) => {
      state.viewSubscriptionModal = action.payload;
    },
    setManageTabType: (state, action) => {
      state.ManageTabType = action.payload;
    },
    setEnvelopeStep: (state, action) => {
      state.EnvelopeStep = action.payload;
    },
    setLoadingModal: (state, action) => {
      state.showLoadingModal = action.payload;
    },
    setIsFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    },
    setSignUserType: (state, action) => {
      state.signUserType = action.payload;
    },
    setCreateTeamModal: (state, action) => {
      state.createTeamModal = action.payload;
    },
    setAddUserModal: (state, action) => {
      state.addUserModal = action.payload;
    },
    setPrepareType: (state, action) => {
      state.prepareType = action.payload;
    },
    setDeferredPrompt: (state, action) => {
      state.deferredPrompt = action.payload;
    },
    setshowEnvelopeDraftModal: (state, action) => {
      state.showEnvelopeDraftModal = action.payload;
    },
    setshowSignEnvelopeTermsModal: (state, action) => {
      state.showSignEnvelopeTermsModal = action.payload;
    },
    setshowEnvelopeUserWarningModal: (state, action) => {
      state.showEnvelopeUserWarningModal = action.payload;
    },
    setshowConfirmDeleteModal: (state, action) => {
      state.showConfirmDeleteModal = action.payload;
    },
    setEditTeamModal: (state, action) => {
      state.showEditTeamModal = action.payload;
    },
    setLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
    setshowRemoveUserModal: (state, action) => {
      state.showRemoveUserModal = action.payload;
    },
    setshowVoidEnvelopeModal: (state, action) => {
      state.showVoidEnvelopeModal = action.payload;
    },
    setshowAboutGstModal: (state, action) => {
      state.showAboutGstModal = action.payload;
    },
    setshowAddAddonModal: (state, action) => {
      state.showAddAddonModal = action.payload;
    },
    setcreateTemplateModal: (state, action) => {
      state.createTemplateModal = action.payload;
    },
    setshowAddFieldsetModal: (state, action) => {
      state.showAddFieldsetModal = action.payload;
    },
    setshowDownloadEnvelopeModal: (state, action) => {
      state.showDownloadEnvelopeModal = action.payload;
    },
  },
});

export const {
  setshowDownloadEnvelopeModal,
  setshowAddFieldsetModal,
  setcreateTemplateModal,
  setshowAddAddonModal,
  setshowAboutGstModal,
  setshowVoidEnvelopeModal,
  setshowRemoveUserModal,
  setLoginModal,
  setDeferredPrompt,
  setSidebarOpen,
  setEmailSent,
  setIsLoading,
  showEnvelopeTypeModal,
  showUploadCredentialsModal,
  setModalType,
  showAddressModal,
  setUsdToInrRate,
  showStripeModal,
  showSubscriptionModal,
  setManageTabType,
  setEnvelopeStep,
  setLoadingModal,
  setIsFullScreen,
  setSignUserType,
  setCreateTeamModal,
  setAddUserModal,
  setPrepareType,
  setshowEnvelopeDraftModal,
  setshowSignEnvelopeTermsModal,
  setshowEnvelopeUserWarningModal,
  setshowConfirmDeleteModal,
  setEditTeamModal,
} = UiSlice.actions;

export default UiSlice.reducer;
