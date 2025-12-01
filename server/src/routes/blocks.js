const express = require('express');
const router = express.Router();
const Block = require('../models/Block');
const Slot = require('../models/Slot');

// POST /api/blocks  -> http://localhost:3001/api/blocks
// Create a new interview block and generate its slots
router.post('/', async (req, res) => {
  try {
    const { blockId, interviewerName, startTime, endTime, slotLength } = req.body;

    // assume data is valid / present like you said, keep this light
    const block = new Block({
      blockId,
      interviewerName,
      startTime,
      endTime,
      slotLength,
    });

    await block.save();

    // find the current max slot id so we can keep IDs unique across all slots
    const lastSlot = await Slot.findOne().sort({ id: -1 });
    let nextId = lastSlot ? lastSlot.id + 1 : 1;

    const createdSlots = [];

    let currentTime = new Date(startTime);
    const end = new Date(endTime);

    // generate slots from startTime to endTime, stepping by slotLength minutes
    while (currentTime < end) {
      const slot = new Slot({
        id: nextId,
        blockId: block.blockId,
        slotDateTime: currentTime,  // full date + time
        reserved: false,
        candidateName: null,
        checkedIn: false,
      });

      await slot.save();
      createdSlots.push(slot);

      nextId += 1;

      // move to next slot
      currentTime = new Date(currentTime.getTime() + slotLength * 60000);
    }

    return res.json({
      message: 'Block created successfully',
      block,
      slots: createdSlots,
    });
  } catch (err) {
    console.error('Error creating block:', err);
    return res.status(500).json({ error: 'Server error creating block' });
  }
});

module.exports = router;
