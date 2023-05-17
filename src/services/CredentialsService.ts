import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";
import upperCase from "lodash/upperCase";
//import CompressedImage from "../utils/";
const handleInitialUpload = async (payload: any, callback?: (data:any) => void) => {
  const payloadData = new FormData();
  const compressedFile = payload?.file;
  payloadData.append("type", upperCase(payload?.type));
  payloadData.append("source", compressedFile);
  payloadData.append("title", payload?.title ?? compressedFile?.name);
  ApiInstance.post(apiEndpoint.credentials.uploadCredentials, payloadData).then(
    (res) => {
      const data = handleResponse(res as any) as any;
      const type =
        payload?.type === "STAMP"
          ? "stamps"
          : payload?.type === "INITIAL"
          ? "initials"
          : "signatures";
      // return data ? callback(
      //   payload?.type === "STAMP" ? data?.[type] : data?.[type]?.[0]
      // ):null;
    }
  );
};

const handleDeleteCredentials = (id: number, callback: (data:any) => void) => {
  ApiInstance.delete(apiEndpoint.credentials.deleteCredentials(id)).then(
    (res) => {
      const data = handleResponse(res as any);
      return callback(data);
    }
  );
};
const handleSetDefaultCredentials = (id: number, callback: (data:any) => void) => {
  ApiInstance.put(apiEndpoint.credentials.setDefaultStamp(id)).then((res) => {
    const data = handleResponse(res as any);

    return callback(data);
  });
};
const handleGetCredentials = (callback: (data:any) => void) => {
  ApiInstance.get(apiEndpoint.credentials.getCredentials).then((res) => {
    const data = handleResponse(res as any);
    return callback(data);
  });
};

const CredentialsService = () => {
  return {
    handleInitialUpload,
    handleGetCredentials,
    handleDeleteCredentials,
    handleSetDefaultCredentials,
  };
};

export default {
  CredentialsService,
  handleInitialUpload,
  handleGetCredentials,
  handleDeleteCredentials,
  handleSetDefaultCredentials,
};
