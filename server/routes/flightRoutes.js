const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  const { origin, destination, date } = req.query;

  try {
    // Dummy response (replace with Amadeus API)
    const data = [
      { airline: "IndiGo", price: 4500 },
      { airline: "Air India", price: 5200 },
      { airline: "SpiceJet", price: 4100 }
    ];

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "Error fetching flights" });
  }
});

module.exports = router;
