import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetAddresses = (callBack: (data:any) => void) => {
  ApiInstance.get(apiEndpoint.address.getAddress).then((res) => {
    const data = handleResponse(res as any);
    return callBack(data);
  });
};
const handleCreateAddresses = (payload: any, callBack: (data:any) => void) => {
  ApiInstance.post(apiEndpoint.address.createAddress, payload).then((res) => {
    const data = handleResponse(res as any);
    return callBack(data);
  });
};
const handleSetDefaultAddresses = (id: any, callBack: (data:any) => void) => {
  ApiInstance.post(apiEndpoint.address.setDefaultAddress(id)).then((res) => {
    const data = handleResponse(res as any);
    return callBack(data);
  });
};
const handleDeleteAddresses = (id: any, callBack: (data:any) => void) => {
    ApiInstance.delete(apiEndpoint.address.deleteAddress(id)).then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    });
  };
const Addressservice = {
  handleGetAddresses,
  handleCreateAddresses,
  handleSetDefaultAddresses,
  handleDeleteAddresses
};

export default Addressservice;
