const express = require('express');
const router = express.Router();

// Temporary in-memory "database"
let slots = [
  { id: 1, time: "10:00 AM", reserved: false },
  { id: 2, time: "11:00 AM", reserved: false },
  { id: 3, time: "1:00 PM", reserved: true, candidateName: "Tom" }
];

//http://localhost:5000/api/slots
// GET /api/slots - list all slots
router.get('/slots', (req, res) => {
  res.json(slots);
});

//http://localhost:5000/api/test
// Example placeholder route
router.get('/test', (req, res) => {
  res.send("Interview routes working!");
});

module.exports = router;

