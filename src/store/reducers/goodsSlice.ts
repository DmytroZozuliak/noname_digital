import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiPlaceholder } from '../../api/api';
import { GoodsResponse, GoodsResponseData } from '../../interfaces/apiInterfaces';
import { shoppingCartStorage } from '../../utils/localStorageModels';

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async (_: undefined, thunkAPI) => {
  try {
    const goods = await apiPlaceholder.get<GoodsResponse>('/products', {
      params: {
        limit: 100,
      },
    });

    return goods.data.products;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return thunkAPI.rejectWithValue('Server issues');
    } else {
      return thunkAPI.rejectWithValue('Could not get data');
    }
  }
});

interface GoodsState {
  goods: GoodsResponseData[];
  status: 'init' | 'loading' | 'error' | 'success';
  isFetched: boolean;
  shoppingCart: Record<string, number>;
}

const initialShopCart: Record<string, number> = JSON.parse(shoppingCartStorage.getItem() || '{}');

const initialState: GoodsState = {
  goods: [],
  status: 'init',
  isFetched: false,
  shoppingCart: initialShopCart,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    isFetched(state, action: PayloadAction<boolean>) {
      state.isFetched = action.payload;
    },
    addProductToCart(state, action: PayloadAction<{ id: number }>) {
      const id = action.payload.id;
      const isExistInCart = state.shoppingCart.hasOwnProperty(id);
      if (!isExistInCart) {
        state.shoppingCart[id] = 1;
      } else {
        state.shoppingCart[id] = state.shoppingCart[id] + 1;
      }

      shoppingCartStorage.setItem(JSON.stringify(state.shoppingCart));
    },
    removeProductFromCart(state, action: PayloadAction<{ id: number }>) {
      const id = action.payload.id;
      const isExistInCart = state.shoppingCart.hasOwnProperty(id);
      if (!isExistInCart || state.shoppingCart[id] === 0) {
        return;
      }

      state.shoppingCart[id] = state.shoppingCart[id] - 1;

      shoppingCartStorage.setItem(JSON.stringify(state.shoppingCart));
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoods.fulfilled, (state, action: PayloadAction<GoodsResponseData[]>) => {
        state.status = 'success';
        state.goods = action.payload;
      })
      .addCase(fetchGoods.rejected, (state) => {
        state.status = 'error';
      }),
});

export const { reducer: goodsReducer, actions: goodsActions } = goodsSlice;
