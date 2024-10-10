import { CartState } from "../context/Context"; // Import CartState to access global state
import Filters from "./Filters"; // Import Filters component for filtering products
import SingleProduct from "./SingleProduct"; // Import SingleProduct component for displaying individual products

const Home = () => {
  // Destructure products and product filters from CartState
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  // Function to transform products based on the filters applied
  const transformProducts = () => {
    let sortedProducts = products; // Start with the original list of products

    // Sort products based on the selected sorting option
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    // Filter out products that are not in stock if byStock is false
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    // Filter for fast delivery products if byFastDelivery is true
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    // Filter products based on ratings
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    // Filter products based on search query
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts; // Return the transformed list of products
  };

  return (
    <div className="home">
      <Filters /> {/* Render Filters component */}
      <div className="productContainer">
        {/* Map through transformed products and render SingleProduct for each */}
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
