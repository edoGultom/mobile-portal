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

export const uploadPhoto = createAsyncThunk(
  'post/postPhoto',
  async (obj, { dispatch }) => {
    const { photoKtpReducer, token, userProfile, navigation } = obj
    const tokenApi = `${token.value}`;

    // upload ktp
    if (photoKtpReducer.isUploadPhoto) {
      const dataImgae = photoKtpReducer;
      const photoForUpload = new FormData();
      photoForUpload.append('file', dataImgae);
      console.log(tokenApi)
      axios
        .post(`${BE_API_HOST}/upload-file/upload-ktp?userId=${userProfile.id}`, photoForUpload, {
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
          // profile.profile_photo_url = resUpload.data.data.path;

          // storeData('userProfile', profile);
          // data.navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'SuccessSignUp' }],
          // });
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
