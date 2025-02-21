const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});


app.post("/bfhl", (req, res) => {
  // Validate input
  if (!req.body || !Array.isArray(req.body.data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input! 'data' should be an array.",
    });
  }

  const data = req.body.data;
  const numbers = [];
  const alphabets = [];
  let highest_alphabet = "";


  for (const item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === "string" && item.length === 1) {
      alphabets.push(item);
      if (
        !highest_alphabet ||
        item.toUpperCase() > highest_alphabet.toUpperCase()
      ) {
        highest_alphabet = item;
      }
    }
  }

  res.json({
    is_success: true,
    user_id: "Krishna",
    email: "22BCS11146@cuchd.in",
    roll_number: "22BCS11146",
    numbers,
    alphabets,
    highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
