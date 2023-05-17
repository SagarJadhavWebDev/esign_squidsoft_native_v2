import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
  paymentIntent: null,
  currentOrderId: null,
  stripePaymentSuccess: false,
};

export const CheckoutSlice = createSlice({
  name: "checkout",
  initialState: INITIAL_STATE,
  reducers: {
    setChekoutData: (state, action) => {
      state.data = action.payload;
    },
    setPaymentIntent: (state, action) => {
      state.paymentIntent = action.payload;
    },
    setCurrentOrderId: (state, action) => {
      state.currentOrderId = action.payload;
    },
    setPaymentPending: (state, action) => {
      state.stripePaymentSuccess = action.payload;
    },
  },
});

export const {
  setChekoutData,
  setPaymentIntent,
  setCurrentOrderId,
  setPaymentPending,
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
