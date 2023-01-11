import { createContext, useState, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer";

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

export const CartContext = createContext({
    isCartOpen: true,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartcount: 0,
    total: 0
});

const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhadled type of ${type} in cartReducer`)
    }
};

export const CartProvider = ({ children }) => {

    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartcount, setCartCount] = useState(0);
    // const [total, settotal] = useState(0);

    const [{ cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITAL_STATE);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0);
    //     settotal(newTotal);
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.qty, 0);

        const newTotal = newCartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newTotal,
            cartCount: newCartCount
        }));
    };

    
    const addItemToCart = (productAdd) => {
        const newCartItems = addCartItem(cartItems, productAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (itemToRemove) => {
        const newCartItems = removeCartItem(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (itemToRemove) => {
        const newCartItems = clearCartItem(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {

        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, cartTotal };

    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}