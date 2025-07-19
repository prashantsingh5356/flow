import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    value: "home",
    workspace: "",
  },
  reducers: {
    activeSidebar: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    activeWorkspace: (state, action: PayloadAction<string>) => {
      state.workspace = action.payload;
    },
  },
});

export const { activeSidebar, activeWorkspace } = sidebarSlice.actions;
