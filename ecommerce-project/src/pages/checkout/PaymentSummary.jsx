import axios from "axios";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";
import React from "react";
export function PaymentSummary({ paymentSummary, loadCart }) {
  // UseNavigate gives us a function and this function lets us navigate to or go to another page in our app, So after we create an order and we reload the cart, Lets navigate to the orders page using navigate('/orders')
  const navigate = useNavigate();

  const createOrder = async () => {
    // POSt creates a new order from current cart items
    // cart is already saved in the backend, So backend can take the cart and create an order for us. Lets wait for he code to finish usinga  await. After we create an order, the backend will remove everything from our cart. So we need to reload our cart
    await axios.post("/api/orders");
    await loadCart(); // It is used to reload the cart and update the page. finally after we create an order, lets also redirect to the orders page so we can see our new order. To do that react router provides a hook that lest us nagivate to another page or go to an other page called

    // navigate is not asynchronous , It finishes immediately ,we dont need to await this code

    {
      /*
      NOTE: once we are on the orders page te below code load the orders page from the backend and tat updates the page
      
      
    useEffect(() => {
      axios.get("/api/orders?expand=products")
       .then((response) => {
        setOrders(response.data);
      });
      }, []);
      */
    }
    navigate("/orders");
  };
  return (
    <div className="payment-summary">
      {/*payment summary using data from the backend.*/}

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
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
