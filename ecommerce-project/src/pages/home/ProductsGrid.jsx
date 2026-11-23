import { Product } from "./Product";
export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {/*products is a array and we are using the .map (.map takes each value in an array and tranforms it  ) array methods  to loop through an array ,And (product) in the brackets is just a variable name */}

      {/* So basically takes each product object and transforms it into this HTML (HTML means an product-container)*/}

      {/* We can only put the hooks intop level component not in the component ,, to solve the problem we ca separate each product into its own component */}
      {products.map((product) => {
        // when we loop through an array we need too giva an key prop
        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
