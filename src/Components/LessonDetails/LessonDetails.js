import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft, FaBook } from "react-icons/fa";
import ReactMarkdown from "react-markdown"; // Import markdown renderer
import { useNavigate, useParams } from "react-router-dom";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const LessonDetails = () => {
  const [data, setdata] = useState("");
  const { name } = useParams();

  const handleSubmit = async (e) => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAXmIgk-vryf_SaZ4JxDvZrloz98hW9QRQ"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //
    const result = await model.generateContent(name);
    console.log(result.response.text());
    setdata(result.response.text());
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  const navigate = useNavigate();
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
