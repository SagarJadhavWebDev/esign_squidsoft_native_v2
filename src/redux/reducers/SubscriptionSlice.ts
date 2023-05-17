import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
};

export const SubscriptionSlice = createSlice({
  name: "subscription",
  initialState: INITIAL_STATE,
  reducers: {
    setSubscription: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSubscription } = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
