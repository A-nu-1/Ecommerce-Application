import './orders.css'
import { Header } from '../../Components/Header';
import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { useEffect, useState, Fragment } from 'react';


export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      });
  }, []);



  return (
    <div>
      <title>Orders</title>
      <Header cart={cart} />


      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">

          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {
                  order.products.map((oproduct) => {

                    const addToCart = async () => {
                      await axios.post("/api/cart-items", {
                        productId: oproduct.product.id,
                        quantity: 1
                      });
                      await loadCart();
                    }

                    return (
                      <Fragment key={oproduct.product.id}>
                        <div className="product-image-container">
                          <img src={oproduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {oproduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(oproduct.estimatedDeliveryTimeMs).format('MMMM D')}
                          </div>
                          <div className="product-quantity">
                            Quantity: {oproduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img className="buy-again-icon" src="images/icons/buy-again.png" />
                            <span className="buy-again-message" onClick={addToCart}>Add to Cart</span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href={`/tracking/${order.id}/${oproduct.product.id}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}




                </div>
              </div>
            );
          })}


        </div>
      </div>
    </div>
  )
}