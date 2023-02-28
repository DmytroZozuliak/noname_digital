import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiPlaceholder } from '../../api/api';
import { NewsResponse } from '../../interfaces/apiInterfaces';

export const fetchNews = createAsyncThunk('news/fetchNews', async (page: number, thunkAPI) => {
  try {
    const news = await apiPlaceholder.get<NewsResponse[]>('/posts', {
      params: {
        _limit: 10,
        _page: page,
      },
    });

    return news.data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return thunkAPI.rejectWithValue('Server issues');
    } else {
      return thunkAPI.rejectWithValue('Could not get data');
    }
  }
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id: number, thunkAPI) => {
  try {
    await apiPlaceholder.delete(`/posts/${id}`);

    return id;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return thunkAPI.rejectWithValue('Server issues');
    } else {
      return thunkAPI.rejectWithValue('Could not get data');
    }
  }
});

interface NewsState {
  news: NewsResponse[];
  status: 'init' | 'loading' | 'error' | 'success';
  page: number;
  isFetched: boolean;
}

const initialState: NewsState = {
  news: [],
  status: 'init',
  page: 1,
  isFetched: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    isFetched(state, action: PayloadAction<boolean>) {
      state.isFetched = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsResponse[]>) => {
        state.status = 'success';
        state.news = state.news.concat(action.payload);
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteNews.fulfilled, (state, action: PayloadAction<number>) => {
        state.news = state.news.filter((news) => news.id !== action.payload);
        state.status = 'success';
      })
      .addCase(deleteNews.rejected, (state) => {
        state.status = 'error';
      }),
});

export const { reducer: newsReducer, actions: newsActions } = newsSlice;
