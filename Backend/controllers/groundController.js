const Ground = require('../models/groundmodel');
const { v4: uuidv4 } = require('uuid');

// ✅ Create Ground
const createGround = async (req, res) => {
    try {
      const user = req.user; // Assuming you have auth middleware setting req.user
  
      
  
      const { name, location, type, image, charges, slots, description } = req.body;
  
      // Validate required fields
      if (!name || !location || !type || !charges || !slots) {
        return res.status(400).json({ error: 'Please fill all required fields' });
      }
  
      const newGround = new Ground({
        provider_id: user._id.toString() , // Use UUID string from logged-in provider
        name,
        location,
        type,
        image: image || '', 
        charges: Number(charges), // Ensure number
        slots: slots.split(',').map(s => s.trim()), // Convert CSV string to array
        description: description || ''
      });
  
      const savedGround = await newGround.save();
      res.status(201).json(savedGround);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
// ✅ Get All Grounds
const getAllGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find();
    res.status(200).json(grounds);
  } catch (error) {
    console.error("Get All Grounds Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Ground by ID
const getGroundById = async (req, res) => {
    try {
      const ground = await Ground.findById(req.params.ground_id); // use _id
      if (!ground) {
        return res.status(404).json({ message: "Ground not found" });
      }
      res.status(200).json(ground);
    } catch (error) {
      console.error("Get Ground by ID Error:", error);
      res.status(500).json({ message: error.message });
    }
  };

// ✅ Delete Ground
const deleteGround = async (req, res) => {
  try {
    await Ground.deleteOne({ ground_id: req.params.ground_id });
    res.status(200).json({ message: "Ground deleted successfully" });
  } catch (error) {
    console.error("Delete Ground Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Export same as bookingController style
module.exports = {
  createGround,
  getAllGrounds,
  getGroundById
};

