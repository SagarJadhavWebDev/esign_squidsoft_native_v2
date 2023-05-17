import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetEnvelopes = (
  type: any,
  pageNo: number,
  perPage: number,
  filter: string | null,
  callback: (data: any) => void,
) => {
  ApiInstance.get(
    apiEndpoint.manage.getEnvelopes(type, pageNo, perPage, filter ?? "")
  )
    .then(async (res: any) => {
      if (res) {
        const data = await handleResponse(res as any);
        return callback(data);
      }
    })
    .catch((res) => {
      return callback(false);
    });
};
const handleGetEnvelopesCount = (callback: (data: any) => void) => {
  ApiInstance.get(apiEndpoint.manage.getCount)
    .then((res: any) => {
      const data = handleResponse(res);
      return callback(data);
    })
    .catch((res) => {
      return callback(false);
    });
};
export { handleGetEnvelopes, handleGetEnvelopesCount };
