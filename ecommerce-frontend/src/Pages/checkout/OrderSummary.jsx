import { CartItemDetails } from './CartItemDetails';
import { DeliveryOptions } from './DeliveryOptions';
import dayjs from 'dayjs';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {

  return (
    <div className="order-summary">
      {
        deliveryOptions.length > 0 && cart.map((cartItem) => {

          const selectedDeliveryOption = deliveryOptions
            .find((deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            });

          return (

            <div className="cart-item-container">
              <div className="delivery-date">
                Delivery date: {selectedDeliveryOption ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : 'Not selected'}
              </div>

              <div className="cart-item-details-grid">

                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
              </div>
            </div>
          );
        }
        )
      }
    </div>
  );
}