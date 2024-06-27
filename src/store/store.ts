import { configureStore } from "@reduxjs/toolkit";
import Rootreducer from "./Rootreducer";

const store = configureStore({
  reducer: Rootreducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
