import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function DeliveryOptions({ deliveryOptions ,cartItem, loadCart }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {
                deliveryOptions.map((option) => {

                    let priceString = option.priceCents === 0 ? 'FREE Shipping' : `$${formatMoney(option.priceCents)} - Shipping`;
                    const updateDeliveryOption = async () => {
                         await axios.put(`/api/cart-items/${cartItem.productId}`, {
                            deliveryOptionId: option.id
                        });
                        await loadCart();
                    }

                    return (
                        <div key={option.id} className="delivery-option" onClick={updateDeliveryOption}>
                            <input type="radio" 
                                checked={cartItem.deliveryOptionId === option.id}
                                onChange={() => {}} //onChange is required for controlled radio input, but the actual update happens in the onClick of the parent div to make the whole div clickable
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`} />
                            <div>
                                <div className="delivery-option-date">
                                    {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                </div>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}