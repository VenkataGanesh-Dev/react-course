import { formatMoney } from "../../utils/money";
export function ProductsGrid({ products }) {
  return (
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
              {/*Code	Meaning
                          formatMoney	Function reference
                          formatMoney()	Calls the function
                          formatMoney(product.priceCents)	Calls the function and passes the price
                          {formatMoney(product.priceCents)}	Calls the function inside JSX and displays its returned value*/}
              {formatMoney(product.priceCents)}
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
  );
}
