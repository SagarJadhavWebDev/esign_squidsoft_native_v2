import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentPage: 1,
  totalPages: null,
  perPage: 10,
};

export const PaginationSlice = createSlice({
  name: "pagination",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
});

export const { setTotalPages, setCurrentPage,setPerPage } = PaginationSlice.actions;

export default PaginationSlice.reducer;
