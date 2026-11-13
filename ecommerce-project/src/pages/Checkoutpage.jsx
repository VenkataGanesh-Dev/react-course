import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { formatMoney } from "../utils/money";
import "./checkout-header.css";
import "./CheckoutPage.css";
// WE are going to use the cart to generate the HTML for the checkout page  , So first make sure to pass that we pass the cart to the checkout page using this prop--> parent  cart = {cart}  to child {cart} in this export function CheckoutPage(cart) {}
export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  // As a starting value , we are going to use null because the payment summary is going to be an object,it is easier to check if the object is not loaded if we set it to null at the start
  {
    /*
    3. Remember the difference
    Code	Initial value
    useState(null)	null
    useState([])	Empty array
    useState({})	Empty object
    useState([null])	Array containing null
    */
  }
  const [paymentSummary, setPaymentSummary] = useState(null);

  {
    /*
    Let's understand the Promise flow:
    1. axios.get() sends a GET request to the backend.
    2. Axios returns a Promise.
    3. The Promise is initially pending while the request is in progress.
    4. When the request succeeds, the Promise becomes fulfilled.
    5. .then() receives the Axios response.
    6. response.data contains the backend data.
    7. setDeliveryOptions() updates the React state.  
    
    
    .then() is a JavaScript Promise method used to handle the successful result of an asynchronous operation.
    In simple words:
    .then() tells JavaScript what to do when a Promise is fulfilled (successful).


    Think of it like this:
    - response = Full response from Axios.
    - response.data = Actual data sent by the backend.
    Interview definition: data is a property in the Axios response object that contains the response body returned by the server.
*/
  }
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    // we are going to use the use the axios to get the payment summary from the backend.
    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);

  return (
    <>
      {/* Each page have a different title, we are setting the title using the React ,it shows when we direct the page like Checkout page */}
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {/* if the cart is empty, We di=ont need to select a delivery option
             IT works like a if ,else if  deliveryOptions > 0     is TRUE it runs the rest of the code  */}
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
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs,
                      ).format("dddd, MMMM D")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>

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

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>

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
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                            >
                              <input
                                // Each cart item has a  deliveryOptionId: "1"
                                type="radio"
                                checked={
                                  deliveryOption.id ===
                                  cartItem.deliveryOptionId
                                }
                                className="delivery-option-input"
                                // Each set of selectors should belong to one product  in this we have to set the product id for each one
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs,
                                  ).format("dddd, MMMM, D")}
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
                    </div>
                  </div>
                );
              })}
          </div>
          {/*payment summary using data from the backend.*/}
          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {/*  We only want to display this , if the payment summary is loaded ,otherwise we don't have this information
             -- So tis checks if the paymentSummary object exists, if its null at the start , its not going to run the rest of the code
             */}

            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items {paymentSummary.totalItems}:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}{" "}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
