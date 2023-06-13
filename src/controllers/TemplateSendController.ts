import apiEndpoint from "../constants/apiEndpoints";
import apiEndpoints from "../constants/apiEndpoints";
import HttpService from "../utils/HttpService";

export default class TemplateSendController {
  static async TemplateSendController(
    template_id: number,
    payload: any,
    token: any
  ) {
    const response = await HttpService.post(
      apiEndpoint.templates.sendTemplate(template_id),
      {
        token: token,
        body: JSON.stringify(payload),
      }
    );

    return response;
  }
}
