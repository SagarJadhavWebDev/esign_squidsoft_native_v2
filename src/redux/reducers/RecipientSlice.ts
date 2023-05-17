import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  localRecipients: null,
  data: null,
  selectedRecipients: null,
};

export const RecipientSlice = createSlice({
  name: "recipient",
  initialState: INITIAL_STATE,
  reducers: {
    setRecipients: (state, action) => {
      state.data = action.payload;
    },
    setselectedRecipients: (state, action) => {
      state.selectedRecipients = action.payload;
    },
    setLocalRecipients: (state, action) => {
      state.localRecipients = action.payload;
    },
  },
});

export const { setRecipients, setLocalRecipients, setselectedRecipients } =
  RecipientSlice.actions;

export default RecipientSlice.reducer;
