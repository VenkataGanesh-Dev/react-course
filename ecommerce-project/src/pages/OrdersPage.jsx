{
  /*  So, now we're going to generate this HTML using data from the back end.
  step 1:  import axios from "axios";
  step 2:  import { useState, useEffect } from "react";
  step 3: In component return section we have to generate the HTML by using EX: loop through the elements 
  map()  AND we need a key prop  ---(for main container like order container key={order.id}               <div key={order.id} className="order-container">)---  when we looping through an array
  Other steps: (AND need to import the dayjs  and formatMoney also )

   */
}
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react";
import { Header } from "../components/Header";
import { formatMoney } from "../utils/money";
import "./OrdersPage.css";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Query parameters : • expand-products (optional): include full product details
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>

      {/*  NOw header needs the cart in order to display the quantity ,,, So we need to share the cart with the orders page*/}
      {/*  Now we are going to pass the { cart } from the above  --  export function OrdersPage({ cart }) and now we are going to pass this cart into header{
      
      Remember:
      The reason we pass cart to OrdersPage is that OrdersPage renders Header, and Header needs cart data to display the cart quantity.
      This is called prop passing (passing data from a parent component to a child component).*/}

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                {/*  Inside this element order details grid.  This displays the list of products in the order and we are going to generate  this --  <div className="order-details-grid"> using  React as well    */}
                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.product.id}>
                        {/* We are going to loop through array each element ((( EX:using map()    )))   that ,We return should have a key property and we can"t add props to fragments ;like this <></> , To solve this we need to sove this  we need to use the full fragment syntax by import the fragment component  */}
                        {/* So three of these elements represents one product
                        because, we dont have an element that contains all of
                        these,because we are using grid here, bit it works in a
                        similar way.*/}
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>
                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D",
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
