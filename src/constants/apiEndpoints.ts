import { EnvelopeListType, QuickViewsListType } from "../types/ApiEndPointType";
import HttpService from "../utils/HttpService";

const apiEndpoints = {
  login: "auth/login",
  register: "auth/register",
  profileCheck: "auth/profile-check",
  setPassword: "auth/set-password-and-login",
  logout: "auth/logout",
  envelopeList: (type: string, page: number, perPage: number) =>
    `${HttpService.getHostName()}/envelopes/${type}?page=${page}&per_page=${perPage}`,
  quickViewsList: (type: string, page: number, perPage: number) =>
    `${HttpService.getHostName()}/envelopes/quickviews?operation=${type}&page=${page}&per_page=${perPage}`, //envelopes/quickviews?operation=expiringsoon&page=1&per_page=10
  templates: `${HttpService.getHostName()}/getTemplates`,
  uploadCredentials: `users/digital-credentials`,
  uploadDocuments: `${HttpService.getHostName()}/upload/documents`,
  manageRecipients: (envelope_id: string) =>
    `${HttpService.getHostName()}/envelopes/${envelope_id}?manageRecipient`,
  getEnvelope: (envelope_id: string) =>
    `${HttpService.getHostName()}/envelopes/${envelope_id}`,
  submitEnvelopeFields: (envelope_id: string) =>
    `${HttpService.getHostName()}/envelopes/${envelope_id}?submitFields`,
  removeEnvelopeField: (envelope_id: string, field_id: any) =>
    `${HttpService.getHostName()}/envelopes/fields/${field_id}/${envelope_id}`,
  sendEnvelope: (envelope_id: string) =>
    `${HttpService.getHostName()}/envelopes/${envelope_id}?send`,
  getQuickViews: `${HttpService.getHostName()}/dashboard/quick-view`,
  updateStamp: (id: any) => `users/digital-credentials/stamps/update/${id}`,
  updateCredentials: (id: any) => `users/digital-credentials/${id}`,
  signFields: (envelope_id: any) =>
    `${HttpService.getHostName()}/envelopes/${envelope_id}?signFields`,
  updateProfile: `${HttpService.getHostName()}/users/update-profile`,
  changePassword: `${HttpService.getHostName()}/users/change-password`,
  activateTrail: (order_id: number) => `${HttpService.getHostName()}/orders`,
  sendOtp: `users/send-otp`,
  verifyEmail: `${HttpService.getHostName()}/users/verify-email-Otp-validate`,
  getActiveSubscription: `${HttpService.getHostName()}/subscriptions/activesubscriptions`,
  getOrders: `${HttpService.getHostName()}/orders`,
  getNotifications: `${HttpService.getHostName()}/user/notifications`,
  notificationAction: `${HttpService.getHostName()}/user/notifications/action`,
  getPlans: `plans`,
  updateSelfSign: `${HttpService.getHostName()}/selfsign/envelops`,
  submitEnquiry: `${HttpService.getHostName()}/user/enquiry`,
  getUSDRate: `${HttpService.getHostName()}/getUSDtoINRrate`,
  verifyPayment: (order_id: any) =>
    `${HttpService.getHostName()}/orders/${order_id}/checkout`,
  applyCoupenCode: (coupon: any, plan_id: any) =>
    `${HttpService.getHostName()}/orders/coupon/${coupon}/${plan_id}`,
  fetchPaymentIntent: (order_id: any, amount: any) =>
    `${HttpService.getHostName()}/fetch-payment-intent/${order_id}/${amount}`,
  getCountries: `get-country-state-city`,
  getStates: (country_code: any) => `get-country-state-city/${country_code}`,
  getCities: (country_code: any, state_code: any) =>
    `get-country-state-city/${country_code}/${state_code}`,
  cancelSubscription: (id: any) =>
    `${HttpService.getHostName()}/orders/cancel/${id}`,
  forgotPassword: `users/send-otp`,
  validateOtp: `users/forgot-password-otp-validate`,
  resetPassword: `users/reset-new-password`,
};
export default apiEndpoints;
