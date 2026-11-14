import axios from "axios";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage.JSX";
import { CheckoutPage } from "./pages/Checkoutpage";
import { OrdersPage } from "./pages/OrdersPage";
import { Tracking } from "./pages/tracking";

import "./App.css";

function App() {
  //  WHY we are  --- Lifting the state --- Up We just need  to load he cart for the entire website once AND  We are going to share this cart between the two pages using the techinque -- Lifting the state Up-- means We move the cart state up to an outer component. in this case outer component is the app component , from here we can share the component b/w the HomePage and CheckOutPage and we also need the code that loads the cart
  const [cart, setCart] = useState([]);

  // THE way this works in the backend is running on the http localhost:3000 and after this we add the URL path, Each URL path gives us different  data. for EX:   /api/cart-items = cart data ,,, so URL path can be actually anything we want. whoever create thebackend what the URl paths will be
  // A common name convention is to start  the url path with slash   /api   API = Application Programming Interface
  //   Starting with   /api = these url paths are for the interacting with the backend
  //   Whenever we make a request to the backend  is going to take some time to get the response. so we need to wait for this code to finish using .then
  useEffect(() => {
    // At the app component where we load the cart and at the end of this url  -->  ?expand=product - this is called a query parameter. A query parameter lets us add additinal information to our request , when backend recives query parameter, its gonna add the product details to the cart ,its going to expand the cart with product details
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);

  return (
    // <Routes> = tells React all the pages that are in our website
    <Routes>
      {/* <Route> = To Adds a page to our website , We give a 2 props   ; 1) is url path of this page  : URL path is last part of the URL   (/ means , if the URL path ends with slash or empty ,it"s going to display) 2) The 2nd prop is Which element or component to display    */}

      {/*We just tell React ,Which pages we want in our website and then what to display for each page
      NOw We have multiple pages in our website and all the pages use one HTML file (/) is shared in our pages and this reduces the code repetition,,, 
      BY the way this is single page application(SPA) = We only have one html file and We use reactto create multiple pages */}
      {/* Shortcut: Here we are using the index and path="/"  are same and We can use selfclosing if nothing is inside a shortcut :  <Route /> */}
      <Route index element={<HomePage cart={cart} />} />

      {/*<Route path="/" element={<HomePage />}></Route>*/}
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      {/*  NOw header needs the cart in order to display the quantity ,,, So we need to share the cart with the orders page*/}
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;
