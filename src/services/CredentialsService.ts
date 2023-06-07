import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";
import upperCase from "lodash/upperCase";
//import CompressedImage from "../utils/";
const handleInitialUpload = async (
  payload: any,
  toast: any,
  callback: (data: any) => void
) => {
  const payloadData = new FormData();
  const compressedFile = payload?.file;
  payloadData.append("type", upperCase(payload?.type));
  payloadData.append("source", compressedFile);
  payloadData.append("title", payload?.title);
  ApiInstance.postForm(apiEndpoint.credentials.uploadCredentials, payloadData)
    .then(async (res) => {
      const data = await handleResponse(res);
      const type =
        upperCase(payload?.type) === "STAMP"
          ? "stamps"
          : upperCase(payload?.type) === "INITIAL"
          ? "initials"
          : "signatures";
      return data
        ? callback(
            upperCase(payload?.type) === "STAMP"
              ? data?.[type]
              : data?.[type]?.[0]
          )
        : false;
    })
    .catch((err) => {
      callback(false);
    });
};

const handleDeleteCredentials = (id: number, callback: (data: any) => void) => {
  ApiInstance.delete(apiEndpoint.credentials.deleteCredentials(id)).then(
    async (res) => {
      const data = await handleResponse(res as any);
      return callback(data);
    }
  );
};
const handleSetDefaultCredentials = (
  id: number,
  callback: (data: any) => void
) => {
  ApiInstance.put(apiEndpoint.credentials.setDefaultStamp(id)).then(
    async (res) => {
      const data = await handleResponse(res as any);
      return callback(data);
    }
  );
};
const handleGetCredentials = (callback: (data: any) => void) => {
  ApiInstance.get(apiEndpoint.credentials.getCredentials).then(async (res) => {
    const data = await handleResponse(res as any);
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
