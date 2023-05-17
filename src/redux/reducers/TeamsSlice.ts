import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
  selectedUser: null,
};

export const TeamsSlice = createSlice({
  name: "teams",
  initialState: INITIAL_STATE,
  reducers: {
    setTeams: (state, action) => {
      state.data = action.payload;
    },
    setselectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setTeams, setselectedUser } = TeamsSlice.actions;

export default TeamsSlice.reducer;
