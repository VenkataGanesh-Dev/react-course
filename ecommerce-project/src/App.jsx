import axios from "axios";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/Checkoutpage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { Tracking } from "./pages/tracking";
import "./App.css";

{
  /*

  NOTE:

  when we send a request to the backend, we can set a URL path. Based on the url path, the backend can do  different things 
  EX: /api/products = gives us he product
      /api/cart-items = gives us cart

      In the additional to the url path, 

      Every request has a type: like GET, POST, PUT, DELETE

      

      TYPE is also called a HTTP method, whe working with the backend, when working with thw backend there are 4 TYPES of requests that we use. like 1.GET -  get data
                                          2.POST - create data
                                          3.PUT - update data
                                          4.DELETE - delete data

      Axios have a method for each type: 
      
      axios.get('/api/cart-items') = Sets the type to GET 
      
      axios.post('/api/cart-items') = Sets the type to POST

      axios.put('/api/cart-items') = Sets the type to PUT 
      
      axios.delete('/api/cart-items') = Sets the type to DELETE  

      AND IN BETWEEN THE BRACKETS  ( ) WE OUT THE URL PATH
       
      


      
      EX:  axios.get('/api/cart-items') = This acutually sends the type - GET  And  the URL path -  /api/cart-items to the backend

      ---> If the backend recives get it will   get('/api/cart-items')   the cart items and return it

      It send the 2 pieces of information to the backend 
                 1. type 
                 2. URl path


      Every request has a type:
    
      EX:  axios.post('api/cart-items') = This acutually sends the type - post  And  the URL path -  api/cart-items to the backend


      when the backend recives the request , it looks the BOTH the type and URL path to decide what to do

       ---> If the backend recives get it will   post('api/cart-items')  it will create a new cart item

      

    
*/
}

function App() {
  //  WHY we are  --- Lifting the state --- Up We just need  to load he cart for the entire website once AND  We are going to share this cart between the two pages using the techinque -- Lifting the state Up-- means We move the cart state up to an outer component. in this case outer component is the app component , from here we can share the component b/w the HomePage and CheckOutPage and we also need the code that loads the cart
  const [cart, setCart] = useState([]);

  // THE way this works in the backend is running on the http localhost:3000 and after this we add the URL path, Each URL path gives us different  data. for EX:   /api/cart-items = cart data ,,, so URL path can be actually anything we want. whoever create thebackend what the URl paths will be
  // A common name convention is to start  the url path with slash   /api   API = Application Programming Interface
  //   Starting with   /api = these url paths are for the interacting with the backend
  //   Whenever we make a request to the backend  is going to take some time to get the response. so we need to wait for this code to finish using .then

  // Now this function is outside of useEffect,So we can share this function with our components usng a prop
  const loadCart = async () => {
    // At the app component where we load the cart and at the end of this url  -->  ?expand=product - this is called a query parameter. A query parameter lets us add additinal information to our request , when backend recives query parameter, its gonna add the product details to the cart ,its going to expand the cart with product details
    // Re-render = React runs the component function again.
    //DOM update = React applies the necessary changes to the actual page.

    // THis is code that reloads the cart from the backend and it updates the state, After  update the page we add a add a product to the cart we just need to rerun this code and it will update the page

    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);

  return (
    // <Routes> = tells React all the pages that are in our website
    <Routes>
      {/* <Route> = To Adds a page to our website , We give a 2 props   ; 1) is url path of this page  : URL path is last part of the URL   (/ means , if the URL path ends with slash or empty ,it"s going to display) 2) The 2nd prop is Which element or component to display    */}

      {/*We just tell React ,Which pages we want in our website and then what to display for each page
      NOw We have multiple pages in our website and all the pages use one HTML file (/) is shared in our pages and this reduces the code repetition,,, 
      BY the way this is single page application(SPA) = We only have one html file and We use reactto create multiple pages */}
      {/* Shortcut: Here we are using the index and path="/"  are same and We can use selfclosing if nothing is inside a shortcut :  <Route /> */}
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />

      {/*<Route path="/" element={<HomePage />}></Route>*/}
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} setCart={setCart} loadCart={loadCart} />}
      />
      {/*  NOw header needs the cart in order to display the quantity ,,, So we need to share the cart with the orders page*/}
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;

{
  /*
  # useEffect + async/await + Axios – Step-by-Step Execution Flow

  CODE:
  
  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };

    fetchAppData();
  }, []);


  STEP 1: useEffect()
  -------------------
  - React runs the effect after the component renders.
  - The code inside the callback starts executing.


  STEP 2: Define the async function
  ---------------------------------
  const fetchAppData = async () => {

  - Creates a function named fetchAppData.
  - async allows us to use await inside this function.
  - The function is only defined here; it does not execute yet.


  STEP 3: Call the function
  -------------------------
  fetchAppData();

  - Calls the fetchAppData function.
  - Now the function starts executing.


  STEP 4: Send the API request
  ----------------------------
  const response = await axios.get("/api/cart-items?expand=product");

  - axios.get() sends a GET request to the backend.
  - await waits for the Promise to settle.
  - After a successful response, the complete Axios response
    object is stored in the response variable.


  STEP 5: Access the actual data
  ------------------------------
  response.data

  - response = Complete Axios response object.
  - response.data = Actual data returned by the backend.


  STEP 6: Update React state
  --------------------------
  setCart(response.data);

  - Passes the actual data to setCart().
  - Updates the cart state.
  - React schedules a re-render with the updated cart data.


  STEP 7: Function finishes
  -------------------------
  };

  - Closes the fetchAppData function.


  STEP 8: Dependency array
  ------------------------
  }, []);

  - Empty dependency array means the effect runs after
    the initial render.
  - React Strict Mode can run an extra effect setup
    in development.


  COMPLETE EXECUTION FLOW – REMEMBER THIS ORDER
  ----------------------------------------------

  1. Component renders
          ↓
  2. useEffect() runs
          ↓
  3. Define fetchAppData()
          ↓
  4. Call fetchAppData()
          ↓
  5. axios.get() sends API request
          ↓
  6. await waits for API response
          ↓
  7. Store complete response in response variable
          ↓
  8. response.data accesses actual cart data
          ↓
  9. setCart(response.data) updates cart state
          ↓
  10. React re-renders with updated cart data


  IMPORTANT JAVASCRIPT CONCEPTS
  -----------------------------

  useEffect()   = Runs side effects after rendering.
  async         = Declares an asynchronous function.
  await         = Waits for a Promise to settle.
  axios.get()   = Sends a GET API request.
  response      = Complete Axios response object.
  response.data = Actual response data.
  setCart()     = Updates React state.
  []            = Empty dependency array.


  IMPORTANT NOTE
  --------------

  Defining a function is different from calling a function.

  Function definition:
  const fetchAppData = async () => {
    // Function code
  };

  Function call:
  fetchAppData();

  The API request starts when the function is called
  and execution reaches axios.get().
*/
}
