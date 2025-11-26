const express = require('express');
const router = express.Router();
const Block = require('../models/Block');

// POST /api/blocks
// Create a new interview block
router.post('/', async (req, res) => {
  try {
    const blockId = req.body.blockId;
    const interviewerName = req.body.interviewerName;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const slotLength = req.body.slotLength;

    // Basic validation
    if (!blockId || !interviewerName || !startTime || !endTime || !slotLength) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if block already exists
    const exists = await Block.findOne({ blockId: blockId });
    if (exists) {
      return res.status(400).json({ error: 'Block with this blockId already exists' });
    }

    // Create the block in MongoDB
    const block = new Block({
      blockId,
      interviewerName,
      startTime,
      endTime,
      slotLength,
    });
    //wait to upload the data
    await block.save();

    res.json({
      message: 'Block created successfully',
      block,
    });
  } catch (err) {
    console.error('Error creating block:', err);
    res.status(500).json({ error: 'Server error creating block' });
  }
});

module.exports = router;