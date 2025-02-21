const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// GET route to check if the API is running
app.get("/bfhl", (req, res) => {
  res.json({ message: "BFHL API is working! Use POST to send data." });
});

// POST route to process input data
app.post("/bfhl", (req, res) => {
  try {
    if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input! 'data' should be an array.",
      });
    }

    const data = req.body.data;
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));
    const highest_alphabet = alphabets.length
      ? [alphabets.sort()[alphabets.length - 1]]
      : [];

    res.json({
      is_success: true,
      user_id: "RSKrishna",
      email: "22BCS11146@cuchd.in",
      roll_number: "22BCS11146",
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error!" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
