import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
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

        const updateDeliveryOption = async () => {
          // this  /api/cart-items/:productld updates the delivery option for a product
          // • productId : This is a URL parameter ID of the product to update
          // When we want to update something we usually put the id of what we want to update the url. so here first we are going to change this to a template string using back ticks . we insert the productId that we want to update. So the product id saved inside cartitem

          // We want to tell the backend which delivery option we want to update. to do that we are going to give the backend some data we add the , and {}
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            // We can send the delivery option ID that we want to update to and after update we reload the cart and update the page
            deliveryOptionId: deliveryOption.id,
          });
          // loadCart()	Call the function this reload the cart and update the page and we dont have to refresh to see the updates
          // await loadCart()	Call and wait for its Promise to finish

          await loadCart();
        };

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDeliveryOption()}
          >
            <input
              // Each cart item has a  deliveryOptionId: "1"
              type="radio"
              // If we have checked prop, We should have an onchange prop, onChange lets change the value of the input , but in this sistuation we already have onClick in above
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {
                // This will just the warning to away
              }}
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
