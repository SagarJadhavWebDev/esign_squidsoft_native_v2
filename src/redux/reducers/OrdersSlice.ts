import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: null,
};

export const OrdersSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  reducers: {
    setOrders: (state, action) => {
      state.data = action.payload;
    },
    
  },
});

export const { setOrders } = OrdersSlice.actions;

export default OrdersSlice.reducer;
