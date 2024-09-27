import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { FaBook, FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa"; // React Icons
import "./Lessions.module.css"; // Custom CSS for hover effects
import { Link, useParams } from "react-router-dom";
import { addNewLession, getAllCourses } from "../../services/services";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const { GoogleGenerativeAI } = require("@google/generative-ai");

function extractArrayFromString(input) {
  try {
    // Sanitize backticks
    const sanitizedInput = input.replace(/`/g, "");

    // Find the array in the sanitized string
    const match = sanitizedInput.match(/\[.*?\]/s);
    if (match) {
      const jsonString = match[0];
      console.log("Matched JSON string:", jsonString); // Log the matched string

      try {
        const parsedArray = JSON.parse(jsonString);
        if (Array.isArray(parsedArray)) {
          return parsedArray;
        }
      } catch (error) {
        console.error("JSON parsing error:", error.message);
        console.error("Offending JSON string:", jsonString);
      }
    }
  } catch (error) {
    console.error("Error in extractArrayFromString:", error);
  }
  return []; // Return an empty array if not found or if an error occurs
}

const Lessions = () => {
  const { id } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [courseData, setcourseData] = useState([]);

  const hasFetchedData = useRef(false); // Reference to prevent double fetch

  // State for edit modal
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // State for add modal
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddLesson = () => {
    setShowAddModal(true);
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setEditTitle(lesson.title);
    setEditDescription(lesson.description);
    setShowEditModal(true);
  };

  const handleDeleteLesson = (lesson) => {
    setSelectedLesson(lesson);
    setShowDeleteModal(true);
  };

  const confirmDeleteLesson = () => {
    setcourseData(
      courseData.filter((lesson) => lesson.id !== selectedLesson.id)
    );
    setShowDeleteModal(false);
  };

  const handleEditSave = () => {
    const updatedLessons = courseData.map((lesson) =>
      lesson.id === selectedLesson.id
        ? { ...lesson, title: editTitle, description: editDescription }
        : lesson
    );
    setcourseData(updatedLessons);
    setShowEditModal(false);
  };

  const handleAddSave = () => {
    const newLesson = {
      _id: (courseData.length + 1).toString(), // Generating a simple ID
      title: newTitle,
      description: newDescription,
    };
    setcourseData([...courseData, newLesson]);
    setShowAddModal(false);
    setNewTitle("");
    setNewDescription(""); // Clear inputs after adding
  };

  const getCourses = async () => {
    try {
      const query = `/${id}`;
      const res = await getAllCourses(query);

      const genAI = new GoogleGenerativeAI(
        "AIzaSyAXmIgk-vryf_SaZ4JxDvZrloz98hW9QRQ"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result =
        await model.generateContent(`Could you provide an array of lessons in ${res.title}, where each lesson contains a title and a description? js array perfect key value pair like   {
          "id":1
          "title": "Introduction to HTML",
          "description": "Learn the basic structure of an HTML document, including tags, elements, and attributes."
        }, please don't skip any single concept`);

      const extractedArray = extractArrayFromString(result.response.text());

      setcourseData(extractedArray);

      extractedArray.map((item) => {
        const apiData = {
          title: item.title,
          description: item.description,
          courseId: id,
        };
        addNewLession(apiData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      getCourses();
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <Container className="mt-4">
      {/* Heading and Add Button */}
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="text-center">Manage Lessons</h1>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={handleAddLesson}>
            <FaPlusCircle className="me-2" /> Add New Lesson
          </Button>
        </Col>
      </Row>

      {/* Lesson Cards */}
      <Row>
        {courseData.length > 0
          ? courseData.map((lesson, index) => (
              <Col md={6} lg={4} className="mb-4" key={lesson.id}>
                <Card className="lesson-card shadow-sm h-100">
                  <Card.Body>
                    <Link to={`/dashboard/LessonDetails/${lesson.description}`}>
                      <Card.Title>
                        <FaBook className="me-2 text-primary" />
                        {lesson.title}
                      </Card.Title>
                    </Link>
                    <Card.Text>{lesson.description}</Card.Text>
                    <div className="d-flex justify-content-between">
                      {/* Edit Button with Tooltip */}
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Edit Lesson</Tooltip>}
                      >
                        <Button
                          variant="outline-primary"
                          onClick={() => handleEditLesson(lesson)}
                        >
                          <FaEdit className="me-2" /> Edit
                        </Button>
                      </OverlayTrigger>

                      {/* Delete Button with Tooltip */}
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete Lesson</Tooltip>}
                      >
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDeleteLesson(lesson)}
                        >
                          <FaTrashAlt className="me-2" /> Delete
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : Array(6)
              .fill(0)
              .map((_, index) => (
                <Col md={6} lg={4} className="mb-4" key={index}>
                  <Card className="lesson-card shadow-sm h-100">
                    <Card.Body>
                      <Skeleton height={30} width={`60%`} className="mb-2" />
                      <Skeleton count={3} />
                      <div className="d-flex justify-content-between mt-3">
                        <Skeleton width={80} height={30} />
                        <Skeleton width={80} height={30} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
      </Row>
      {/* Modals for edit, add, and delete lesson */}
      {/* Add your modals here */}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the lesson titled:{" "}
          <strong>{selectedLesson?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteLesson}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editLessonTitle">
              <Form.Label>Lesson Title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter lesson title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editLessonDescription">
              <Form.Label>Lesson Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Enter lesson description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addLessonTitle">
              <Form.Label>Lesson Title</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter lesson title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="addLessonDescription">
              <Form.Label>Lesson Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter lesson description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddSave}>
            Add Lesson
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Lessions;
