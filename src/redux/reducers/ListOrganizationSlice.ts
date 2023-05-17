import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: undefined,
};

export const ListOrganizationSlice = createSlice({
  name: "organization",
  initialState: INITIAL_STATE,
  reducers: {
    setOrganization: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setOrganization } = ListOrganizationSlice.actions;

export default ListOrganizationSlice.reducer;
