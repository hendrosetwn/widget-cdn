import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@store/reducers';
import { ACTIVE_CHATBOX, initialChatboxState } from '@store/reducers/chatboxReducer';

// store data
export const setItem = (key: string, value: any) => {
  let dataStorage: any;
  if (typeof window !== 'undefined') {
    dataStorage = localStorage.setItem(key, JSON.stringify(value));
  }

  return dataStorage;
};

// get data
export const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    chatboxReducer: JSON.parse(getItem(ACTIVE_CHATBOX) ?? JSON.stringify(initialChatboxState)),
  },
});

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => setItem(ACTIVE_CHATBOX, store.getState().chatboxReducer));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;

export { store };
