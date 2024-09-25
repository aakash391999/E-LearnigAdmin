import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa"; // Use icons for courses
import { BsFillTrashFill } from "react-icons/bs"; // Trash icon for delete
import { deleteCourse, getAllCourses } from "../services/services";

const CoursesList = () => {
  const [data, setdata] = useState([]);
  const getCouces = async () => {
    try {
      const res = await getAllCourses();
      setdata(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCouces();
  }, []);

  const deleteCorseByid = (id) => {
    deleteCourse(id)
      .then((res) => {
        console.log(res);
        getCouces();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Manage Courses</h1>
      <div className="text-right mb-4">
        <Link to="/add-course" className="btn btn-primary">
          Add New Course
        </Link>
      </div>
      <Row>
        {data.map((course, index) => (
          <Col
            key={course.id}
            md={4}
            className="mb-4 animate__animated animate__fadeInUp"
          >
            <Card className="shadow-sm h-100 course-card">
              <Card.Img
                variant="top"
                src={
                  !!course.image
                    ? `http://localhost:3000/${course.image}`
                    : `https://picsum.photos/id/${index + 2}/5000/3333`
                }
                alt="Course Image"
                className="course-img"
              />
              <Card.Body>
                <Card.Title className="text-primary">{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Link
                    to={`/dashboard/editCourse/${course._id}`}
                    className="btn btn-outline-secondary"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                  <Button
                    onClick={() => deleteCorseByid(course._id)}
                    variant="danger"
                  >
                    <BsFillTrashFill /> Delete
                  </Button>
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
