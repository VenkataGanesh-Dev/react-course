import axios from "axios"; // axios = cleaner way to make requests to the backend
import { Header } from "../components/Header";
import { products } from "../../starting-code/data/products";
import "./HomePage.css";

export function HomePage() {
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

  // This is   axios.get    also do the same as  this --- fetch("http://localhost:3000/api/products"),,but except the data from the backend will be saved directly inside the response (response.data)

  axios.get("http://localhost:3000/api/products").then((response) => {
    console.log(response.data);
  });
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
      <Header />

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
