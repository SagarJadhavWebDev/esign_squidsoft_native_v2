import { createSlice } from "@reduxjs/toolkit";

export interface Initial {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  title: string;
  type: string;
  source: {
    base64: string;
    mime_type: string;
  };
  is_default: number;
  meta: any;
}

export interface Stamp {
  id:         number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  title:      string;
  type:       string;
  source:     Source;
  is_default: number;
  meta:       Meta;
}

export interface Meta {
  name:      string;
  type:      string;
  mime_type: string;
}

export interface Source {
  mime_type: string;
  base64:    string;
}


const INITIAL_STATE = {
  data: {
    initial: null,
    signature: null,
    stamps: null,
  },
};

export const CredentialsSlice = createSlice({
  name: "credentials",
  initialState: INITIAL_STATE,
  reducers: {
    setIntial: (state, action) => {
      state.data.initial = action.payload;
    },
    setSignature: (state, action) => {
      state.data.signature = action.payload;
    },
    setStamps: (state, action) => {
      state.data.stamps = action.payload;
    },
  },
});

export const { setIntial,setSignature,setStamps } = CredentialsSlice.actions;

export default CredentialsSlice.reducer;
