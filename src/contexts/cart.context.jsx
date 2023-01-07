import { createContext, useState, useEffect } from "react";

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
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartcount: 0,
    total: 0
});

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartcount, setCartCount] = useState(0);
    const [total, settotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0);
        settotal(newTotal);
    }, [cartItems]);

    
    const addItemToCart = (productAdd) => {
        setCartItems(addCartItem(cartItems, productAdd));
    };

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItem(cartItems, itemToRemove));
    };

    const clearItemFromCart = (itemToRemove) => {
        setCartItems(clearCartItem(cartItems, itemToRemove));
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartcount, total };

    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}