import { Header } from '../components/Header'
import { Link, useParams } from 'react-router';
import './tracking.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';


export function Tracking({ cart }) {
  const { orderId, productId } = useParams();
  const [tOrder, setTOrder] = useState(null);

  useEffect(() => {
    async function fetchTrackingOrder() {
      try {
        const response = await axios.get(`/api/orders/${orderId}?expand=products`);
        setTOrder(response.data);
      } catch (error) {
        console.error('Error fetching tracking info:', error);
      }
    }

    fetchTrackingOrder();
  }, [orderId]);

  if (!tOrder) { return null; }

  const orderProduct = tOrder.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - tOrder.orderTimeMs;
  const timePassedMs =    dayjs().valueOf() - tOrder.orderTimeMs;
  const deliveryProgressPercent = totalDeliveryTimeMs > 0 ? (timePassedMs / totalDeliveryTimeMs) * 100 : 100;
//console.log(deliveryProgressPercent, timePassedMs, totalDeliveryTimeMs,orderProduct.estimatedDeliveryTimeMs ,tOrder.orderTimeMs);

  return (
    <div>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D, YYYY')}
          </div>
          <div className="product-info">
            {orderProduct.product.name}
          </div>
          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>
        </div>
        <img className="product-image" src={orderProduct.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${deliveryProgressPercent<50 ? 'current-status' : ''}`}>
            Preparing
          </div>
          <div className={`progress-label ${deliveryProgressPercent>49 && deliveryProgressPercent<99 ? 'current-status' : ''} `}>
            Shipped
          </div>
          <div className={`progress-label ${deliveryProgressPercent>99 ? 'current-status' : ''}`}>
            Delivered
          </div>
        </div>

  
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${deliveryProgressPercent}%` }}>


          </div>
        </div>
      </div>
    </div>    
  )
}