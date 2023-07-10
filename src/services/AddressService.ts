import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetAddresses = (callBack: (data: any) => void) => {
  ApiInstance.get(apiEndpoint.address.getAddress)
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};
const handleCreateAddresses = (
  payload: any,
  toast: any,
  callBack: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.address.createAddress, payload)
    .then(async (res) => {
      const data = await handleResponse(res as any, toast);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};
const handleSetDefaultAddresses = (
  id: any,
  toast: any,
  callBack: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.address.setDefaultAddress(id))
    .then(async (res) => {
      const data = await handleResponse(res as any, toast);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};
const handleDeleteAddresses = (
  id: any,
  toast: any,
  callBack: (data: any) => void
) => {
  ApiInstance.delete(apiEndpoint.address.deleteAddress(id))
    .then(async (res) => {
      const data = await handleResponse(res as any, toast);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};
const Addressservice = {
  handleGetAddresses,
  handleCreateAddresses,
  handleSetDefaultAddresses,
  handleDeleteAddresses,
};

export default Addressservice;
