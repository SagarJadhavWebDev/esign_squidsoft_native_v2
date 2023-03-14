import apiEndpoints from "../constants/apiEndpoints";
import HttpService from "../utils/HttpService";

export default class EnvelopeController {
  static async manageRecipient(
    envelope_id: string,
    recipient: any,
    token: string
  ) {
    const response = await HttpService.put(
      apiEndpoints.manageRecipients(envelope_id),
      {
        token: token,
        body: JSON.stringify(recipient),
      }
    );

    return response;
  }
}
