import './header.css'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
//import logo-white from 'images/logo-white.png';"images/mobile-logo-white.png"  <img className="search-icon" src="images/icons/search-icon.png" />
import logo_full from '../assets/alogo.svg';
import logo_small from '../assets/alogo_s.svg';


export function Header({ cart }) {
    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    const [searchParams] = useSearchParams();

    // I need to use a different variable name since "search"
    // is already being used below.
    const searchText = searchParams.get('search');

    // || '' is a shortcut. It means if searchText does not exist
    // it will use a default value of ''.
    const [searchString, setSearchString] = useState(searchText || '');

    const navigate = useNavigate();
    const updateSearchString = (e) => {
        setSearchString(e.target.value);
    }
    const searchProducts = () => {
        // console.log('Searching for:', searchString);
        navigate(`/?search=${searchString}`);
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={logo_full} />
                    <img className="mobile-logo"
                        src={logo_small} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search"
                    value={searchString} onChange={updateSearchString} 
                    onKeyDown={(e) => e.key === 'Enter' && searchProducts()} />

                <button className="search-button" onClick={searchProducts}>
                  <span className="arrow" ><strong>&#x2192;</strong></span> 
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}