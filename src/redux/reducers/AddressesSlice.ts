import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
};

export const AddressesSlice = createSlice({
  name: "addresses",
  initialState: INITIAL_STATE,
  reducers: {
    setAddresses: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setAddresses } = AddressesSlice.actions;

export default AddressesSlice.reducer;
