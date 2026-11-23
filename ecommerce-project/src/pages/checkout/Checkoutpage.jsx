import axios from "axios";
import { useState, useEffect } from "react";
import "./checkout-header.css";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
{
  /*NOTE:

  HOW to render the component ?

  Step 1: Import the component
  import { OrderSummary } from "./OrderSummary";


  Step 2: Render the component
  <OrderSummary
    deliveryOptions={deliveryOptions}
    cart={cart}


  Remember:
  - Create component → Export it.
  - Use component in another file → Import it.
  - Display component → Write its JSX tag.
  The import path (./ or ../) depends on where the two files are located.
  
  */
}

// WE are going to use the cart to generate the HTML for the checkout page  , So first make sure to pass that we pass the cart to the checkout page using this prop--> parent  cart = {cart}  to child {cart} in this export function CheckoutPage(cart) {}
export function CheckoutPage({ cart, loadCart }) {
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
    const fetchCheckoutData = async () => {
      // We are using let ,because we have two requests here and we might want to reuse this variable
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
      // we are going to use the use the axios to get the payment summary from the backend.
      // Async Await = Lets us write the asynchronous code like normal code
      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchCheckoutData();
    //  [] depemdency array = determines when useEffect runs, It runs only once
    // [value] = when ever value changes it will re-run useEffect
  }, [cart]); //In this case When ever cart changes it will re run the useEffect and update the payment summary

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
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
