import './checkout-header.css'
import logo_full from '../../assets/alogo.svg';
import logo_small from '../../assets/alogo_s.svg';

export function CheckoutHeader({ cart }) {
    return (
         <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src={logo_full} />
              <img className="mobile-logo" src={logo_small} />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="/">{cart.length} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    );
}