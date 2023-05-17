import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
};

export const NotificationSlice = createSlice({
  name: "notifications",
  initialState: INITIAL_STATE,
  reducers: {
    setNotifications: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setNotifications } = NotificationSlice.actions;

export default NotificationSlice.reducer;
