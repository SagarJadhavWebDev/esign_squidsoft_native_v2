import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
};

export const InvitationSlice = createSlice({
  name: "addresses",
  initialState: INITIAL_STATE,
  reducers: {
    setInvitations: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setInvitations } = InvitationSlice.actions;

export default InvitationSlice.reducer;
