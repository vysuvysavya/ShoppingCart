import { createContext, useContext, useReducer } from "react"; // Import necessary hooks and functions
import faker from "faker"; // Import faker for generating mock data
import { cartReducer, productReducer } from "./Reducers"; // Import reducer functions for cart and product state

const Cart = createContext(); // Create a new context for the cart
faker.seed(99); // Seed faker for consistent random data generation

const Context = ({ children }) => {
  // Generate mock product data using faker
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(), // Unique product ID
    name: faker.commerce.productName(), // Random product name
    price: faker.commerce.price(), // Random product price
    image: faker.random.image(), // Random product image URL
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]), // Random stock quantity (0 means out of stock)
    fastDelivery: faker.datatype.boolean(), // Randomly assign if the product is available for fast delivery
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]), // Random rating between 1 and 5
  }));

  // Set up the cart reducer with initial state
  const [state, dispatch] = useReducer(cartReducer, {
    products: products, // Initial product list
    cart: [], // Initial empty cart
  });

  // Set up the product filter reducer with initial state
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false, // Filter by stock availability
    byFastDelivery: false, // Filter by fast delivery option
    byRating: 0, // Filter by minimum rating
    searchQuery: "", // Search query for filtering products
  });

  console.log(productState); // Log product state for debugging

  // Provide the state and dispatch functions to the rest of the app
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

// Custom hook to use the Cart context
export const CartState = () => {
  return useContext(Cart); // Return the current context value
};

export default Context;
