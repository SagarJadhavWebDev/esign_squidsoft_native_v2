import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
};

export const PlansSlice = createSlice({
  name: "plans",
  initialState: INITIAL_STATE,
  reducers: {
    setPlans: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPlans } = PlansSlice.actions;

export default PlansSlice.reducer;
