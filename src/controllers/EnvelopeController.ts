import apiEndpoint from "../constants/apiEndpoints";
import apiEndpoints from "../constants/apiEndpoints";
import HttpService from "../utils/HttpService";

export default class EnvelopeController {
  static async manageRecipient(
    envelope_id: number,
    payload: any,
    token: any
  ) {
    const response = await HttpService.post(
      apiEndpoint.envelope.sendEnvelope(envelope_id),
      {
        token: token,
        body: JSON.stringify(payload),
      }
    );

    return response;
  }
}
