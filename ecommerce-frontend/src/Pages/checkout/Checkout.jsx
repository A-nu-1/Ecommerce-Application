import './checkout.css'
import './checkout-header.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './CheckoutHeader';


export function Checkout({ cart, loadCart }) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const loadPaymentSummary = async () => {
    const response = await axios.get('/api/payment-summary');
    setPaymentSummary(response.data);
  }
  const loadDeliveryOptions = async () => {
    const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
    setDeliveryOptions(response.data);
  }

  useEffect(() => {
    loadPaymentSummary();
    loadDeliveryOptions();
  }, [cart]);
    

  return (
    <div>
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </div>
  )
}