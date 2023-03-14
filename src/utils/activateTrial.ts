import apiEndpoints from "../constants/apiEndpoints";
import routes from "../constants/routes";
import getIpData from "./getIpData";
import HttpService from "./HttpService";

const activateTrial = (
  id: number,
  name: String,
  token: any,
  toast: any,
  RefreshUser: any,
  navigation: any,
  setIsLoading?: any
) => {
  setIsLoading(true);
  getIpData((data: any) => {
    const payload = {
      plan_id: id,
      isYearly: false,
      couponcode: null,
      totalCost: null,
      name: name,
      address: data,
      zipcode: data?.zipcode,
      country: data?.country,
      state: data?.state,
      city: data?.city,
    };
    console.log("ACTIVATE PAYLOAD", payload);
    HttpService.post(apiEndpoints.activateTrail(id), {
      token: token,
      body: JSON.stringify({
        plan_id: payload?.plan_id,
        isYearly: payload?.isYearly,
        couponcode: payload?.couponcode,
        amount: payload?.totalCost,
        name: payload?.name,
        taxno: null,
        address: payload?.address,
        zipcode: payload?.zipcode,
        country: payload?.country,
        state: payload?.state,
        city: payload?.city,
      }),
    })
      .then((res) => {
        console.log("RES", res);
        toast.show(res?.message ?? "Trial Plan Is Activated", {
          type: "warning",
        });
        RefreshUser && RefreshUser(token);
        setIsLoading(false);
        navigation.navigate(routes.Subscriptions);
      })
      .catch((err) => {
        toast.show("Plan activation error", { type: "error" });
        console.log("ACTIVATE PLAN ERR", err);
        setIsLoading(false);
      });
  }).catch(() => {
    setIsLoading(false);
  });
};

export { activateTrial };
