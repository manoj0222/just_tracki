// encryptionUtils.ts
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'your_encryption_key_here'; // Replace with your encryption key (should be stored securely)

export const encryptState = (state: any) => {
  const serializedState = JSON.stringify(state);
  return CryptoJS.AES.encrypt(serializedState, ENCRYPTION_KEY).toString();
};

export const decryptState = (encryptedState: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedState, ENCRYPTION_KEY);
  const decryptedState = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedState);
};
