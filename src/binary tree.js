import React, { useState, useEffect } from "react";

const ExpressionTree = ({ treeData, x = 400, y = 50, levelSpacing = 100, nodeSpacing = 50 }) => {
  const [messages, setMessages] = useState([]); // Messages to display traversal steps
  const [output, setOutput] = useState([]); // Stores the final traversal output

  // Helper to sleep for a delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Inorder Traversal Function
  const inorderTraversal = async (node) => {
    if (!node) return;

    await inorderTraversal(node.left);

    // Announce the number
    setMessages((prev) => [...prev, `Next number to display: ${node.value}`]);
    await sleep(1000); // 1-second delay

    // Display the number
    setMessages((prev) => [...prev, `Displayed: ${node.value}`]);
    setOutput((prev) => [...prev, node.value]);
    await sleep(1000); // 1-second delay

    await inorderTraversal(node.right);
  };

  // Trigger the traversal when `treeData` changes
  useEffect(() => {
    if (treeData) {
      (async () => {
        setMessages([]);
        setOutput([]);
        await inorderTraversal(treeData);
      })();
    }
  }, [treeData]);

  // Recursive function to render the tree nodes and edges
  const renderTree = (node, x, y, depth = 0, parentX = null, parentY = null) => {
    if (!node) return null;

    const childrenXOffset = Math.pow(2, 3 - depth) * 0.4 * nodeSpacing; // Adjusts child spacing based on depth
    const childY = y + levelSpacing;

    return (
      <>
        {parentX !== null && parentY !== null && (
          <line
            x1={parentX}
            y1={parentY + 20}
            x2={x}
            y2={y}
            stroke="white"
            strokeWidth={2}
          />
        )}
        <circle cx={x} cy={y} r={30} fill="lightblue" stroke="black" strokeWidth={2} />
        <text x={x} y={y} textAnchor="middle" dy=".3em" fontSize="25">
          {node.value}
        </text>
        {node.left &&
          renderTree(node.left, x - childrenXOffset, childY, depth + 1, x, y)}
        {node.right &&
          renderTree(node.right, x + childrenXOffset, childY, depth + 1, x, y)}
      </>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100%" height="400">
        {renderTree(treeData, x, y)}
      </svg>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <h3>Traversal Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <h3>Final Output (Inorder):</h3>
        <p>{output.join(", ")}</p>
      </div>
    </div>
  );
};

export default ExpressionTree;

