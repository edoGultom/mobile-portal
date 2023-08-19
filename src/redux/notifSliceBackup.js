import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage, storeData } from '../utils';
import { addLoading } from './globalSlice';
import { BE_API_HOST } from '@env';

export const notifSlice = createSlice({
  name: 'notifReducer',
  initialState: {
    notifications: [],
  },
  reducers: {
    notifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const getNotif = createAsyncThunk(
  'get/getNotif',
  async (obj, { dispatch }) => {
    const { photoKtpReducer, token, userProfile, navigation } = obj
    const tokenApi = `${token.value}`;
    console.log(tokenApi);
  }
  // tutup upload foto
);

export const { notifications } = notifSlice.actions;
