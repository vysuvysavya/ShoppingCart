// Reducer function for managing the cart state
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Returns a new state object with the cart updated to include the new product
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      // Using the spread operator to create a shallow copy of the current state and add the new item

    case "REMOVE_FROM_CART":
      // Returns a new state object with the cart filtered to exclude the removed product
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id), // Removes the product by filtering
      };

    case "CHANGE_CART_QTY":
      // Returns a new state object with the updated quantity of a specific product
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload.id ? { ...c, qty: action.payload.qty } : c // Update quantity if IDs match
        ),
      };

    default:
      return state; // If no action matches, return the current state
  }
};

// Reducer function for managing product filters
export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      // Update the sorting method based on the action payload
      return { ...state, sort: action.payload };

    case "FILTER_BY_STOCK":
      // Toggle the stock filter on or off
      return { ...state, byStock: !state.byStock };

    case "FILTER_BY_DELIVERY":
      // Toggle the fast delivery filter on or off
      return { ...state, byFastDelivery: !state.byFastDelivery };

    case "FILTER_BY_RATING":
      // Update the minimum rating filter based on the action payload
      return { ...state, byRating: action.payload };

    case "FILTER_BY_SEARCH":
      // Update the search query based on the action payload
      return { ...state, searchQuery: action.payload };

    case "CLEAR_FILTERS":
      // Reset all filters to their default states
      return { byStock: false, byFastDelivery: false, byRating: 0, searchQuery: "" };

    default:
      return state; // If no action matches, return the current state
  }
};
