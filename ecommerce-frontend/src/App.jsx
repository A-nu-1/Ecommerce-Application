import './App.css'
import HomePage from './Pages/Home/HomePage'
import { Checkout } from './Pages/checkout/Checkout'
import { Routes, Route } from 'react-router'
import { OrdersPage } from './Pages/orders/OrdersPage'
import { Tracking } from './Pages/Tracking'
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
  const [cartItems, setCartItems] = useState([]);

  const loadCartItems =async () => {
    const response = await axios.get('/api/cart-items?expand=product')  //query param to expand the product details for each cart item
    setCartItems(response.data);
  }

  useEffect(() => {
    loadCartItems();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cartItems} loadCart={loadCartItems} />} />
        <Route path="checkout" element={<Checkout cart={cartItems} loadCart={loadCartItems} />} />
        <Route path="orders" element={<OrdersPage cart={cartItems} loadCart={loadCartItems} />} />
        <Route path="tracking/:orderId/:productId" element={<Tracking cart={cartItems} />} />
      </Routes>
    </>
  )
}

export default App
