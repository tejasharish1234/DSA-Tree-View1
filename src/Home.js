import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/EM"); 
  };
  const handleNavigate1 = () => {
    navigate("/TT"); 
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>DSA Tree View</h1>
      <p style={styles.paragraph}>
        We are focusing on 2 important topics in DSA which form the basis of a lot of advanced data structures.
      </p>
      <div style={styles.boxContainer}>
        <div style={styles.box}>
          <h3 style={styles.boxHeading}>Expression Manipulation</h3>
          <p style={styles.boxParagraph}>
            A string entered in infix notation will be converted to prefix and postfix notation. 
          </p>
          <button style={styles.button} onClick={handleNavigate}>
            Go to EM
          </button>
        </div>
        <div style={styles.box}>
          <h3 style={styles.boxHeading}>Tree Traversal</h3>
          <p style={styles.boxParagraph}>
            This allows you to enter an expression and will walk you step by step through the different ways of tree traversal.
          </p>
          <button style={styles.button} onClick={handleNavigate1}>
            Go to TT
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0d0d32",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "1rem",
    marginBottom: "30px",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
  },
  box: {
    border: "1px solid white",
    borderRadius: "5px",
    padding: "20px",
    width: "400px",
    textAlign: "center",
  },
  boxHeading: {
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  boxParagraph: {
    fontSize: "0.9rem",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#2e2cb2",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default HomePage;
