
import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useState } from 'react';


export function CartItemDetails({ cartItem, loadCart }) {

    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updateCartItem = async () => {
        if (isUpdating) {
            setIsUpdating(false);
            await axios.put(`/api/cart-items/${cartItem.productId}`, { quantity: parseInt(quantity) });
            await loadCart();
        } else {
            setIsUpdating(true);
        }
    }

    const updateQty = (event) => {
        setQuantity(event.target.value);
    }

    const handleQuantityKeyDown = (event) => {
        const keyPressed = event.key;
        if (keyPressed === 'Enter') {
            updateCartItem();
        }else if (keyPressed === 'Escape') {
            setIsUpdating(false);
            setQuantity(cartItem.quantity);
        }
    }
    
    return (
        <>
         <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
            <div className="product-name">
                {cartItem.product.name}
            </div>
            <div className="product-price">
                {formatMoney(cartItem.product.priceCents)}
            </div>
            <div className="product-quantity">
                <span>                    
                    Quantity: { isUpdating
             
              ? <input type="text" className="quantity-textbox"
                  value={quantity} onChange={updateQty}
                  onKeyDown={handleQuantityKeyDown}
                />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
                    
                    
              </span>
                <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                    Update
                </span>
                <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                    Delete
                </span>
            </div>
        </div >
                </>
    );

}