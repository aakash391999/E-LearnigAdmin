import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft, FaBook } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

const LessonDetails = () => {
  const [data, setData] = useState(""); // State to store API response
  const { name } = useParams(); // Getting lesson name from URL params
  const navigate = useNavigate();
  const hasFetchedData = useRef(false); // Ref to track if data is already fetched

  const handleSubmit = async () => {
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAXmIgk-vryf_SaZ4JxDvZrloz98hW9QRQ"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(
        `${name} in depth. please don't skip any single concept`
      );
      const text = result.response.text(); // Get the response text
      setData(text); // Set state with the resolved text
      console.log(text, "texttexttexttexttexttext");
    } catch (error) {
      console.error("Error fetching content:", error); // Log errors
    }
  };

  useEffect(() => {
    // Prevent multiple API calls by checking if it's already fetched
    if (!hasFetchedData.current) {
      handleSubmit();
      hasFetchedData.current = true; // Set the flag to true after fetching
    }
  }, [name]); // Trigger on name change

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-primary" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-2" /> Back to Lessons List
          </Button>
        </Col>
      </Row>

      <Card className="lesson-details-card shadow-sm">
        <Card.Body>
          <Card.Title>
            <FaBook className="me-2 text-primary" />
            {name}
          </Card.Title>
          <Card.Text>
            <strong>Description: </strong>
            {name}
          </Card.Text>
          <hr />
          <Card.Text>{<ReactMarkdown>{data}</ReactMarkdown>}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonDetails;
