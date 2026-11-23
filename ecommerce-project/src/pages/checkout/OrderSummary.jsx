import { DeliveryOptions } from "./DeliveryOptions";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">
      {/* if the cart is empty, We di=ont need to select a delivery option
      IT works like a if ,else if  deliveryOptions > 0     is TRUE it runs the rest of the code  
      */}
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          //   (deliveryOption) is the inner function it recives each delivery... The way that .find works is it's is going to loop through each deliveryOptions and the first function  --   (deliveryOption) => {},  that returns TRUE is going to be the result
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            // When we loop through an array, each elememt needs a key property.
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>

                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>

                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
