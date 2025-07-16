import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    value: "home",
  },
  reducers: {
    activeSidebar: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { activeSidebar } = sidebarSlice.actions;
