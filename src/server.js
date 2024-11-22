const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const app = express();
const Mongo=process.env.MongoURI 
app.use(express.json());
app.use(cors());
mongoose.connect(Mongo).then(()=>{
  console.log("Mongo DB Connected~!");

})


console.log(Mongo);
// Connect to MongoDB

const insertNode = async (root, value, x, y, parentId = null) => {
  if (!root) {
    const newNode = new Node({
      value: value,
      leftChildId: null,
      rightChildId: null,
      x: x,
      y: y,
    });
    await newNode.save();
    return newNode;
  }

  if (value < root.value) {
    root.leftChildId = await insertNode(root.leftChildId, value, x - 50, y + 50, root._id);
  } else {
    root.rightChildId = await insertNode(root.rightChildId, value, x + 50, y + 50, root._id);
  }

  return root;
};
// Define the Node schema
const nodeSchema = new mongoose.Schema({
  id: Number,
  value: Number,
  left: Number, // Store child node IDs
  right: Number,
  x: Number, // Coordinates for visualization
  y: Number,
});

const Node = mongoose.model("Node", nodeSchema);

// API Endpoints
app.post("/addNode", async (req, res) => {
  try {
    const newNode = new Node(req.body);
    await newNode.save();
    res.status(201).send("Node added successfully");
  } catch (error) {
    res.status(500).send("Error adding node: " + error.message);
  }
});

app.get("/getNodes", async (req, res) => {
  try {
    const nodes = await Node.find();
    res.status(200).json(nodes);
  } catch (error) {
    res.status(500).send("Error fetching nodes: " + error.message);
  }
});

// PATCH route to update the children of a node
app.patch("/updateChildren/:id", async (req, res) => {
  const { id } = req.params;
  const { left, right } = req.body;

  try {
    // Validate input
    if (left && typeof left !== "number") {
      return res.status(400).send("Left child ID must be a number or null");
    }
    if (right && typeof right !== "number") {
      return res.status(400).send("Right child ID must be a number or null");
    }

    // Find the node by ID and update its children
    const updatedNode = await Node.findOneAndUpdate(
      { id: Number(id) }, // Match the node by its ID
      { left: left || null, right: right || null }, // Update left and right children
      { new: true } // Return the updated document
    );

    if (!updatedNode) {
      return res.status(404).send("Node not found");
    }

    res.status(200).json({
      message: "Node updated successfully",
      updatedNode,
    });
  } catch (error) {
    res.status(500).send("Error updating node: " + error.message);
  }
});
app.delete("/deletenodes",async(req,res)=>{
  console.log("Hello"); 
  try{
    Node.deleteMany({}).then((deleteManyResult)=>{
      console.log('Successfully deleted:', deleteManyResult.deletedCount, 'documents');
  })
}
  catch(error){
    console.log('Error:', err);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
