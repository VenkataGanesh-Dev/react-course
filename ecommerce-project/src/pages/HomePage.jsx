import axios from "axios"; // axios = cleaner way to make requests to the backend
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import "./HomePage.css";

export function HomePage() {
  // How to we use loop down here(means in map loop down in this ) to generate the HTMl, to do that, we need to sabvethe products data inside the state

  // use State gives us an array with 2 values. The 1st value is name of the data AND 2nd value of useState is the updater function, the updater function lets update the value and regenerate the HTMl,, we usally name the updater function set and name of the data (SetProducts)   AND b/w these brackets we're going to put the starting value of the products ,, this is a empty array [] at starting  in useState([])
  // NOW after We get the products from the BACKEND, We are going to save it into the state() ,,, so only thing to note is that the name of the data from the useState (--proudcts--) has to match the name down here  means   -- {products.map --   in return section
  const [products, SetProducts] = useState([]);

  const [cart, setCart] = useState([]);

  // This is --- HOW we fetch data or get data from the backend --- , We use the build in function fecth()

  // To fetch data  OR  To get the data from the backend is to use the function fetch() --  fecth() is a bulit in function. It's is provided by javascript
  // We are going to create a string and we are going to put the URL that we want to get the data from this URL --  localhost:3000/api/products
  // AND We cannot save the data like this in VARIABLE like this -- EX:  const products = fetch('http://localhost:3000/api/products');   and thats because when we contact a backend,it takes time for this code to reach the backend  and to get a response.
  // We call this Asynchronous code = code that does not finishes right away
  // fetch() returns a Promise
  // Promise = Lets us wait for asynchronous code to finish ,, a promise has a method called .then()

  // So that's a review of how a promise Works or code works :  fetch("http://localhost:3000/api/products") -- This code contacts the backend to get some data ,but it takes some time for the backend to respond,, so code is gonna keep going line by line ( return () -- Ecommerce-project return   code lines ),,, THEN at some point in the future, THis is going to finish(  fetch("http://localhost:3000/api/products")   ), We going to get response from the backend, When it finishes in th future, it will run the function inside .then(),,  after fetch gesta response from the BACKEND it will save it as a parameter in this inner function( inner function means .then( response ))  called response
  //   Request:  BY the way When we contact the backend using fetch() this is called a Request.
  //   Response: When the backend responds with some data this is called a response. So this parameter contains the  response from the backend
  // It finishes at future
  // THis backend is actually running on our own computer --  localhost:3000  our own computer ,,,

  //                                                 -->   localhost:5137(Frontend)
  // We are actually contacting the own computer                                      |
  //                                                 -->   localhost:3000(Backend)

  // This is   axios.get    also do the same as  this --- fetch("http://localhost:3000/api/products"),,but except the data from the backend will be saved directly inside the response (response.data) ,,,Now lets use the backend to generate the HTML instead of using the products file that we had before.  ,, BUT we have a problem -- This code is directly inside the homepage component. that means whenever the home page changes or rerenders,it will run this code again and send another request to BACKEND , howevere we just need to load the products once on this page. WE dont ned to load the products over and over again , to make this code run once , we can put inside a useEffect

  /*
QUICK COMPARISON – useEffect()

QUICK SHORTCUT COMPARISON:

Syntax                          When does it run?

useEffect(() => {}, [])         After initial mount(When component is created)
useEffect(() => {}, [count])    After mount and when count changes.
useEffect(() => {})             After every render.
                               

1. EMPTY DEPENDENCY ARRAY []

useEffect(() => {}, []);

Meaning:
- Runs after the component is created (initial mount).
- Runs after React displays the component on the screen.
- Does not run again when the component normally re-renders.

Example:
Fetching products from the backend when the page first loads.


2. DEPENDENCY ARRAY WITH A VARIABLE [count]

useEffect(() => {}, [count]);

Meaning:
- Runs after the component is created (initial mount).
- Runs again whenever the count value changes.
- If count does not change, the effect does not run again
  just because of a normal re-render.

Example:
Performing an action whenever the count value changes.


3. WITHOUT DEPENDENCY ARRAY

useEffect(() => {});

Meaning:
- Runs after the component is created (initial mount).
- Runs again after every re-render of the component.
- It does not matter whether a particular state value changes
  or not. Every render triggers the effect.

Example:
Running an action after every component render.

IMPORTANT:
- [] = Runs after initial mount only.
- [count] = Runs after initial mount and when count changes.
- No array = Runs after every render.

NOTE:
In React Strict Mode, effects may run an extra time
during development.
*/

  // useEffect = Lets us control when some code runs , BY default, useeffect runs this code every time the component is created or  updated ,,, BUT We can can control this. At the end of this function , we are going to add a comma  AND  Empty array(is a dependency array) = lets us control when useEffect runs ,lets control when useEffect runs.      []  = only run once after the component is created. AND that's exactly what we need here.

  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((response) => {
      SetProducts(response.data); // useing the updater function , This will means --SetProducts(response.data); -- save the products data into here means -- products from the use state ,, after   USING this means -- products -- from the use state and the its is going to use this means -- products from use state -- TO generate the HTML in the products.map     ,,, so now we are using the data from the backend to generate the HTML. and we dont need too import the products dummy file
    });

    // THE way this works in the backend is running on the http localhost:3000 and after this we add the URL path, Each URL path gives us different  data. for EX:   /api/cart-items = cart data ,,, so URL path can be actually anything we want. whoever create thebackend what the URl paths will be
    // A common name convention is to start  the url path with slash   /api   API = Application Programming Interface
    //   Starting with   /api = these url paths are for the interacting with the backend
    //   Whenever we make a request to the backend  is going to take some time to get the response. so we need to wait for this code to finish using .then
    axios.get("http://localhost:3000/api/cart-items").then((response) => {
      setCart(response);
    });
  }, []);
  // NOTE:  IN the console that useEffect runs twice instead of once. so this is totally normal and it uis caused by using strict mode in our app . strict mode runs useEffect twice to help us catch bugs and it only does this during development.

  //--> To get the products data , This response object has a method called .json = .json gives us the data attached to the response ,,, in this case it gives us the product data
  // --> response.json(); is also asynchronous, WE cannot save this in a variable  EX: const products = response.json() ,,,instead this is also a promise , so we have to use   .then() again
  {
    /*.then() is a Promise method.
        It runs when the previous Promise is fulfilled.
        response is the parameter that receives the server's response.
        response.json() reads the response body and parses JSON into JavaScript data.
        return passes the parsed data to the next .then().
        */
  }
  {
    /*   return response.json();
    })
    .then((data) => {
      console.log(data);
    });
    */
  }
  //data is the parameter that receives the parsed JavaScript data.
  //console.log(data) displays the data in the browser console.
  //  NOTE: The backend can also run on the same computer as the frontend or website
  return (
    // We can only return 1 element from a Component

    // We can only return 1 element from a Componentttt

    // Added React useState examples
    <>
      <title>Ecommerce Project</title>
      {/*We are rendering the Header component */}

      {/*Remember that the cart Quantity is inside the header. So we need to
      pass the cart into header using a prop AND then inside the header we are going to get the cartfrom the props  -- this in in header of the header file -- export function Header( cart ) shortcut
       export function Header(props) {  -- this is fill form for above -- 
       const cart = props.cart*/}
      <Header cart= {cart}/>
      <div className="home-page">
        <div className="products-grid">
          {/*products is a array and we are using the .map (.map takes each value in an array and tranforms it  ) array methods  to loop through an array ,And (product) in the brackets is just a variable name */}

          {/* So basically takes each product object and transforms it into this HTML (HTML means an product-container)*/}
          {products.map((product) => {
            return (
              // When we loop through an array like this, We need to give each element a key prop, key = key helps react keep track of changes in the array
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    // Each rating has an image We have to multipy by 10 to get the image name
                    // We use the templete string to insert the values --   `/images/ratings/rating-${product.rating.stars * 10}.png`  (` `) They allow us to insert JavaScript values inside a string.  string written inside backticks. ${ }   This is called interpolation. It inserts a JavaScript expression into a template literal.
                    src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>
                {/* We usally save money i cents , Because many programmmings languages have Trouble calculating decimal numbers , NOW we have to display into dollars to convert back to dollars we are going to divide by 100 EX: 1 dollars = 100 cents*/}
                {/*NOTE:  $(product.priceCents / 100) --- This converts no into an string 
                .toFixed(2)  --- we are tel1ing (2) decimals to show (how many decimals to show) */}
                <div className="product-price">
                  ${(product.priceCents / 100).toFixed(2)}
                </div>

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src="/images/icons/checkmark.png" />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
