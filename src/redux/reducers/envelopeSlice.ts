import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
  viewEnvelope: null,
};

export const EnvelopeSlice = createSlice({
  name: "envelope",
  initialState: INITIAL_STATE,
  reducers: {
    setEnvelope: (state, action) => {
      state.data = action.payload;
    },
    setViewEnvelope: (state, action) => {
      state.viewEnvelope = action.payload;
    },
  },
});

export const { setEnvelope, setViewEnvelope } = EnvelopeSlice.actions;

export default EnvelopeSlice.reducer;
