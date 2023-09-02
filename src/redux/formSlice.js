import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage, storeData } from '../utils';
import { addLoading } from './globalSlice';
import { BE_API_HOST } from '@env';

export const formSlice = createSlice({
  name: 'formReducer',
  initialState: {
    userId: '',
    nama: '',
  },
  reducers: {
    addForm: (state, action) => {
      state.nama = action.payload.nama;
    },
  },
});
export const uploadKtpSlice = createSlice({
  name: 'photoKtpReducer',
  initialState: {
    uri: '',
    type: '',
    name: '',
    isUploadPhoto: false,
  },
  reducers: {
    addPhotoKtp: (state, action) => {
      state.uri = action.payload.uri;
      state.type = action.payload.type;
      state.name = action.payload.name;
      state.isUploadPhoto = action.payload.isUploadPhoto;
    },
  },
});

export const submitFormSurat = createAsyncThunk(
  'post/postPhoto',
  async (obj, { dispatch }) => {
    const { updateForm, photoKtpReducer, token, userProfile, navigation } = obj
    const tokenApi = `${token.value}`;

    // upload ktp
    if (photoKtpReducer.isUploadPhoto) {
      const dataImgae = photoKtpReducer;
      const formData = new FormData();
      formData.append('nama_lengkap', updateForm.nama_lengkap);
      formData.append('tempat_lahir', updateForm.tempat_lahir);
      formData.append('tgl_lahir', updateForm.tgl_lahir);
      formData.append('jenis_kelamin', updateForm.jenis_kelamin);
      formData.append('alamat', updateForm.alamat);
      formData.append('alamat_domisili', updateForm.alamat_domisili);
      formData.append('keterangan_tempat_tinggal', updateForm.keterangan_tempat_tinggal);
      formData.append('keterangan_keperluan_surat', updateForm.keterangan_keperluan_surat);
      formData.append('file', dataImgae);
      console.log(dataImgae)
      axios
        .post(`${BE_API_HOST}/pengusulan-surat/create`, formData, {
          headers: {
            Authorization: tokenApi,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res.data)
          if (res.data.status) {
            dispatch(addLoading(false));
            navigation.reset({
              index: 0,
              routes: [{ name: 'SuccessUpload' }],
            });
          }
        })
        .catch(err => {
          console.log('gagal upload', err);
          dispatch(addLoading(false));
          showMessage(err?.response?.data.message, 'danger');
        });
    } else {

      data.navigation.reset({
        index: 0,
        routes: [{ name: 'FormUpload' }],
      });
    }
    // tutup upload foto
  },
);

export const { addPhotoKtp } = uploadKtpSlice.actions;
export const { addForm } = formSlice.actions;
