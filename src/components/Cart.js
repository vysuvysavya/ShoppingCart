import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context"; // Importing CartState to access cart and dispatch
import Rating from "./Rating";

const Cart = () => {
  // Destructuring the cart state and dispatch function from the context
  const {
    state: { cart },
    dispatch,
  } = CartState();

  // State to hold the total price of items in the cart
  const [total, setTotal] = useState();

  // useEffect to calculate the total price whenever the cart changes
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]); // Dependency array: runs the effect when `cart` changes

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {/* Iterating over the cart items to display each product */}
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <span>{prod.name}</span> {/* Display product name */}
                </Col>
                <Col md={2}>₹ {prod.price}</Col> {/* Display product price */}
                <Col md={2}>
                  <Rating rating={prod.ratings} /> {/* Display product rating */}
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty} // Setting the quantity select box to the current quantity
                    onChange={(e) =>
                      // Dispatching action to change cart quantity
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value, // New quantity from the select input
                        },
                      })
                    }
                  >
                    {/* Generating options for quantity based on stock */}
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option> // Option values from 1 to inStock
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      // Dispatching action to remove the product from the cart
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod, // Product to remove
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" /> {/* Delete icon */}
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span> {/* Displaying total amount */}
      </div>
    </div>
  );
};

export default Cart;
