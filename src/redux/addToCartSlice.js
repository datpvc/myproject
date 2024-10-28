import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../models/CartItem';

let initialState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const getTotalQuantity = (cart) => {
  return cart.reduce((total, cartItem) => {
    return (total = total + cartItem.quantity);
  }, 0);
};

const getTotalPrice = (cart) => {
  return cart.reduce((total, cartItem) => {
    return (total = total + cartItem.totalPriceItem);
  }, 0);
};

const addToCartSlice = createSlice({
  name: 'addToCartSlice',
  initialState,
  reducers: {
    onAdd: (state, action) => {
      let _cart = [...state.cart];
      let cartItem = { ...action.payload };
      let index = _cart.findIndex(
        (_cartItem) => _cartItem.product.id === cartItem.product.id
      );
      if (index !== -1) {
        cartItem = new CartItem(
          _cart[index].product,
          _cart[index].quantity + cartItem.quantity
        );

        _cart[index] = { ...cartItem };
      } else {
        _cart.push(cartItem);
      }

      var totalPrice = getTotalPrice(_cart);
      var totalQuantity = getTotalQuantity(_cart);
      state.cart = _cart;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    onRemove: (state, action) => {
      let _cart = [...state.cart];
      _cart = _cart.filter(
        (_cartItem) => _cartItem.product.id !== action.payload.id
      );
      var totalPrice = getTotalPrice(_cart);
      var totalQuantity = getTotalQuantity(_cart);
      state.cart = _cart;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    onChangeQuantity: (state, action) => {
      let _cart = [...state.cart];
      let cartItem = { ...action.payload };
      let index = _cart.findIndex(
        (_cartItem) => _cartItem.product.id === cartItem.product.id
      );

      if (index !== -1) {
        cartItem = new CartItem(_cart[index].product, cartItem.quantity);

        _cart[index] = { ...cartItem };
      }

      var totalPrice = getTotalPrice(_cart);
      var totalQuantity = getTotalQuantity(_cart);
      state.cart = _cart;
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    onClear: (state, action) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { onAdd, onRemove, onChangeQuantity, onClear } =
  addToCartSlice.actions;
export default addToCartSlice.reducer;
