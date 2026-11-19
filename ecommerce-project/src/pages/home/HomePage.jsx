import axios from "axios"; // axios = cleaner way to make requests to the backend
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

// prop --> { cart }
export function HomePage({ cart }) {
  // How to we use loop down here(means in map loop down in this ) to generate the HTMl, to do that, we need to sabvethe products data inside the state

  // use State gives us an array with 2 values. The 1st value is name of the data AND 2nd value of useState is the updater function, the updater function lets update the value and regenerate the HTMl,, we usally name the updater function set and name of the data (setProducts)   AND b/w these brackets we're going to put the starting value of the products ,, this is a empty array [] at starting  in useState([])
  // NOW after We get the products from the BACKEND, We are going to save it into the state() ,,, so only thing to note is that the name of the data from the useState (--proudcts--) has to match the name down here  means   -- {products.map --   in return section
  const [products, setProducts] = useState([]);

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

  // Async Await = lets us write the asynchronous code like normal code (OR) code runs line by line
  // IN react we have a problem with using async  wait and useEffect  As a review async infront of a function,this function now return a promise. That's because this function has som asynchronous code inside or code that takes time to finsih(   .get("/api/products")   ) that why it has to return a promise ,,,
  // NOTE:   --- PROBLEM: problem is the inner function in useEffect should not return a promise. it should only return nothing or a cleanup function  . A cleanup function is useful if we want to do some cleanup when the component is removed. so because this inner function is returning a promise,,, IT'S sort of breaking the rules of useEffect. SOLUTION: --- To solve this WE usally create a new function inside a useEffect
  // SOLUTION: --- When we are using   async await   inside useEffect,,, WE need to create a new function and then run the function-- NOW because we are inside an async function, can use await and , it will not mess up useEffect (---useEffect(async () => {   this is wrong we have a problem---)
  useEffect(() => {
    const fetchHomeData = async () => {
      // We set the server proxy configutarion in vite.config that why we remove the  http://localhost:3000
      const response = await axios.get("/api/products");
      // using the updater function , This will means --setProducts(response.data); -- save the products data into here means -- products from the use state ,, after   USING this means -- products -- from the use state and the its is going to use this means -- products from use state -- TO generate the HTML in the products.map     ,,, so now we are using the data from the backend to generate the HTML. and we dont need too import the products dummy file
      setProducts(response.data);
    };
      // It gets the same data as before it uses async  await. so remember when we are using async await inside useEffect, we need to crete a new function and then run the function ,,, Otherwise it will break the RULES OF useEffect ,,, SO lets go back and  WE will use use async and await in the app component ,where we get the cart. 
    fetchHomeData();
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
      <Header cart={cart} />
      <div className="home-page">
        {/* So we need to give it the products as prop
        Part	                  ---  Meaning
        ProductsGrid            ---	Name of the child component
        products (left side)    ---	Prop name
        {products} (right side) ---	JavaScript variable containing your products arra
        
        Left products = Prop name.
        Right {products} = Parent's variable.
        together( Left products   &    Right {products}) = Passing data from parent to child using props.
        
        */}

        {/* 
         ---  Parent – HomePage.jsx  ---


        Passing data from Parent to Child using Props.

        products = Prop name.
        {products} = Parent's JavaScript variable.

        We are sending the products data to ProductsGrid.
        <ProductsGrid products={products} />
      */}

        {/*
        ---  Child – ProductsGrid.jsx  ---


        export function ProductsGrid({ products }) {


          { products } receives the products prop from the parent.

          Props are used to pass data from Parent to Child.
          products contains the data sent by HomePage.


          console.log(products);
        */}

        {/* // Parent = Sends data
            // Child = Receives data
            // Props = Pass data from Parent to Child */}

        <ProductsGrid products={products} />
      </div>
    </>
  );
}
