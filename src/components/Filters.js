import { Button, Form } from "react-bootstrap"; // Import Button and Form components from react-bootstrap for UI elements
import { CartState } from "../context/Context"; // Import CartState to access global state
import Rating from "./Rating"; // Import Rating component for displaying product ratings

const Filters = () => {
  // Destructure productDispatch and productState from CartState
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = CartState();

  // Functionality to manage rating state could be added here if needed

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      
      {/* Radio button for sorting products in ascending order */}
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1" // Group name for radio buttons
          type="radio"
          id={`inline-1`} // Unique ID for the input
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE", // Dispatch action to sort products by price
              payload: "lowToHigh", // Payload indicates sorting order
            })
          }
          checked={sort === "lowToHigh" ? true : false} // Checked if current sort is lowToHigh
        />
      </span>

      {/* Radio button for sorting products in descending order */}
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE", // Dispatch action to sort products by price
              payload: "highToLow", // Payload indicates sorting order
            })
          }
          checked={sort === "highToLow" ? true : false} // Checked if current sort is highToLow
        />
      </span>

      {/* Checkbox for filtering products by stock availability */}
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK", // Dispatch action to toggle stock filter
            })
          }
          checked={byStock} // Checked if stock filter is applied
        />
      </span>

      {/* Checkbox for filtering products that are available for fast delivery */}
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY", // Dispatch action to toggle delivery filter
            })
          }
          checked={byFastDelivery} // Checked if fast delivery filter is applied
        />
      </span>

      {/* Section for filtering by product rating */}
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating} // Current rating value to display
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING", // Dispatch action to filter products by rating
              payload: i + 1, // Payload indicates the selected rating
            })
          }
          style={{ cursor: "pointer" }} // Pointer cursor for clickable rating
        />
      </span>

      {/* Button to clear all filters */}
      <Button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS", // Dispatch action to reset all filters
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
