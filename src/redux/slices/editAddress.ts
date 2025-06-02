import { createSlice } from "@reduxjs/toolkit";

const initialState = null as number | null;

export const editAddressSlice = createSlice({
  name: "editAddress",
  initialState,
  reducers: {
    setEditAddress: (state, action) => action.payload,
  },
});

export const { setEditAddress } = editAddressSlice.actions;
export const selectEditAddress = (state: { editAddress: number | null }) =>
  state.editAddress;
export default editAddressSlice.reducer;
