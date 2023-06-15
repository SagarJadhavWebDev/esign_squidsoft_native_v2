import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

interface CreateEnvelopeTypes {
  self_sign: boolean;
}
const handleUploadDocument = (
  envelopeId: number,
  payload: any,
  toast: any,
  callback: (data: any) => void
) => {
  ApiInstance.postForm(apiEndpoint.document.uploadDocument(envelopeId), payload)
    .then(async (res) => {
      console.log(res, "docu");
      const data = await handleResponse(res as any, toast);
      return callback(data);
    })
    .catch((err) => {
      toast.show("something went wrong", { type: "error" });
      console.log(err, "docu err");
      callback(false);
    });
};

const handleAddFields = (
  payload: any,
  envelopeId: number,
  callback: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.fields.addFields(envelopeId), payload)
    .then(async (res: any) => {
      const data = await handleResponse(res);
      return callback(data);
    })
    .catch((err) => {
      callback(false);
    });
};

const handleCreateEnvelope = (
  payload: CreateEnvelopeTypes,
  callback: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.envelope.createEnvelope, payload)
    .then(async (res: any) => {
      const data = await handleResponse(res as any);
      return callback(data);
    })
    .catch((err) => {
      callback(false);
    });
};
const handleAddRecipients = (
  payload: any,
  envelopeId: number,
  toast: any,
  callback: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.envelope.addRecipients(envelopeId), payload)
    .then(async (res: any) => {
      const data = await handleResponse(res as any, toast);
      return callback(data);
    })
    .catch((err) => {
      callback(false);
    });
};
const handleFetchEnvelope = (
  envelopeId: any,
  callback: (data: any) => void
) => {
  ApiInstance.get(apiEndpoint.envelope.getEnvelope(envelopeId))
    .then(async (res: any) => {
      const data = await handleResponse(res);
      return callback(data);
    })
    .catch((err) => {
      console.log("FETCH ENVELOPE ERR", err);
      callback(false);
    });
};
const handleFetchViewEnvelope = (
  token: string,
  callback: (data: any) => void
) => {
  ApiInstance.get(apiEndpoint.envelope.viewEnvelope + token)
    .then(async (res: any) => {
      const data = await handleResponse(res);
      return callback(data);
    })
    .catch((err) => {
      callback(false);
    });
};
const handleSendEnvelope = (
  envelopeId: any,
  payload: any,
  toast: any,
  callback: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.envelope.sendEnvelope(envelopeId), payload)
    .then(async (res: any) => {
      console.log("response", await res);
      const data = await handleResponse(res, toast);
      return callback(data);
    })
    .catch((err) => {
      callback(false);
    });
};
export default {
  handleUploadDocument,
  handleCreateEnvelope,
  handleAddRecipients,
  handleAddFields,
  handleFetchEnvelope,
  handleSendEnvelope,
  handleFetchViewEnvelope,
};
