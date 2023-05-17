import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
  selecteDocument: null,
};

export const DocumentsSlice = createSlice({
  name: "documents",
  initialState: INITIAL_STATE,
  reducers: {
    setDocuments: (state, action) => {
      state.data = action.payload;
    },
    setSelecteDocument: (state, action) => {
      state.selecteDocument = action?.payload;
    },
  },
});

export const { setDocuments, setSelecteDocument } = DocumentsSlice.actions;

export default DocumentsSlice.reducer;
