import { Link } from "react-router";
import "./header.css";
// <Link> = go to another page without reloading
//  componets folder = The componets folder is for shared components and
//  pages folder = The components that are specific to a page

// ({ cart }) This is called object destructuring of props.
// { cart } → Receives the cart property from the parent's props object.
// One-line interview answer: The parent component passes data through props, and the child component receives that data through its props parameter.
export function Header({ cart }) {
  let totalQuantity = 0;
  //Then loop through the cart .forEach()
  // The inner function (means (cartItem)=> { }) will get one parameter which is each item in the cart and each cart item has a quantity ,So we are going to add to this totalQuantity variable
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
    //totalQuantity = totalQuantity + cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="/images/logo-white.png" />
          {/* Vite serves images from the public folder using /images/ */}
          <img className="mobile-logo" src="/images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="/images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="/images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
