import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import { ReactComponent as ShoppingIcaon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {

    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    
    return(
        <CartIconContainer onClick={ toggleIsCartOpen }>
            <ShoppingIcon/>
            <ItemCount>{ cartCount }</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;