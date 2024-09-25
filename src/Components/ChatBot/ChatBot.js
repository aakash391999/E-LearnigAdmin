// src/components/ChatBot.js
import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa"; // Send button icon
import ReactMarkdown from "react-markdown"; // Import markdown renderer
import "./ChatBot.module.css"; // Custom styles

const { GoogleGenerativeAI } = require("@google/generative-ai");

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setChat([...chat, userMessage]);
    setInput("");

    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAXmIgk-vryf_SaZ4JxDvZrloz98hW9QRQ"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(input);

      setChat((prevChat) => [
        ...prevChat,
        { sender: "ai", text: result.response.text() },
      ]);
    } catch (error) {
      setChat((prevChat) => [
        ...prevChat,
        { sender: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const chatWindow = document.querySelector(".chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [chat]);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="p-3 shadow-sm" style={{ height: "80vh" }}>
            <h2 className="text-center mb-4">AI Chatbot</h2>
            <div
              className="chat-window mb-4"
              style={{
                height: "65vh",
                overflowY: "auto",
                backgroundColor: "#f0f0f0",
                padding: "10px",
              }}
            >
              {chat.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex align-items-start mb-3 ${
                    message.sender === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    className={`chat-bubble p-3 rounded-pill ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-light"
                    }`}
                    style={{
                      maxWidth: "70%",
                      wordWrap: "break-word",
                    }}
                  >
                    {message.sender === "user" ? (
                      <>
                        <FaUser className="me-2" />
                        <strong>You:</strong> {message.text}
                      </>
                    ) : (
                      <>
                        <FaRobot className="me-2" />
                        <strong>AI:</strong>
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </>
                    )}
                  </div>
                  <div
                    className="time-stamp"
                    style={{ fontSize: "0.8rem", marginTop: "5px" }}
                  >
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="typing-indicator">
                  <FaRobot className="me-2" />
                  AI is typing...
                </div>
              )}
            </div>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="rounded-pill"
                />
                <button type="submit" class="btn btn-outline-secondary">
                  <FaPaperPlane />
                </button>
              </InputGroup>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;
