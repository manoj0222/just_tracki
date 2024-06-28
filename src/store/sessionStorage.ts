// sessionStorage.ts
import { encryptState, decryptState }  from "../utils/encryptionUtils";

export const loadState = () => {
  try {
    const encryptedState = sessionStorage.getItem('appState');
    if (encryptedState === null) {
      return undefined; // No stored state found
    }
    const decryptedState = decryptState(encryptedState);
    return decryptedState;
  } catch (err) {
    console.error('Error loading state from sessionStorage:', err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const encryptedState = encryptState(state);
    sessionStorage.setItem('appState', encryptedState);
  } catch (err) {
    console.error('Error saving state to sessionStorage:', err);
  }
};
