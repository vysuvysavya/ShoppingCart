import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon from react-icons
import { AiFillDelete } from "react-icons/ai"; // Import delete icon from react-icons
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap"; // Import components from react-bootstrap for UI elements
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom for routing
import { CartState } from "../context/Context"; // Import CartState to access global state
import "./styles.css"; // Import custom styles

const Header = () => {
  // Destructure cart and dispatch functions from CartState
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}> {/* Set up a dark navbar */}
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link> {/* Link to the home page */}
        </Navbar.Brand>

        {/* Render search bar if the current path is not 'cart' */}
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }} // Set the width of the search bar
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                // Dispatch action to filter products based on search input
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}

        <Nav>
          <Dropdown alignRight> {/* Dropdown for shopping cart */}
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" /> {/* Shopping cart icon */}
              <Badge>{cart.length}</Badge> {/* Display number of items in cart */}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}> {/* Dropdown menu for cart items */}
              {cart.length > 0 ? ( // Check if there are items in the cart
                <>
                  {cart.map((prod) => ( // Map through cart items to display each product
                    <span className="cartitem" key={prod.id}>
                      <div className="cartItemDetail">
                        <span>{prod.name}</span> {/* Display product name */}
                        <span>₹ {prod.price.split(".")[0]}</span> {/* Display product price (removing decimal) */}
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }} // Pointer cursor for delete icon
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART", // Dispatch action to remove item from cart
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart {/* Button to navigate to the cart page */}
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span> // Message when cart is empty
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
