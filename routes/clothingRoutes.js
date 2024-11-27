const express = require("express");
const router = express.Router();
const clothingService = require("../services/clothingService");

// GET all available clothing
router.get("/available", async (req, res) => {
  try {
    const availableClothes = await clothingService.getAvailableClothes();
    res.status(200).json(availableClothes);
  } catch (error) {
    console.error("Error fetching available clothes:", error);
    res.status(500).json({ message: "Error fetching available clothes", error: error.message });
  }
});


// GET clothing by ID
router.get("/:id", async (req, res) => {
  try {
    const clothing_id = req.params.id;
    const clothing = await clothingService.getClothingById(clothing_id);
    if (clothing) {
      res.status(200).json(clothing);
    } else {
      res.status(404).json({ message: "Clothing not found" });
    }
  } catch (error) {
    console.error("Error fetching clothing by ID:", error);
    res.status(500).json({ message: "Error fetching clothing", error: error.message });
  }
});

// POST create a new clothing item
router.post("/", async (req, res) => {
  try {
    const clothingData = req.body;

    // Validate required fields
    if (!clothingData.name || !clothingData.price || !clothingData.clothing_size) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("Request body:", clothingData); // Debugging: Log the request body

    const newClothing = await clothingService.createClothing(clothingData);
    res.status(201).json(newClothing);
  } catch (error) {
    console.error("Error creating clothing:", error); // Debugging: Log the error
    res.status(500).json({ message: "Error creating clothing", error: error.message });
  }
});


// PUT update clothing availability
router.put("/:id/availability", async (req, res) => {
  try {
    const clothing_id = req.params.id;
    const { availability } = req.body;

    if (availability === undefined) {
      return res.status(400).json({ message: "Missing availability field" });
    }

    const updatedClothing = await clothingService.updateClothingAvailability(
      clothing_id,
      availability
    );
    if (updatedClothing) {
      res.status(200).json(updatedClothing);
    } else {
      res.status(404).json({ message: "Clothing not found" });
    }
  } catch (error) {
    console.error("Error updating clothing availability:", error);
    res.status(500).json({ message: "Error updating clothing availability", error: error.message });
  }
});

// DELETE clothing by ID
router.delete("/:id", async (req, res) => {
  try {
    const clothing_id = req.params.id;
    const deletedClothing = await clothingService.deleteClothing(clothing_id);
    if (deletedClothing) {
      res.status(200).json({ message: "Clothing deleted successfully" });
    } else {
      res.status(404).json({ message: "Clothing not found" });
    }
  } catch (error) {
    console.error("Error deleting clothing:", error);
    res.status(500).json({ message: "Error deleting clothing", error: error.message });
  }
});

module.exports = router;
