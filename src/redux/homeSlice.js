import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addLoading } from './globalSlice';
import axios from 'axios';
import { BE_API_HOST } from '@env';

export const homeSlice = createSlice({
  name: 'homeReducer',
  initialState: {
    articles: [],
    info: [],
    kegiatan: [],
    popular: [],
    recommended: [],
  },
  extraReducers: {
    ['get/getArticles/fulfilled']: (state, action) => {
      state.articles = action.payload;
    },
    ['get/getArticlesByType/fulfilled']: (state, action) => {
      if (action.meta.arg.type === 'news_update') {
        state.info = action.payload;
      } else if (action.meta.arg.type === 'popular') {
        state.popular = action.payload;
      } else if (action.meta.arg.type === 'kegiatan') {
        state.kegiatan = action.payload;
      }
    },
  },
});

export const getArticles = createAsyncThunk(
  'get/getArticles',
  async (arg, { dispatch }) => {
    const token = `${arg}`;
    try {
      dispatch(addLoading(true));
      const response = await axios.get(`${BE_API_HOST}/portal/articles`, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(addLoading(false));
      // console.log(response.data)
      return response.data.data;
    } catch (error) {
      dispatch(addLoading(false));
      console.log(error);
    }
  },
);

export const getArticlesByType = createAsyncThunk(
  'get/getArticlesByType',
  async (arg, { dispatch }) => {
    const { token, type } = arg;
    try {
      dispatch(addLoading(true));
      const response = await axios.get(
        `${BE_API_HOST}/portal/article-by-type?type=${type}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      dispatch(addLoading(false));

      return response.data.data;
    } catch (error) {
      dispatch(addLoading(false));
      console.log(error);
    }
  },
);
