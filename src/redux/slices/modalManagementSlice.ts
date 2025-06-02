import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";
const initialState = {
  showModal: null as string | null,
};

export const modalManagementSlice = createSlice({
  name: "modalManagement",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = modalManagementSlice.actions;

export const selectShowModal = (state: RootState) =>
  state.modalManagement.showModal;

export default modalManagementSlice.reducer;
