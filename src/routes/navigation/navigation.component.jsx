import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firbase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.components';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
    // const { currentUser } = useContext(UserContext);
    const currentUser  = useSelector(selectCurrentUser);
    // const { isCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);
    
    return (
        <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
  
            {currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to='/auth'>SIGN IN</NavLink>
            )}
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;