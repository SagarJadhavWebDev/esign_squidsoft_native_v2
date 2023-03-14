import HttpService from "../utils/HttpService";

const store = async ({
  plan_id,
  couponcode = null,
  isYearly = false,
  totalCost,
  domain,
  address,
  token,
}: any) => {
  const response = await HttpService.post(
    "/" + HttpService.getHostName() + "/orders",
    {
      token: token,
      body: JSON.stringify({
        plan_id: plan_id,
        isYearly: isYearly,
        couponcode: couponcode,
        amount: totalCost,
        name: address?.name,
        taxno: address?.taxno,
        address: address?.address,
        zipcode: address?.zipcode,
        country: address?.country,
        state: address?.state,
        city: address?.city,
      }),
    }
  );

  return response;
};

export { store };
