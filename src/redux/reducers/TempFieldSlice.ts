import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  allTempFields: null,
  field: null,
  tempStamp: null,
  tempSignature: null,
  tempInitial: null,
  selfSignFields: null,
};

export const TempFieldSlice = createSlice({
  name: "tempFieldSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setTempStamp: (state, action) => {
      state.tempStamp = action.payload;
    },
    setTempInitial: (state, action) => {
      state.tempInitial = action.payload;
    },
    setTempSignature: (state, action) => {
      state.tempSignature = action.payload;
    },
    setTempField: (state, action) => {
      state.field = action.payload;
    },
    setAllTempFields: (state, action) => {
      state.allTempFields = action.payload;
    },
    setSelfSignFields: (state, action) => {
      state.selfSignFields = action.payload;
    },
  },
});

export const {
  setTempStamp,
  setTempInitial,
  setTempSignature,
  setTempField,
  setAllTempFields,
  setSelfSignFields,
} = TempFieldSlice.actions;

export default TempFieldSlice.reducer;
