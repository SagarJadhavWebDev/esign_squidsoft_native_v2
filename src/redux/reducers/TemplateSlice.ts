import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
  templateFieldSet: null,
  templateDocuments: null,
  templateFields: null,
};

export const TemplateSlice = createSlice({
  name: "template",
  initialState: INITIAL_STATE,
  reducers: {
    setTemplate: (state, action) => {
      state.data = action.payload;
    },
    setTemplateFieldSet: (state, action) => {
      state.templateFieldSet = action.payload;
    },
    settemplateDocuments: (state, action) => {
      state.templateDocuments = action.payload;
    },
    settemplateFields: (state, action) => {
      state.templateFields = action.payload;
    },
  },
});

export const {
  setTemplate,
  setTemplateFieldSet,
  settemplateDocuments,
  settemplateFields,
} = TemplateSlice.actions;

export default TemplateSlice.reducer;
