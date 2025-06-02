import { configureStore } from "@reduxjs/toolkit";
import modalManagementReducer from "./slices/modalManagementSlice";
import loadingScreenReducer from "./slices/loadingScreen";
import editAddressReducer from "./slices/editAddress";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    modalManagement: modalManagementReducer,
    loadingScreen: loadingScreenReducer,
    user: userReducer,
    editAddress: editAddressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
