import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCartPlus, FaDollarSign } from "react-icons/fa";

// Sample data

const CartScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((res) => setData(res?.carts));
  }, []);

  return (
    <Container>
      <h2 className="my-4 text-center">🛒 Cart Summary</h2>
      {data.map((cart, index) => (
        <Row key={cart.id} className="mb-4 animate__animated animate__fadeInUp">
          <Col md={12}>
            <Card className="cart-card shadow-sm rounded-lg">
              <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h4>Cart ID: {cart.id}</h4>
                <span className="badge bg-light text-primary">
                  Products: {cart.totalProducts}
                </span>
              </Card.Header>
              <Card.Body>
                <Row
                  className={`animate__animated ${
                    index % 2 ? "animate__fadeInLeft" : "animate__fadeInRight"
                  }`}
                >
                  <Col md={8}>
                    {cart.products.map((product) => (
                      <Card
                        key={product.id}
                        className="product-card mb-3 border-0 shadow-sm"
                      >
                        <Row noGutters>
                          <Col md={4}>
                            <Card.Img
                              variant="top"
                              src={product.thumbnail}
                              className="product-img rounded"
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                          </Col>
                          <Col md={8}>
                            <Card.Body>
                              <Card.Title className="font-weight-bold">
                                {product.title}
                              </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                Price:{" "}
                                <span className="text-dark">
                                  ${product.price.toFixed(2)}
                                </span>
                              </Card.Subtitle>
                              <Card.Text>
                                Quantity: {product.quantity}
                              </Card.Text>
                              <Card.Text>
                                Total: ${product.total.toFixed(2)}
                              </Card.Text>
                              <Card.Text className="text-success">
                                Discounted Total: $
                                {product.discountedTotal.toFixed(2)}
                              </Card.Text>
                              <Button
                                variant="outline-primary"
                                className="me-2 rounded-pill"
                              >
                                <FaCartPlus /> Add to Cart
                              </Button>
                              <Button
                                variant="success"
                                className="rounded-pill"
                              >
                                <FaDollarSign /> Buy Now
                              </Button>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Col>
                  <Col md={4}>
                    <Card className="summary-card bg-light border-0 shadow-sm">
                      <Card.Body>
                        <Card.Title className="font-weight-bold">
                          📝 Cart Summary
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="d-flex justify-content-between">
                            <span>Total Products:</span>{" "}
                            <strong>{cart.totalProducts}</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between">
                            <span>Total Quantity:</span>{" "}
                            <strong>{cart.totalQuantity}</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between">
                            <span>Total:</span>{" "}
                            <strong>${cart.total.toFixed(2)}</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between">
                            <span>Discounted Total:</span>{" "}
                            <strong>${cart.discountedTotal.toFixed(2)}</strong>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default CartScreen;
