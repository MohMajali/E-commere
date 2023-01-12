import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

export const selectCartCount = createSelector([selectCartItems], (cartItems) => 
cartItems.reduce((total, cartItem) => total + cartItem.qty, 0));

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => 
cartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0));

// const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.qty, 0);

// const newTotal = newCartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0);