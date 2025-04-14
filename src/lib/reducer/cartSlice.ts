import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ICart } from '../../types/cart.types';

interface CartState {
  cartInfo: ICart | undefined;
}

const initialState: CartState = {
  cartInfo: undefined
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartInfo = undefined;
    },
    addCartInfo: (state, action: PayloadAction<ICart>) => {
      state.cartInfo = action.payload;
    }
  },
});

export const selectCartItems = (state: { cart: CartState }) => {
  if(state.cart.cartInfo?._id) {
    return state.cart.cartInfo.items;
  }
};

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items?.length,
);

export const { clearCart, addCartInfo } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
