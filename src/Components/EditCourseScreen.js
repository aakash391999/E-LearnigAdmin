import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { FaBook, FaFileAlt, FaImage, FaSave } from "react-icons/fa";
import axios from "axios";
import { addNewCourse, getAllCourses, updateCourse } from "../services/services";

const EditCourse = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();



  
  useEffect(() => {
    const fetchCourseDetails = async () => {

        try {
          const query=`/${id}`
          const response = await getAllCourses(query); 

        const course = response; // Assuming the API returns the course object
        setTitle(course.title);
        setDescription(course.description);
        setInstructor(course.instructor); // Assuming the course object has an instructor field
        setPrice(course.price); // Assuming the course object has a price field
        setImagePreview(`http://localhost:3000/${course.image}`); // Assuming course.image contains the image URL
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instructor", instructor);
    formData.append("price", price);
    formData.append("id", id);



    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await updateCourse(formData,id);
      console.log("Course Added:", response);
      navigate("/");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4 animate__animated animate__fadeIn">
        <h1 className="text-center mb-4">Edit Course</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Course Title */}
            <Col md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label>
                  <FaBook className="mr-2 text-primary" /> Course Title
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>

            {/* Course Description */}
            <Col md={6}>
              <Form.Group controlId="formDescription">
                <Form.Label>
                  <FaFileAlt className="mr-2 text-primary" /> Course Description
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>

       

          {/* Instructor Name */}
          <Form.Group controlId="formInstructor" className="mt-3">
            <Form.Label>
              <FaFileAlt className="mr-2 text-primary" /> Instructor
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter instructor's name"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="shadow-sm"
            />
          </Form.Group>

          {/* Course Price */}
          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>
              <FaFileAlt className="mr-2 text-primary" /> Price
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow-sm"
            />
          </Form.Group>

          {/* Course Image Upload */}
          <Form.Group controlId="formImage" className="mt-3">
            <Form.Label>
              <FaImage className="mr-2 text-primary" /> Course Image
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow-sm"
            />
          </Form.Group>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-3 text-center">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                className="rounded"
              />
            </div>
          )}

          {/* Update Button */}
          <div className="text-center mt-4">
            <Button variant="primary" type="submit" className="px-5 shadow-lg">
              <FaSave className="mr-2" /> Update Course
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditCourse;
