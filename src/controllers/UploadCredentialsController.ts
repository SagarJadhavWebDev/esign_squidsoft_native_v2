import ApiConfig from "../constants/ApiConfig";
import apiEndpoint from "../constants/apiEndpoints";
import apiEndpoints from "../constants/apiEndpoints";
import {
  UploadCredentialsFileType,
  UploadCredentialsType,
} from "../types/UploadCredentialsType";
import useAuth from "../utils/auth";
import CryptoHandler from "../utils/EncryptDecryptHandler";
import HttpService from "../utils/HttpService";

const UploadCredentialsController = async (
  file: any,
  type: UploadCredentialsType,
  name: any,
  token: any
) => {
  console.log("FILEBLOBL");
  const fileBlob = {
    name: file?.name,
    filename: file?.name,
    type: file?.type,
    uri: file?.uri, //RNFetchBlob.wrap(result?.uri),
  };
  console.log("FILEBLOBL", fileBlob);
  const formData = new FormData();
  formData.append("source", fileBlob);
  formData.append("type", type);
  formData.append("title", name);
  const response = await HttpService.postFile(
    apiEndpoint.credentials.uploadCredentials,
    {
      token,
      formData,
    }
  );
  return response;
};

export default UploadCredentialsController;
