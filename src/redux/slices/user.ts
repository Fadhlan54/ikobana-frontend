import { Address } from "@/interface/address";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  addresses: Address[];
};

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  role: null,
  addresses: [],
};

// Membuat slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, name, email, phone } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.addresses = action.payload.addresses;
    },
    resetUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.phone = null;
    },
    addUserAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
  },
});

export const { setUser, resetUser, addUserAddress } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;
