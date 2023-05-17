import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetTemplates = (
  pageNumber: number,
  perPage: number,
  callBack: (data: any) => void
) => {
  ApiInstance.get(apiEndpoint.templates.getTemplates(pageNumber, perPage))
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((res) => {
      callBack(false);
    });
};
const handleUseTemplates = (
  id: number,
  payload: any,
  callBack: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.templates.useAsTemplates(id), payload)
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((res) => {
      callBack(false);
    });
};
const handleDeleteTemplates = (id: number, callBack: (data: any) => void) => {
  ApiInstance.post(apiEndpoint.templates.deleteTemplate(id))
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((res) => {
      callBack(false);
    });
};

const handleCreateTemplate = (payload: any, callBack: (data: any) => void) => {
  ApiInstance.post(apiEndpoint.templates.createTemplates, payload)
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((res) => {
      callBack(false);
    });
};
const handleTemplateUploadDocments = (
  id: number,
  payload: any,
  callBack: (data: any) => void
) => {
  let documents = new FormData();
  Array.from(payload).forEach((document: any) => {
    documents.append("documents[]", document);
  });

  ApiInstance.post(apiEndpoint.templates.uploadTemplateDocuments(id), documents)
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((res) => {
      callBack(false);
    });
};
export {
  handleTemplateUploadDocments,
  handleGetTemplates,
  handleUseTemplates,
  handleDeleteTemplates,
  handleCreateTemplate,
};
