// controllers/flightController.js

exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    
    // Validate inputs
    if (!origin || !destination || !date) {
      return res.status(400).json({ message: "Please provide origin, destination, and date." });
    }

    // Generate mock flights
    const airlines = [
      { name: "IndiGo", logo: "6E" },
      { name: "Air India", logo: "AI" },
      { name: "Vistara", logo: "UK" },
      { name: "SpiceJet", logo: "SG" },
      { name: "Akasa Air", logo: "QP" }
    ];

    const generateRandomTime = (baseHour) => {
      const h = (baseHour + Math.floor(Math.random() * 3)) % 24;
      const m = Math.floor(Math.random() * 60);
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    const mockFlights = Array.from({ length: 6 }).map((_, i) => {
      const airlineCode = airlines[i % airlines.length];
      const baseHour = 6 + i * 2;
      return {
        id: `FL-${airlineCode.logo}-${Math.floor(Math.random() * 9000) + 1000}`,
        airline: airlineCode.name,
        flightNumber: `${airlineCode.logo}-${Math.floor(Math.random() * 900) + 100}`,
        departureTime: generateRandomTime(baseHour),
        arrivalTime: generateRandomTime(baseHour + 2),
        duration: "2h 15m", // Mock static duration for now
        price: Math.floor(Math.random() * 5000) + 3000, // Random price between 3000 and 8000
        origin,
        destination,
        date
      };
    });

    res.json({
      success: true,
      data: mockFlights
    });
  } catch (err) {
    console.error("Error generating flights:", err);
    res.status(500).json({ message: "Error fetching flights" });
  }
};
