import React from "react";
import "./App.css"; // Reusing the CSS file created earlier
import { useNavigate } from "react-router-dom";
import "./infix_tree";
import "./postfix_tree";
import "./prefix_tree";

const ExpressionManipulation = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate1 = () => {
    navigate("/Infix");
  };
  const handleNavigate2 = () => {
    navigate("/Postfix");
  };
  const handleNavigate3 = () => {
    navigate("/Prefix");
  };

  return (
    <div className="container">
      <h1 className="title">Expression Manipulation</h1>
      <p className="paragraph">
        There are 3 types of expressions: Infix, Postfix and Prefix. Infix is the regular notation of writing expressions that we use in mathematics. However, for a computer, this is not the most efficient system. There may also be discrepancies with regard to order of operations(BODMAS). In such cases, we use Prefix and Postfix notations. Prefix notations and Prefix notations can be evaluated faster than the infix notation. There is also no issue of left-right associativity.
      </p>
      <div className="box-container">
        {/* Box 1 */}
        <div className="box">
          <h3 className="box-heading">Infix</h3>
          <p className="box-paragraph">
          Infix expressions are mathematical expressions where the operator is placed between its operands.
          </p>
          <button className="button" onClick={handleNavigate1}>
            Go to Page
          </button>
        </div>
        {/* Box 2 */}
        <div className="box">
          <h3 className="box-heading">Postfix</h3>
          <p className="box-paragraph">
          Postfix notation is the notation in which operators are placed after the corresponding operands in the expression.
          </p>
          <button className="button" onClick={handleNavigate2}>
            Go to Page
          </button>
        </div>
        {/* Box 3 */}
        <div className="box">
          <h3 className="box-heading">Prefix</h3>
          <p className="box-paragraph">
          Prefix notation is the notation in which operators are placed before the corresponding operands in the expression.
          </p>
          <button className="button" onClick={handleNavigate3}>
            Go to Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpressionManipulation;
