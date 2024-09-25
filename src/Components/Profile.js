import React from "react";
import { Container, Row, Col, Card, Button, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserEdit, FaKey, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  return (
    <Container fluid className="mt-4">
      {/* Profile Header */}
      <Row className="justify-content-center mb-4 animate__animated animate__fadeInLeft">
        <Col md={8}>
          <Card className="text-center shadow-sm p-4">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="rounded-circle mx-auto mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            <Card.Body>
              <Card.Title className="display-4">John Doe</Card.Title>
              <Card.Text className="text-muted">john.doe@example.com</Card.Text>
              <Button variant="primary" className="me-2 rounded-pill">
                <FaUserEdit /> Edit Profile
              </Button>
              <Button variant="danger" className="rounded-pill">
                <FaSignOutAlt /> Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Personal Information */}
      <Row className="mb-4 animate__animated animate__fadeInUp">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5>Personal Information</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Full Name:</strong> John Doe
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> john.doe@example.com
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone:</strong> (123) 456-7890
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Address:</strong> 123 Main Street, New York, NY
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Account Settings */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5>Account Settings</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Username:</strong> johndoe123
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Account Type:</strong> Premium
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Joined:</strong> January 15, 2022
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Last Login:</strong> September 8, 2024
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Security Settings */}
      <Row className="mb-4 animate__animated animate__fadeInUp">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5>Security Settings</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <Button variant="warning" className="me-2 rounded-pill">
                <FaKey /> Change Password
              </Button>
              <Button variant="outline-danger" className="rounded-pill">
                Deactivate Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
