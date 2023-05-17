import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
};

export const TemplatesSlice = createSlice({
  name: "teams",
  initialState: INITIAL_STATE,
  reducers: {
    setTemplates: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTemplates } = TemplatesSlice.actions;

export default TemplatesSlice.reducer;
