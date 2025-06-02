import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";

const initialState = false as boolean;

export const loadingScreen = createSlice({
  name: "loadingScreen",
  initialState,
  reducers: {
    setLoadingScreen: (state, action) => action.payload,
  },
});

export const { setLoadingScreen } = loadingScreen.actions;
export const selectLoadingScreen = (state: RootState) => state.loadingScreen;
export default loadingScreen.reducer;
