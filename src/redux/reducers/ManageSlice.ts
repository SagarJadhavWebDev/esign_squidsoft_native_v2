import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
  count: null,
  currentTab: "inbox",
};

export const ManageSlice = createSlice({
  name: "manage",
  initialState: INITIAL_STATE,
  reducers: {
    setManageList: (state, action) => {
      state.data = action.payload;
    },
    setManageCount: (state, action) => {
      state.count = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setManageList, setManageCount, setCurrentTab } =
  ManageSlice.actions;

export default ManageSlice.reducer;
