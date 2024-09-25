import React, { useState } from "react";
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

// Sample lesson data
const lessonsList = [
  {
    _id: "101",
    title: "Introduction to React",
    description: "This lesson covers the basics of React and JSX.",
  },
  {
    _id: "102",
    title: "Components and Props",
    description: "Learn how to create components and pass data through props.",
  },
  {
    _id: "103",
    title: "State and Lifecycle",
    description: "Understand state management and lifecycle methods in React.",
  },
  {
    _id: "104",
    title: "Handling Events",
    description:
      "Learn how to handle events in React, such as clicks and form submissions.",
  },
  {
    _id: "105",
    title: "Conditional Rendering",
    description: "Understand how to render components conditionally in React.",
  },
  {
    _id: "106",
    title: "Lists and Keys",
    description:
      "Learn how to render lists and use keys for optimal performance.",
  },
  {
    _id: "107",
    title: "Forms in React",
    description: "Understand how to manage forms and handle form submissions.",
  },
  {
    _id: "108",
    title: "Lifting State Up",
    description:
      "Learn how to share state between components using lifting state up.",
  },
  {
    _id: "109",
    title: "Composition vs Inheritance",
    description:
      "Understand the differences between composition and inheritance in React.",
  },
  {
    _id: "110",
    title: "React Router",
    description:
      "Learn how to manage routing and navigation in your React applications.",
  },
  {
    _id: "111",
    title: "Hooks Introduction",
    description:
      "Get started with Hooks and understand their benefits in React.",
  },
  {
    _id: "112",
    title: "useState Hook",
    description: "Learn how to use the useState hook for state management.",
  },
  {
    _id: "113",
    title: "useEffect Hook",
    description:
      "Understand the useEffect hook for side effects in functional components.",
  },
  {
    _id: "114",
    title: "Custom Hooks",
    description:
      "Learn how to create and use custom hooks in your applications.",
  },
  {
    _id: "115",
    title: "Context API",
    description: "Understand how to manage global state using the Context API.",
  },
  {
    _id: "116",
    title: "React Performance Optimization",
    description:
      "Learn techniques for optimizing the performance of React applications.",
  },
  {
    _id: "117",
    title: "Testing React Applications",
    description:
      "Get an introduction to testing React components using tools like Jest and React Testing Library.",
  },
  {
    _id: "118",
    title: "Deploying React Applications",
    description:
      "Learn how to deploy your React applications using services like Netlify or Vercel.",
  },
  {
    _id: "119",
    title: "Integrating with APIs",
    description:
      "Understand how to fetch data from APIs and handle responses in React.",
  },
  {
    _id: "120",
    title: "Advanced Patterns in React",
    description:
      "Explore advanced patterns such as render props and higher-order components.",
  },
];

const Lessions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState(lessonsList);

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
    setLessons(lessons.filter((lesson) => lesson._id !== selectedLesson._id));
    setShowDeleteModal(false);
  };

  const handleEditSave = () => {
    const updatedLessons = lessons.map((lesson) =>
      lesson._id === selectedLesson._id
        ? { ...lesson, title: editTitle, description: editDescription }
        : lesson
    );
    setLessons(updatedLessons);
    setShowEditModal(false);
  };

  const handleAddSave = () => {
    const newLesson = {
      _id: (lessons.length + 1).toString(), // Generating a simple ID
      title: newTitle,
      description: newDescription,
    };
    setLessons([...lessons, newLesson]);
    setShowAddModal(false);
    setNewTitle("");
    setNewDescription(""); // Clear inputs after adding
  };

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
        {lessons.map((lesson) => (
          <Col md={6} lg={4} className="mb-4" key={lesson._id}>
            <Card className="lesson-card shadow-sm h-100">
              <Card.Body>
                <Card.Title>
                  <FaBook className="me-2 text-primary" />
                  {lesson.title}
                </Card.Title>
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
        ))}
      </Row>

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
