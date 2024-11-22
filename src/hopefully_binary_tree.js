import React, { useState, useEffect } from "react";
import axios from "axios";

function BST() {
  const [nodes, setNodes] = useState([]); // Holds the tree nodes
  const [nextId, setNextId] = useState(1); // Tracks the next available ID
  const [inputValue, setInputValue] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
   }); // Input field value
   const [showModal, setShowModal] = useState(false);


   const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleResize = () => {
      setSvgDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch nodes from the backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/getNodes")
      .then((res) => {
        setNodes(res.data);
        setNextId(
          res.data.length > 0 ? Math.max(...res.data.map((node) => node.id)) + 1 : 1
        );
      })
      .catch((err) => console.error("Error fetching nodes:", err));
  }, []);


  function Modal({ show, onClose, onReload }) {
    if (!show) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Nodes Added</h2>
          <p>The nodes have been successfully added or deleted.</p>
          <button onClick={onReload} style={{padding:'10px'}}> 
            Reload Page
          </button>
          <label style = {{backgroundColor:'22, 20, 105',padding:'10px'}}>

          </label>
          <button onClick={onClose} style={{padding:'10px'}}>Close</button>
        </div>
      </div>
    );
  }

  //Function to delete all nodes
  const deleteAllNodes = () => {
    axios
      .delete("http://localhost:5000/deletenodes")
      .then(() => {
        console.log("All nodes deleted successfully");
        setNodes([]); // Clear the local state
        setNextId(1); // Reset the next available ID
      })
      .catch((err) => console.error("Error deleting nodes:", err));

    setShowModal(true);

  };

  // Function to update the coordinates of a node in the backend
const updateNodeCoordinates = async (nodeId, x, y) => {
  await axios
    .patch(`http://localhost:5000/updateCoordinates/${nodeId}`, {
      x: x,
      y: y,
    })
    .then(() => {
      console.log(`Node coordinates updated in the database for node ${nodeId}`);
    })
    .catch((err) => {
      console.error("Error updating node coordinates:", err);
    });

};


  // Function to add a value to the tree
  const addNode = (value) => {
    const strArray = value.split(","); // Split the string by commas
    const newValues = strArray
      .map((str) => parseInt(str.trim(), 10))
      .filter((num) => !isNaN(num)); // Only valid numbers

    if (newValues.length === 0) return; // Only proceed if the input is valid

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];
      let currentNextId = nextId;

      newValues.forEach((intValue) => {
        const newNode = { id: currentNextId++, value: intValue, left: null, right: null };

        if (updatedNodes.length === 0) {
          newNode.x = svgDimensions.width/2;
          newNode.y = 40;
          updatedNodes.push(newNode);
        } else {
          insertNode(updatedNodes, updatedNodes[0], newNode, 50, 80);
        }

        // Send the new node to the backend
        axios
          .post("http://localhost:5000/addNode", newNode)
          .then(() => {console.log("Node saved to database:", newNode)
            
          })

          .catch((err) => console.error("Error saving node:", err));
      });

      setNextId(currentNextId); // Update the next available ID
      return updatedNodes;
    });

    setInputValue("");// Clear the input field
    //window.location.reload();
    setShowModal(true);
  };

  // Function to update a node's children in the backend
  const updateChildrenInDB = (nodeId, leftChildId, rightChildId,nodeX,nodeY) => {
    axios
      .patch(`http://localhost:5000/updateChildren/${nodeId}`, {
        left: leftChildId,
        right: rightChildId,
        x: nodeX,
        y: nodeY
      })
      .then(() => console.log(`Updated children for node ${nodeId}`))
      .catch((err) => console.error("Error updating children:", err));
  };

  // Recursive function to insert a node following BST rules
  const insertNode = (nodes, parent, newNode, offsetX, offsetY) => {
    if (!parent) return;

    if (newNode.value < parent.value) {
      if (parent.left === null) {
        parent.left = newNode.id;
        newNode.x = parent.x - offsetX;
        newNode.y = parent.y + offsetY;
        console.log("Added node",newNode.value,newNode.y);
        nodes.push(newNode);

        // Update parent node's left child in the backend
        updateChildrenInDB(parent.id, newNode.id, parent.right);
      } else {
        insertNode(
          nodes,
          nodes.find((n) => n.id === parent.left),
          newNode,
          offsetX * 0.6,
          offsetY 
        );
      }
    } else {
      if (parent.right === null) {
        parent.right = newNode.id;
        newNode.x = parent.x + offsetX;
        newNode.y = parent.y + offsetY;
        nodes.push(newNode);

        // Update parent node's right child in the backend
        updateChildrenInDB(parent.id, parent.left, newNode.id,newNode.x,newNode.y);
      } else {
        insertNode(
          nodes,
          nodes.find((n) => n.id === parent.right),
          newNode,
          offsetX * 0.6,
          offsetY 
        );
      }
    }
  };

  // Render the tree recursively using SVG
  const renderTree = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    console.log("X Value is,",node.value,node.y)
    if (!node) {console.log("Wrong");return null;}

    if(node.x===undefined || node.y===undefined){
      let parentNode=nodes.find((n)=>n.id===(nodes.find((n)=>n.left===nodeId)||(nodes.find((n)=>n.right===nodeId))).id);
      if(node.value<parentNode.value){
      node.x=parentNode.x-10;
      node.y=parentNode.y+80;
    }
    else{
      node.x=parentNode.x+10;
      node.y=parentNode.y+80;

    }
      
      console.log("Potential x",parentNode.x);
    }
  
    const leftChild = nodes.find((n) => n.id === node.left);
    const rightChild = nodes.find((n) => n.id === node.right);
    console.log("Node ID",node.id);

    updateNodeCoordinates(node.id,node.x,node.y);

    return (
      <React.Fragment key={node.id}>
        {/* Node Circle */}
        <circle cx={node.x} cy={node.y+20} r={30} fill="lightblue" stroke="white" strokeWidth={2} />
        {/* Node Label */}
        <text x={node.x} y={node.y+20} textAnchor="middle" dy=".3em" fontSize="25">
          {node.value}
        </text>

        {leftChild && (
          <>
            <line
              x1={node.x}
              y1={node.y + 40}
              x2={leftChild.x}
              y2={leftChild.y }
              stroke="white"
              strokeWidth={2}
              className="link"
            />
            {renderTree(node.left)}
          </>
        )}

        {rightChild && (
          <>
            <line
              x1={node.x}
              y1={node.y + 40}
              x2={rightChild.x}
              y2={rightChild.y }
              strokeWidth={2}
              stroke="white"
              className="link"
            />
            {renderTree(node.right)}
          </>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="App">
      <h1>Binary Search Tree Visualization</h1>

      {/* Input and Button Section */}
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter numbers separated by commas"
          style={{ padding: "8px", fontSize: "16px", width: "300px", marginRight: "8px" }}
        />
        <button
          onClick={() => {addNode(inputValue);
           }}
          disabled={!inputValue}
          style={{ padding: "8px 12px", fontSize: "16px" }}
        >
          Add Node
        </button>
        <button
          onClick={deleteAllNodes}
          style={{ padding: "8px 12px", fontSize: "16px", backgroundColor: "red", color: "white" }}
        >
          Delete All Nodes
        </button>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onReload={handleReload}
      />

      {/* Tree Visualization */}
      <div className="tree-container">
      <svg
          
          width={svgDimensions.width}
          height={svgDimensions.height}
          style={{
            backgroundColor: "#0d0d32",
          }}
        >{nodes.length > 0 && renderTree(1)}</svg>
      </div>
    </div>
  );

  

}

export default BST;
