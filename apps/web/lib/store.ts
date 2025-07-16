import { configureStore } from "@reduxjs/toolkit";
import { sidebarSlice } from "./features/sidebar/sidebar";

export const makeStore = () => {
  return configureStore({
    reducer: { sidebar: sidebarSlice.reducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
