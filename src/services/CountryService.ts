import apiEndpoint from "../constants/apiEndpoints";
import ApiInstance from "./ApiInstance";
import handleResponse from "./handleResponse";

const handleGetCountry = (callBack: (data: any) => void) => {
  ApiInstance.get(apiEndpoint.country.getStateCountry).then(async (res) => {
    const data = await handleResponse(res as any);
    return callBack(data);
  });
};
const handleGetStatesCity = (
  countryCode: string,
  callBack: (data: any) => void
) => {
  ApiInstance.get(apiEndpoint.country.getStateCity(countryCode)).then(
    async (res) => {
      const data = await handleResponse(res as any);
      return callBack(data);
    }
  );
};
const handleGetCities = (
  countryCode: string,
  stateCode: string,
  callBack: (data: any) => void
) => {
  ApiInstance.get(
    apiEndpoint.country.getCountryStateCity(countryCode, stateCode)
  ).then(async (res) => {
    const data = await handleResponse(res as any);
    return callBack(data);
  });
};
const CountryService = {
  handleGetCountry,
  handleGetStatesCity,
  handleGetCities,
};

export default CountryService;
