import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import { ReactComponent as ShoppingIcaon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartcount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <CartIconContainer onClick={ toggleIsCartOpen }>
            <ShoppingIcon/>
            <ItemCount>{ cartcount }</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;