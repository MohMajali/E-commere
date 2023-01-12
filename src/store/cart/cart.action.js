import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer";

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

const addCartItem = (cartItems, productAdd) => {
    
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === productAdd.id
    );

    if(existingCartItem){

        return cartItems.map((cartItem) => 

            cartItem.id === productAdd.id ? { ...cartItem, qty: cartItem.qty + 1}
            : cartItem
        );
    }

    return [...cartItems, { ...productAdd, qty: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === cartItemToRemove.id
    );

    if(existingCartItem.qty === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => 

    cartItem.id === cartItemToRemove.id ? { ...cartItem, qty: cartItem.qty - 1}
    : cartItem

    );
};

const clearCartItem = (cartItems, cartItemToClear) => {

    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

};

export const addItemToCart = (cartItems, productAdd) => {
    const newCartItems = addCartItem(cartItems, productAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, itemToRemove) => {
    const newCartItems = clearCartItem(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// const setIsCartOpen = (bool) => {

//     dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
// };