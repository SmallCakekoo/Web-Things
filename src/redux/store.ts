import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice.ts";

export const storeRedux = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppDispatch = typeof storeRedux.dispatch;
