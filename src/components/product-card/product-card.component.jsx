import './product-card.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {

    const { name, price, imageUrl, id } = product;
    const cartItems = useSelector(selectCartItems);
    // const { addItemToCart } = useContext(CartContext);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <div className='product-card-container'>
            <img src={ imageUrl } alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <Button buttonType={ BUTTON_TYPE_CLASSES.inverted } onClick= { addProductToCart }>Add to Cart</Button>
        </div>
    );
};

export default ProductCard;