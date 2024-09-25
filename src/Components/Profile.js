import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserEdit, FaKey, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state?.auth?.userData);

  return (
    <Container fluid className="mt-4">
      {/* Profile Header */}
      <Row className="justify-content-center mb-4 animate__animated animate__fadeInLeft">
        <Col md={8}>
          <Card className="text-center shadow-sm p-4">
            <Card.Img
              variant="top"
              src="https://plus.unsplash.com/premium_photo-1669879825881-6d4e4bde67d5?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Avatar"
              className="rounded-circle mx-auto mb-3"
              style={{ width: "150px", height: "150px" }}
            />
            <Card.Body>
              <Card.Title className="display-4">
                {userData?.user?.name}
              </Card.Title>
              <Card.Text className="text-muted">
                {userData?.user?.email}
              </Card.Text>
              <Button variant="primary" className="me-2 rounded-pill">
                <FaUserEdit /> Edit Profile
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
                  <strong>Full Name:</strong> {userData?.user?.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {userData?.user?.email}
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
