import React, { useState } from "react";

// Helper function to parse the expression string in postorder notation
const parsePostorderExpression = (tokens) => {
  const stack = [];

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      // If it's a number, create a leaf node and push it onto the stack
      stack.push({ value: token });
    } else {
      // Otherwise, it's an operator, so pop two operands and create a new node
      const right = stack.pop();
      const left = stack.pop();
      const node = { value: token, left, right };
      stack.push(node);
    }
  });

  // The final stack will contain the root of the expression tree
  return stack.pop();
};

const ExpressionTree = ({ treeData, x = 400, y = 50, levelSpacing = 100, nodeSpacing = 50 }) => {
  // Function to compute the result of the expression tree
  const computeTree = (node) => {
    if (!node) return 0;

    // Base case: if the node is a number
    if (!node.left && !node.right) {
      return parseFloat(node.value);
    }

    // Recursive case: compute left and right subtrees and apply the operator
    const leftValue = computeTree(node.left);
    const rightValue = computeTree(node.right);

    switch (node.value) {
      case "+":
        return leftValue + rightValue;
      case "-":
        return leftValue - rightValue;
      case "*":
        return leftValue * rightValue;
      case "/":
        return leftValue / rightValue;
      case "^":
        return Math.pow(leftValue,rightValue);
      default:
        return 0;
    }
  };

  // Recursive function to render the tree nodes and edges
  const renderTree = (node, x, y, depth = 0, parentX = null, parentY = null) => {
    if (!node) return null;

    const childrenXOffset = Math.pow(2, 3 - depth) * 0.4 * nodeSpacing; // Adjusts child spacing based on depth
    const childY = y + levelSpacing;

    return (
      <>
        {parentX !== null && parentY !== null && (
          // Line connecting to the parent node
          <line
            x1={parentX}
            y1={parentY+20}
            x2={x}
            y2={y+20}
            stroke="white"
            strokeWidth={2}
          />
        )}
        {/* Node Circle */}
        <circle cx={x} cy={y} r={30} fill="lightblue" stroke="black" strokeWidth={2} />
        {/* Node Label */}
        <text x={x} y={y} textAnchor="middle" dy=".3em" fontSize="25">
          {node.value}
        </text>
        {/* Render Left Child */}
        {node.left &&
          renderTree(node.left, x - childrenXOffset, childY, depth + 1, x, y)}
        {/* Render Right Child */}
        {node.right &&
          renderTree(node.right, x + childrenXOffset, childY, depth + 1, x, y)}
      </>
    );
  };

  const result = computeTree(treeData);

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100%" height="400">
        {renderTree(treeData, x, y)}
      </svg>
      <h2>Result: {result}</h2>
    </div>
  );
};

const Postfix = () => {
  const [expression, setExpression] = useState("");
  const [treeData, setTreeData] = useState(null);

  // Handle input change
  const handleInputChange = (event) => {
    const newExpression = event.target.value;
    setExpression(newExpression);

    if (newExpression.trim()) {
      // Tokenize the input expression (split by spaces)
      const tokens = newExpression.trim().split(/\s+/);

      // Parse the expression into a tree and update state
      try {
        const tree = parsePostorderExpression(tokens);
        setTreeData(tree);
      } catch (error) {
        setTreeData(null); // In case of invalid expression
      }
    } else {
      setTreeData(null); // Clear the tree if input is empty
    }
  };

  return (
    <div>
      <h1>Expression Tree (Postorder Notation)</h1>
      <input
        type="text"
        value={expression}
        onChange={handleInputChange}
        placeholder="Enter expression in postorder (e.g., 3 5 2 * +)"
        style={{ padding: "10px", fontSize: "16px", width: "300px" }}
      />
      <div style={{ marginTop: "20px" }}>
        {treeData ? (
          <ExpressionTree treeData={treeData} />
        ) : (
          <p>Enter a valid postorder expression to see the tree.</p>
        )}
      </div>
    </div>
  );
};

export default Postfix;
