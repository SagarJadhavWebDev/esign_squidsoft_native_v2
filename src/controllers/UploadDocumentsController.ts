import apiEndpoints from "../constants/apiEndpoints";
import HttpService from "../utils/HttpService";

const UploadDocumentsController = async (
  fileList: any,
  token: any,
  onProgress: any
) => {
  var formData = new FormData();
  Array.from(fileList).forEach((document) => {
    formData.append("documents[]", document);
  });
  const response = await HttpService.uploadFiles(
    apiEndpoints.uploadDocuments,
    {
      token,
      formData,
    },
    onProgress
  );
  return response;
};

export default UploadDocumentsController;
