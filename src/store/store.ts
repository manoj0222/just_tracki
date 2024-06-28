import { configureStore } from "@reduxjs/toolkit";
import Rootreducer from "./Rootreducer";
import { loadState, saveState } from './sessionStorage';

// Load persisted state from sessionStorage
const persistedState = loadState();


const store = configureStore({
  reducer: Rootreducer,
  preloadedState: persistedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Save state to sessionStorage just before the page unloads
window.addEventListener('beforeunload', () => {
  saveState(store.getState());
});

export default store;
