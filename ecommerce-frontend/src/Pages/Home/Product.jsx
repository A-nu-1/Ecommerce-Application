import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useState } from 'react';
import { Carrousel } from './Carrousel';
import {Modal} from './Modal'


export function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);
    
    const [isAddedToCart, setIsAddedToCart] = useState(false);


    const addToCart = async () => {
        await axios.post("/api/cart-items", {
            productId: product.id,
            quantity
        });
        await loadCart();    
        setIsAddedToCart(true);    
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 3000);
    }


    const selectQuantity = (e) => {
        const quantitySelected = Number(e.target.value);
        setQuantity(quantitySelected);
    }
  const [hclicked, setHClicked] = useState(false);
  const heartClicked = () => {
    if (!hclicked)
      { 
        setHClicked(true);
      }
     else
      {
         setHClicked(false);
        }

  }
  const [modal,setModal]=useState(false);


    return (
        <div className="product-container" data-testid="product-container">

    <button className="expandBtn" onClick={()=>{setModal(true)}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize2-icon lucide-maximize-2"><path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/><path d="M9 21H3v-6"/></svg></button>
    {modal && <Modal setModal={setModal} prodImage={product.image}></Modal>}

    <button className={hclicked?"heart like":"heart unlike"} onClick={heartClicked}>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

            <div className="product-image-container">
                
                    <Carrousel prodImage={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars" data-testid="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.svg`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container" >
                <select value={quantity} onChange={selectQuantity} data-testid="quantity-selector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: isAddedToCart ? 1 : 0 }}>
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary" 
            data-testid="add-to-cart-button"
            onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    );
}