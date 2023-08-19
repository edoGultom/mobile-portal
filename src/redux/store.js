import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { globalSlice } from './globalSlice';
import { signUpSlice, photoUploadSlice } from './signUpSlice';
import { homeSlice } from './homeSlice';
import { formSlice, uploadKtpSlice } from './formSlice';
import { pengaduanSlice } from './pengaduanSlice';
// import { notifSlice } from './notifSliceBackup';

const reducers = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [signUpSlice.name]: signUpSlice.reducer,
  [homeSlice.name]: homeSlice.reducer,
  [photoUploadSlice.name]: photoUploadSlice.reducer,
  [uploadKtpSlice.name]: uploadKtpSlice.reducer,
  [formSlice.name]: formSlice.reducer,
  [pengaduanSlice.name]: pengaduanSlice.reducer,
  // [notifSlice.name]: notifSlice.reducer,
});

let middlewares = [];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares), // <-- ADD THIS
});

export default store;
