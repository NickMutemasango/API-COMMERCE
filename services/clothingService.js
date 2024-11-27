const Clothing = require('../models/clothingModel');

// CREATE - Add a new clothing item
const createClothing = async (clothingData) => {
  try {
    console.log("Creating clothing with data:", clothingData); // Debugging: Log input data

    const clothing = new Clothing(clothingData);
    const savedClothing = await clothing.save();

    console.log("Saved clothing item:", savedClothing); // Debugging: Log saved item
    return savedClothing;
  } catch (error) {
    console.error("Error in createClothing service:", error.message); // Debugging: Log the error
    throw new Error("Error creating clothing");
  }
};


// READ - Get all clothing items
const getAvailableClothes = async (filters) => {
  try {
    const availableClothes = await Clothing.find(filters);
    return availableClothes;
  } catch (error) {
    console.error("Error fetching available clothes:", error);
    throw new Error("Error fetching available clothes");
  }
};




// READ - Get a clothing item by ID
const getClothingById = async (id) => {
  try {
    const clothing = await Clothing.findById(id); // Find clothing by ID
    if (!clothing) {
      throw new Error("Clothing item not found");
    }
    return clothing;
  } catch (error) {
    console.error("Error fetching clothing by ID:", error.message);
    throw new Error("Error fetching clothing item by ID");
  }
};

// UPDATE - Update a clothing item by ID
const updateClothingById = async (id, updateData) => {
  try {
    const updatedClothing = await Clothing.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation is applied
    });
    if (!updatedClothing) {
      throw new Error("Clothing item not found");
    }
    return updatedClothing;
  } catch (error) {
    console.error("Error updating clothing:", error.message);
    throw new Error("Error updating clothing item");
  }
};

// DELETE - Delete a clothing item by ID
const deleteClothingById = async (id) => {
  try {
    const deletedClothing = await Clothing.findByIdAndDelete(id); // Delete by ID
    if (!deletedClothing) {
      throw new Error("Clothing item not found");
    }
    return { message: "Clothing item deleted successfully" };
  } catch (error) {
    console.error("Error deleting clothing:", error.message);
    throw new Error("Error deleting clothing item");
  }
};

module.exports = {
  createClothing,
  getClothingById,
  updateClothingById,
  deleteClothingById,
  getAvailableClothes,
};
