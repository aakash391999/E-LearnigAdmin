import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa"; // Added Plus icon for Add Course
import { BsFillTrashFill } from "react-icons/bs";
import { deleteCourse, getAllCourses } from "../../services/services";
import "./CoursesList.module.css"; // Import custom styles

const CoursesList = () => {
  const [data, setData] = useState([]);

  const getCourses = async () => {
    try {
      const res = await getAllCourses();
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const deleteCourseById = (id) => {
    deleteCourse(id)
      .then((res) => {
        console.log(res);
        getCourses();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center text-primary heading-title">
        Manage Courses
      </h1>

      <div className="text-center mb-4">
        <Link
          to="/dashboard/addCourse"
          className="btn btn-success shadow-sm add-course-btn"
        >
          <FaPlus className="me-2" /> Add New Course
        </Link>
      </div>

      <Row>
        {data.map((course, index) => (
          <Col key={course._id} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm h-100 course-card">
              <Card.Img
                onClick={() => navigate(`/dashboard/Lessions/${course._id}`)}
                variant="top"
                src={
                  course.image
                    ? `http://localhost:3000/${course.image}`
                    : `https://picsum.photos/id/${index + 2}/5000/3333`
                }
                alt={course.title}
                className="course-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-primary course-title">
                  {course.title}
                </Card.Title>
                <Card.Text className="course-description text-muted mb-4">
                  {course.description}
                </Card.Text>

                <div className="mt-auto">
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/dashboard/editCourse/${course._id}`}
                      className="btn btn-outline-primary edit-btn"
                    >
                      <FaEdit className="me-2" /> Edit
                    </Link>

                    <Button
                      onClick={() => deleteCourseById(course._id)}
                      variant="danger"
                      className="delete-btn"
                    >
                      <BsFillTrashFill className="me-2" /> Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CoursesList;
