import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);

  // We usally save event handlers in a separate function
  const addToCart = async () => {
    // axios.post('/api/cart-items') --  This will create a cart item instead of getting cart items

    // We need to tell the backend which product to add to the cart. to do that we can give axios.post another value (Which is an Object)
    // when we use post , we can also send information to the backend using an object and this is called the request body
    //NOTE:
    //Now the backend needs to know two thinsg inorder to add a product to the cart
    //1st -- it needs to know the product id that we want to add
    //2nd -- quantity we need to add

    //This below code send a request to the backend telling it to add this product to the cart with a quantity of one

    // axios.post('/api/cart-items') -- This contacts the backend. so this is asynchronous code. it does not finish code right away. that measn we need to wait  for this code to finish before going on the next line    loadCart();   To wait for this to finsih we add await and remember in order to use await we need to be inside async() this code is not inside useEffect we can use async directly  ,,, after that loadCart() is also asynchronous so it is a good idea await this code as well to be consistent
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity, //shorthand property syntax --- it does the save as below
      //quantity: quantity, // This is the quantity that is saved in the state above. so now lets save
    });
    // After update the cart in the backend ,we are going to call the function loadCart() . So means we ae upating the cart in the backend and then will we get the new cart and update the page without needing a refresh
    await loadCart();
  };

  const selectQuantity = (event) => {
    {
      /* To get the quantity that we selected, we can use  event.target.value
            
            Note: one thing too be careful this value is one of thi values here
            <option value="1">1</option>
            <option value="2">2</option>  ....... these values are going to be string we need to converted to be no 
            
            */
    }

    const quantitySelected = Number(event.target.value);
    // Let's save into state
    setQuantity(quantitySelected);
    //console.log(quantitySelected);
  };

  return (
    // When we loop through an array like this, We need to give each element a key prop, key = key helps react keep track of changes in the array -- we give inthe productGrid component
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

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
        {/*Code	Meaning
                          formatMoney	Function reference
                          formatMoney()	Calls the function
                          formatMoney(product.priceCents)	Calls the function and passes the price
                          {formatMoney(product.priceCents)}	Calls the function inside JSX and displays its returned value*/}
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        {/*when ever use a event handler like onClick (or) onChange this function gets a parameter called event , So event contains details about event , in this case the event will contain the quantity that we selected */}

        {/*So this is called a controlled input: 
              
              we have a value and onchange propery value={quantity}
                onChange={(event) => { 
              when we change the selector,its going to set a quantity in the state and then the new state is going to set as the value and then updates the page so we are putting the react the react in the middle of the process so we have to access to quantity that we selected*/}
        <select value={quantity} onChange={selectQuantity}>  {/* selectQuantity is stored in variable in above*/}
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
      {/*  Onclick is a event handler, when we click this button it will run this function 
              Using the backend is it wil simply our react code and we can share the data in the backend.   so we can acess the website from another computer,and we can access the updated cart using the backend
              
              .get()   --> .get() the data from the backend
              .post()  --> .post() is a different type of request It is used to the create data in the backend
                , IN this case, we are adding a product to the backend , So we are creating a new cart item, That why we use .post*/}
      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart} // addToCart is stored in variable in above
      >
        Add to Cart
      </button>
    </div>
  );
}
