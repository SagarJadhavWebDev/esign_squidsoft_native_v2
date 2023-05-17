import { createSlice } from "@reduxjs/toolkit";
import { Country, State } from "types/CountrySelectorTypes";

export interface CountrySelectorTypes {
  countries: Country[];
  states: State[];
  cities: State[];
}
const INITIAL_STATE: CountrySelectorTypes = {
  countries: null,
  states: null,
  cities: null,
};

export const CountrySelectorSlice = createSlice({
  name: "countrySelector",
  initialState: INITIAL_STATE,
  reducers: {
    setCountriesData: (state, action) => {
      state.countries = action.payload;
    },
    setStatesData: (state, action) => {
      state.states = action.payload;
    },
    setCitiesData: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { setCountriesData, setStatesData, setCitiesData } =
  CountrySelectorSlice.actions;

export default CountrySelectorSlice.reducer;
