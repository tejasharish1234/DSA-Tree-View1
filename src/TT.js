import React from "react";
import "./App.css"; // Reusing the CSS file created earlier
import { useNavigate } from "react-router-dom";

const TreeTraversal = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/BST");
  };
  return (
    <div className="container">
      <h1 className="title">Tree Traversal</h1>
      <p className="paragraph">
      A Binary Tree Data Structure is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child. It is commonly used in computer science for efficient storage and retrieval of data, with various operations such as insertion, deletion, and traversal. Tree Traversal techniques include various ways to visit all the nodes of the tree. Unlike linear data structures (Array, Linked List, Queues, Stacks, etc) which have only one logical way to traverse them, trees can be traversed in different ways.
      </p>
      <div className="box-container">
        {/* Box 1 */}
        <div className="box">
          <h3 className="box-heading">Tree Traversal</h3>
          <p className="box-paragraph">
            
          </p>
          <button className="button" onClick={handleNavigate}>
            Go to Page
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TreeTraversal;
