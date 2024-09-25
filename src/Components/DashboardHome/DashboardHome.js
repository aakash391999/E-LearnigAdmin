import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBookOpen, FaUsers, FaStar, FaClipboardList } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./DashboardHome.css"; // Optional external CSS for additional styling
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const userData = useSelector((state) => state?.auth?.userData);

  return (
    <Container fluid className="mt-4">
      <Row className="mb-4 animate__animated animate__fadeInDown">
        <Col>
          <Card className="bg-light text-dark text-center p-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="fw-bold">
                Welcome Back, {userData?.user?.name}!
              </Card.Title>
              <Card.Text>
                Here’s an overview of your courses and students!
              </Card.Text>
              <Button variant="primary" className="rounded-pill shadow-sm">
                View Course Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4 animate__animated animate__fadeInLeft">
        {[
          {
            title: "Total Courses",
            value: "15",
            icon: <FaBookOpen size={40} className="mb-2 text-primary" />,
          },
          {
            title: "Active Students",
            value: "340",
            icon: <FaUsers size={40} className="mb-2 text-success" />,
          },
          {
            title: "Course Ratings",
            value: "4.5 / 5",
            icon: <FaStar size={40} className="mb-2 text-warning" />,
          },
          {
            title: "Completed Lessons",
            value: "2,450",
            icon: <FaClipboardList size={40} className="mb-2 text-danger" />,
          },
        ].map((card, index) => (
          <Col md={3} key={index}>
            <Card className="text-center shadow-sm border-0 rounded">
              <Card.Body>
                {card.icon}
                <Card.Title className="fw-bold">{card.title}</Card.Title>
                <Card.Text className="display-4 fw-bold">
                  {card.value}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4 animate__animated animate__fadeInRight">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h5>Recent Activities</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                {[
                  {
                    user: "Instructor John",
                    action: "published course 'React Basics'",
                    time: "2 hours ago",
                  },
                  {
                    user: "Instructor Mary",
                    action: "updated lesson in 'JavaScript Essentials'",
                    time: "5 hours ago",
                  },
                  {
                    user: "Student Sarah",
                    action: "completed quiz for 'HTML Fundamentals'",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <li className="mb-3" key={index}>
                    <strong>{activity.user}</strong> {activity.action}{" "}
                    <span className="text-muted">{activity.time}</span>
                  </li>
                ))}
                <li>
                  <Link
                    to="/dashboard/ChatBot"

                  >
                    <Button variant="outline-primary" className="rounded-pill">
                      View All Activities
                    </Button>
                  </Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h5>Quick Actions</h5>
            </Card.Header>
            <Card.Body className="text-center">
              {[
                { variant: "primary", label: "Add New Course" },
                { variant: "success", label: "View Student Reports" },
                { variant: "warning", label: "Manage Course Content" },
                { variant: "danger", label: "Send Notifications" },
              ].map((action, index) => (
                <Button
                  variant={action.variant}
                  className="m-2 rounded-pill shadow-sm"
                  key={index}
                >
                  {action.label}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardHome;
