import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {

    const { cartItems, total } = useContext(CartContext);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>

                <div className='header-block'>
                    <span>Product</span>
                </div>

                <div className='header-block'>
                    <span>Desc</span>
                </div>

                <div className='header-block'>
                    <span>Qty</span>
                </div>

                <div className='header-block'>
                    <span>Price</span>
                </div>

                <div className='header-block'>
                    <span>Remove</span>
                </div>

            </div>
                {
                    cartItems.map((cartItem) => {
                        return (
                            <CheckoutItem key={ cartItem.id } cartItem={ cartItem }/>
                        );
                    })
                }
                <span className='total'>Total : ${ total }</span>
        </div>
    )
};

export default Checkout;