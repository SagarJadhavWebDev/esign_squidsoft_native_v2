const auth = {
  register: "/users/signup",
  login: "/users/signin",
  resendEmail: "/users/resend",
  verifyEmail: "email/verify/",
  logout: "/users/logout",
  sendForgotLink: "/users/reset-password-link",
  forgotPassword: "/users/forget-password",
};
const profile = {
  getProfile: "/users/me",
  updateProfile: "/users/update-profile",
  changePassword: "/users/change-password",
};
const envelope = {
  createEnvelope: "/envelopes",
  getEnvelope: (envelopeId: string) => `envelopes/${envelopeId}`,
  addRecipients: (envelopeId: number) =>
    `/envelopes/recipients/add/${envelopeId}`,
  sendEnvelope: (id: number) => `envelopes/send/${id}`,
  viewEnvelope: `envelope/view`,
  voidEnvelope: (envelopeId: number) => `/envelopes/void/${envelopeId}`,
  searchRecipients: (q: string) => `/envelopes/recipients/search?q=${q}`,
};
const document = {
  uploadDocument: (envelopeId: number) =>
    `/envelopes/documents/upload/${envelopeId}`,
  getDocument: (envelopeId: number, documentId: number) =>
    `/fetch-envelope-document/${envelopeId}/${documentId}`,
  removeDocument: (envelopeId: number) =>
    `/envelopes/documents/remove/${envelopeId}`,
};
const fields = {
  addFields: (envelopeId: number) => `/envelopes/fields/add/${envelopeId}`,
};
const plans = {
  getPlans: "/plans",
};
const credentials = {
  uploadCredentials: `user-credentials`,
  getCredentials: `/user-credentials`,
  setDefaultStamp: (id: number) => `/user-credentials/set-default/${id}`,
  deleteCredentials: (id: number) => `/user-credentials/${id}`,
};
const address = {
  createAddress: `/users/addresses`,
  setDefaultAddress: (id: number) => `/users/addresses/set-default/${id}`,
  deleteAddress: (id: number) => `/users/addresses/${id}`,
  getAddress: `/users/addresses`,
};
const country = {
  getStateCountry: `/get-country-state-city`,
  getStateCity: (countryCode: string) =>
    `/get-country-state-city/${countryCode}`,
  getCountryStateCity: (countryCode: string, stateCode: string) =>
    `/get-country-state-city/${countryCode}/${stateCode}`,
};
const order = {
  createOrder: `/subscriptions/create-order`,
  getAllorders: (pageNo: number, perPage: number) =>
    `/subscriptions/orders?page=${pageNo}&per_page=${perPage}`,
  orderCheckout: (id: number) => `/subscriptions/checkout-order/${id}`,
  cancelOrder: (id: number) => `subscriptions/cancel-order/${id}`,
  verifyCouponCode: (id: number, couponCode: string, type: "PLAN" | "ADDON") =>
    `/subscriptions/verify-coupon/${couponCode}/${id}/${type}`,
};
const utils = {
  usdToInr: `usd-to-inr`,
  getIpData: `https://ipapi.co/json/`,
};
const addOns = {
  getAllAddons: "/add-ons",
  createAddon: `/subscriptions/add-on-orders`,
  deleteAddon: `/subscriptions/add-on-orders/1`,
};
const subscriptions = {
  getAllSubscriptions: `/subscriptions`,
};
const notifications = {
  getAllNotifications: "/user/notifications",
  readAllNotifications: "/user/notifications/read-all",
};
const organizations = {
  createOrganization: "/organizations",
  getOrganization: "/organizations",
  updateOrganization: (organizationId: number) =>
    `/organizations/${organizationId}`,
};
const teams = {
  createTeam: `/organizations/teams`,
  updateTeam: (id:number) => `/organizations/teams/${id}`,
  addUser: `/organizations/teams/add-user`,
  removeUser: `/organizations/teams/remove-user`,
  invite: `/organizations/invites`,
};
const invitationRequestes = {
  cancelRequest: (id: number) => `/organizations/invitations/${id}`,
  RequestesList: (pageNo: number, perPage: number) =>
    `/organizations/invitations?page=${pageNo}&per_page=${perPage}`,
};
const manage = {
  getEnvelopes: (
    type:
      | "inbox"
      | "draft"
      | "sent"
      | "deleted"
      | "waiting_on_others"
      | "completed"
      | "action_required"
      | "expiring_soon",
    pageNo:number,
    perPage:number,
    filter:string
  ) =>
    `/manage?type=${type}&page=${pageNo}&per_page=${perPage}&filter=${filter}`,
  getCount: `/dashboard/quick_views_count`,
};
const templates = {
  getTemplates: (pageNumber: number, perPage: number) =>
    `/templates?page=${pageNumber}&perPage=${perPage}`,
  useAsTemplates: (envelopeId:number) => `/templates/${envelopeId}`,
  deleteTemplate: (templateId:number) => `/templates/${templateId}`,
  createTemplates: `/templates`,
  uploadTemplateDocuments: (id: number) => `/templates/upload-documents/${id}`,
  uploadRemoveDocuments: `/templates/remove-documents`,
  submitTemplateFields: (id: number) => `/templates/submit-fields/${id}`,
  addFieldSet: (id: number) => `/templates/field-set/${id}`,
  getTemplate: (id: number) => `/templates/${id}`,
  sendTemplate: (id: number) => `/templates/send-template/${id}`,
};

const getIn = {
  addGst: `users/update-gstin`,
};
const apiEndpoint = {
  getIn,
  auth,
  profile,
  envelope,
  document,
  fields,
  plans,
  credentials,
  address,
  country,
  order,
  utils,
  addOns,
  subscriptions,
  manage,
  notifications,
  organizations,
  teams,
  invitationRequestes,
  templates,
};
export default apiEndpoint;
