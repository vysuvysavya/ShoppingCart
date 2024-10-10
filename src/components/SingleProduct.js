import { Card, Button } from "react-bootstrap"; // Import Card and Button components from react-bootstrap
import { CartState } from "../context/Context"; // Import CartState to access global state
import Rating from "./Rating"; // Import Rating component to display product ratings

const SingleProduct = ({ prod }) => {
  // Destructure cart and dispatch functions from CartState
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card> {/* Render product details within a Card component */}
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title> {/* Display product name */}
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price.split(".")[0]}</span> {/* Display product price (without decimal) */}
            {prod.fastDelivery ? (
              <div>Fast Delivery</div> // Indicate fast delivery option
            ) : (
              <div>4 days delivery</div> // Indicate standard delivery time
            )}
            <Rating rating={prod.ratings} /> {/* Render Rating component for product ratings */}
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? ( // Check if product is already in cart
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART", // Dispatch action to remove product from cart
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART", // Dispatch action to add product to cart
                  payload: prod,
                })
              }
              disabled={!prod.inStock} // Disable button if product is out of stock
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"} {/* Button text based on stock availability */}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
