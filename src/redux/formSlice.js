import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage, storeData} from '../utils';
import {addLoading} from './globalSlice';
import {BE_API_HOST} from '@env';

export const formSlice = createSlice({
  name: 'formReducer',
  initialState: {
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

// export const signUpAction = createAsyncThunk(
//   'post/postForm',
//   async (data, {dispatch}) => {
//     console.log(data, 'data');

//     await axios
//       .post(`${BE_API_HOST}/user/register`, data)
//       .then(res => {
//         const profile = res.data.data;
//         console.log(res.data.status, 'ress');
//         if (res.data.status) {
//           const username = profile.username;
//           let formData = new FormData();
//           formData.append('username', username);
//           formData.append('password', data.password);
//           formData.append('grant_type', 'password');
//           formData.append('client_id', 'testclient');
//           formData.append('client_secret', 'testpass');

//           axios
//             .post(`${BE_API_HOST}/user/login`, formData, {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//               },
//             })
//             .then(res => {
//               if (res.data.access_token) {
//                 const token = `${res.data.token_type} ${res.data.access_token}`;
//                 storeData('token', {value: token});

//                 // upload foto
//                 if (data.photoKtp.isUploadPhoto) {
//                   const dataImgae = data.photoKtp;
//                   const photoForUpload = new FormData();
//                   photoForUpload.append('file', dataImgae);
//                   axios
//                     .post(`${BE_API_HOST}/upload-file/upload`, photoForUpload, {
//                       headers: {
//                         Authorization: token,
//                         'Content-Type': 'multipart/form-data',
//                       },
//                     })
//                     .then(resUpload => {
//                       profile.profile_photo_url =
//                         `${BE_API_HOST}/lihat-file/profile?path=` +
//                         resUpload.data.path;
//                       storeData('userProfile', profile);
//                       data.navigation.reset({
//                         index: 0,
//                         routes: [{name: 'SuccessSignUp'}],
//                       });
//                     })
//                     .catch(err => {
//                       console.log('gagal upload', err);
//                       dispatch(addLoading(false));
//                       showMessage(err?.response?.data.message, 'danger');
//                     });
//                 } else {
//                   storeData('userProfile', profile);
//                   data.navigation.reset({
//                     index: 0,
//                     routes: [{name: 'SuccessSignUp'}],
//                   });
//                 }
//                 // tutup upload foto
//               } else {
//                 showMessage('Gagal mengambil token');
//               }
//               dispatch(addLoading(false));
//             })
//             .catch(function (error) {
//               console.log('gagal login');
//               dispatch(addLoading(false));
//               showMessage(error);
//             });
//         }
//       })
//       .catch(err => {
//         dispatch(addLoading(false));
//         // showMessage(err?.response?.data.message);
//         console.log(err, 'err');
//         showMessage(err);
//       });
//   },
// );

export const {addPhotoKtp} = uploadKtpSlice.actions;
export const {addForm} = formSlice.actions;
