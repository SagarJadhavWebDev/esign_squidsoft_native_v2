import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleCreateOrder = (payload: any, callBack: (data: any) => void) => {
  ApiInstance.post(apiEndpoint.order.createOrder, payload)
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      console.log("order crete error", err);
      return callBack(null);
    });
};
const handleApplyCoupnCode = (payload: any, callBack: (data: any) => void) => {
  ApiInstance.get(
    apiEndpoint.order.verifyCouponCode(
      payload?.id,
      payload?.couponCode,
      payload?.type
    )
  )
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(null);
    });
};
const handleVerifyOrder = (payload: any, callBack: (data: any) => void) => {
  ApiInstance.post(apiEndpoint.order.orderCheckout(payload?.id), payload).then(
    (res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    }
  );
};
const handleCancelOrder = (id: any, callBack: (data: any) => void) => {
  ApiInstance.delete(apiEndpoint.order.cancelOrder(id))
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};
const handleGetAllOrder = (
  currentPage: number,
  perPage: number,
  callBack: (data: any) => void
) => {
  ApiInstance.get(apiEndpoint.order.getAllorders(currentPage, perPage))
    .then(async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};
const handleAddonCreateOrder = (
  payload: any,
  callBack: (data: any) => void
) => {
  ApiInstance.post(apiEndpoint.addOns.createAddon, payload)
    .then((res) => {
      const data = handleResponse(res as any);
      return callBack(data);
    })
    .catch((err) => {
      return callBack(false);
    });
};
const OrderService = {
  handleCancelOrder,
  handleCreateOrder,
  handleApplyCoupnCode,
  handleVerifyOrder,
  handleGetAllOrder,
  handleAddonCreateOrder,
};
export default OrderService;
