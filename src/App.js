import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpressionManipulation from "./EM";
import HomePage from "./Home";
import TreeTraversal from "./TT";
import Prefix from "./prefix_tree";
import Postfix from "./postfix_tree";
import Infix from "./infix_tree";
import BST from "./hopefully_binary_tree";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/EM" element={<ExpressionManipulation />} />
        <Route path="/TT" element={<TreeTraversal />} />
        <Route path="/Infix" element={<Infix />} />
        <Route path="/Prefix" element={<Prefix />} />
        <Route path="/Postfix" element={<Postfix />} />
        <Route path="/BST" element={<BST />} />
        
      </Routes>
    </Router>
  );
};

export default App;

