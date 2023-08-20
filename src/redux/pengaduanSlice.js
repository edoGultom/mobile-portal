import { BE_API_HOST } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage, storeData } from '../utils';
import { addLoading } from './globalSlice';

export const pengaduanAction = createAsyncThunk(
  'post/postPengaduan',
  async (obj, { dispatch }) => {
    dispatch(addLoading(true));
    const { filePengaduan, form, token } = obj;
    const tokenApi = `${token.value}`;

    let formData = new FormData();
    formData.append('subjek', form.subjek);
    formData.append('isi', form.isi);
    formData.append('file', form.file);

    await axios
      .post(`${BE_API_HOST}/pengaduan/tambah`, formData, {
        headers: {
          Authorization: tokenApi,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.status) {
          dispatch(addLoading(false));
          dispatch(getPengaduan(tokenApi));//langsung get data
        } else {
          showMessage(res.pesan);
        }
      })
      .catch(err => {
        dispatch(addLoading(false));
        showMessage(err?.response?.data?.message);
        console.log(err);
      });
  },
);

export const getPengaduan = createAsyncThunk(
  'get/getPengaduan',
  async (arg, { dispatch }) => {
    // const tokenApi = `${arg.value}`;
    try {
      dispatch(addLoading(true));
      const response = await axios.get(
        `${BE_API_HOST}/pengaduan/data`,
        {
          headers: {
            Authorization: arg,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      dispatch(addLoading(false));
      dispatch(addListPengaduan(response.data.data));//langsung simpan ke global state

      // return response.data.data;
    } catch (error) {
      dispatch(addLoading(false));
      console.log(error);
    }
  },
);

export const pengaduanSlice = createSlice({
  name: 'pengaduanReducer',
  initialState: {
    listPengaduan: [],
  },
  reducers: {
    addListPengaduan: (state, action) => {
      state.listPengaduan = action.payload;
      // cara push state ke initial state dengan tidak menimpa
    },
  },
});
export const { addListPengaduan } = pengaduanSlice.actions;
