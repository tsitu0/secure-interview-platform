const express = require('express');
const router = express.Router();
const Block = require('../models/Block');
const Slot = require('../models/Slot');

// POST /api/blocks http://localhost:5000/api/blocks


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

    // Find the highest id we've used so far for slots
    const lastSlot = await Slot.findOne().sort({ id: -1 });
    let nextId;
    if (lastSlot) {
      nextId = lastSlot.id + 1;
    } else {
      nextId = 1; // no slots yet, start at 1
    }

    // currentTime will move forward in a loop
    let currentTime = new Date(block.startTime);
    const end = new Date(block.endTime);

    const createdSlots = [];
    while (currentTime < end) {
      // Format the time as something like "10:00 AM"
      const timeLabel = currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });

      // Create one slot
      const slot = new Slot({
        id: nextId,
        blockId: block.blockId, // link to this block
        time: timeLabel,
        reserved: false,
        candidateName: null,
        checkedIn: false,
      });

      // Save the slot to MongoDB
      await slot.save();

      // Store it so we can show it in the response
      createdSlots.push(slot);

      // Prepare for the next slot
      nextId = nextId + 1;

      // Move currentTime forward by slotLength minutes
      const currentMillis = currentTime.getTime();
      const addedMillis = slotLength * 60000; // minutes → ms
      currentTime = new Date(currentMillis + addedMillis);
    }

    res.json({
      message: 'Block created successfully',
      block,
      slots: createdSlots,
    });
  } catch (err) {
    console.error('Error creating block:', err);
    res.status(500).json({ error: 'Server error creating block' });
  }
});

module.exports = router;