// import React, { useEffect, useState, useRef } from "react";
// import { Card, Container, Row, Col, Button } from "react-bootstrap";
// import { FaArrowLeft, FaBook } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
// import { useNavigate, useParams } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const LessonDetails = () => {
//   const [data, setData] = useState(""); // State to store API response
//   const { name } = useParams(); // Getting lesson name from URL params
//   const navigate = useNavigate();
//   const hasFetchedData = useRef(false); // Ref to track if data is already fetched

//   const handleSubmit = async () => {
//     try {
//       const genAI = new GoogleGenerativeAI(
//         "AIzaSyAXmIgk-vryf_SaZ4JxDvZrloz98hW9QRQ"
//       );
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//       const result = await model.generateContent(
//         `${name} in depth. please don't skip any single concept`
//       );
//       const text = result.response.text(); // Get the response text
//       setData(text); // Set state with the resolved text
//       console.log(text, "texttexttexttexttexttext");
//     } catch (error) {
//       console.error("Error fetching content:", error); // Log errors
//     }
//   };

//   useEffect(() => {
//     // Prevent multiple API calls by checking if it's already fetched
//     if (!hasFetchedData.current) {
//       handleSubmit();
//       hasFetchedData.current = true; // Set the flag to true after fetching
//     }
//   }, [name]); // Trigger on name change

//   return (
//     <Container className="mt-4">
//       <Row className="mb-4">
//         <Col>
//           <Button variant="outline-primary" onClick={() => navigate(-1)}>
//             <FaArrowLeft className="me-2" /> Back to Lessons List
//           </Button>
//         </Col>
//       </Row>

//       <Card className="lesson-details-card shadow-sm">
//         <Card.Body>
//           <Card.Title>
//             <FaBook className="me-2 text-primary" />
//             {name}
//           </Card.Title>
//           <Card.Text>
//             <strong>Description: </strong>
//             {name}
//           </Card.Text>
//           <hr />
//           <Card.Text>{<ReactMarkdown>{data}</ReactMarkdown>}</Card.Text>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default LessonDetails;

import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft, FaBook } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Dark theme for highlighting
import { getLesionsById, updateLesission } from "../../services/services";

const LessonDetails = () => {
  const [data, setData] = useState([]); // State to store API response
  const { id } = useParams(); // Getting lesson name from URL params
  const navigate = useNavigate();
  const hasFetchedData = useRef(false); // Ref to track if data is already fetched

  const handleSubmit = async () => {
    const query = `${id}`;
    const res = await getLesionsById(query);
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAXmIgk-vryf_SaZ4JxDvZrloz98hW9QRQ"
      ); // Replace with your actual key
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(
        `${res?.description} in depth. please don't skip any single concept`
      );
      const text = result.response.text(); 
      const apiData = {
        content: text,
      };
      updateLesission(id,apiData)
        .then(async (res) => {
          const updatedData = await getLesionsById(id);
          
          setData(updatedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching content:", error); // Log errors
    }
  };




  const getLesionsFromDataBase = async () => {
    try {
      const res = await getLesionsById(id);
      if (res.content.length > 0) {
        setData(res);
      } else if (!hasFetchedData.current) {
        handleSubmit();
        hasFetchedData.current = true;
      }
    } catch (err) {
      if (!hasFetchedData.current) {
        handleSubmit();
        hasFetchedData.current = true;
      }
    }
  };



  useEffect(() => {
    getLesionsFromDataBase()
  }, [id]); // Trigger on name change

  // Custom renderer for code blocks and inline code
  const renderers = {
    code({ inline, className, children }) {
      const codeContent = String(children).trim(); // Trim white spaces
      // For code blocks (not inline), check if length is greater than 10 characters
      if (!inline && codeContent.length > 10) {
        const match = /language-(\w+)/.exec(className || ""); // Detect language if specified
        return (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match ? match[1] : null} // Use detected language or fallback to plain
            PreTag="div"
          >
            {codeContent}
          </SyntaxHighlighter>
        );
      }
      // For inline code or short code blocks, return unstyled
      return <code>{children}</code>;
    },
  };

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
            {data?.title}
          </Card.Title>
          <Card.Text>
            <strong>Description: </strong>
            {data?.description}
          </Card.Text>
          <hr />
          <Card.Text>
            <ReactMarkdown
              children={data?.content} // Render markdown content
              remarkPlugins={[remarkGfm]} // Enable GitHub-flavored markdown
              components={renderers} // Apply custom rendering for code blocks
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonDetails;
