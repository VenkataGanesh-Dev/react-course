import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
export function DeliveryOptions({ deliveryOptions, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {/*
                                          Remember:                
                                          deliveryOptions = Entire array.
                                          deliveryOption = One object from that array.
                                          deliveryOption.priceCents = Price of that current object.
                                        */}

      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          // 1. priceString = We are assigning a new value to the priceString variable
          priceString = `${formatMoney(deliveryOption.priceCents)} - shipping`;
        }
        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              // Each cart item has a  deliveryOptionId: "1"
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              // Each set of selectors should belong to one product  in this we have to set the product id for each one
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM, D",
                )}
              </div>
              <div className="delivery-option-price">
                {/* 
                                                  Why {priceString}?
                
                                                  1. {} tells JSX that you want to use a JavaScript expression.
                                                  2. priceString is your JavaScript variable.
                                                  3. React displays the variable's value on the screen.
                                                */}
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
