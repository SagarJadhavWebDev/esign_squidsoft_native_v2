import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  pdf: null,
  totalPage: null,
  currentPage: null,
  droppedField: null,
  addedFields: [],
  fixedFields: [],
  containerZIndex: 0,
  remoteFields:[]
};

export const PdfSlice = createSlice({
  name: "documents",
  initialState: INITIAL_STATE,
  reducers: {
    setPdf: (state, action) => {
      state.pdf = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPage = action?.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action?.payload;
    },
    setDroppedField: (state, action) => {
      state.droppedField = action?.payload;
    },
    setAddedFields: (state, action) => {
      state.addedFields = action?.payload;
    },
    setFixedFields: (state, action) => {
      state.fixedFields = action?.payload;
    },
    setContainerZIndex: (state, action) => {
      state.containerZIndex = action?.payload;
    },
    setRemoteFields: (state, action) => {
      state.remoteFields = action?.payload;
    },
  },
});

export const {
  setPdf,
  setTotalPages,
  setCurrentPage,
  setDroppedField,
  setAddedFields,
  setFixedFields,
  setContainerZIndex,
  setRemoteFields
} = PdfSlice.actions;

export default PdfSlice.reducer;
