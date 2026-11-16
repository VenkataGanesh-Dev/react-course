import { formatMoney } from "../../utils/money";
export function PaymentSummary({ paymentSummary }) {
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

          <button className="place-order-button button-primary">
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
