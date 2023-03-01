import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiPlaceholder } from '../../api/api';
import { GoodsResponse, GoodsResponseData } from '../../interfaces/apiInterfaces';

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async (_: undefined, thunkAPI) => {
  try {
    const goods = await apiPlaceholder.get<GoodsResponse>('/products', {
      params: {
        limit: 100,
      },
    });
    console.log('goods data', goods.data.products);

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
// interface ProductCart {
//   id: number;
//   count: number;
// }

interface GoodsState {
  goods: GoodsResponseData[];
  status: 'init' | 'loading' | 'error' | 'success';
  isFetched: boolean;
  shoppingCart: Record<string, number>;
}

const initialState: GoodsState = {
  goods: [],
  status: 'init',
  isFetched: false,
  shoppingCart: {},
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
    },
    removeProductFromCart(state, action: PayloadAction<{ id: number }>) {
      const id = action.payload.id;
      const isExistInCart = state.shoppingCart.hasOwnProperty(id);
      if (!isExistInCart || state.shoppingCart[id] === 0) {
        return;
      }

      state.shoppingCart[id] = state.shoppingCart[id] - 1;
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
