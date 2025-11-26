const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  //id must be a number, always required, and unique
  id: {
    type: Number,
    required: true,
    unique: true, 
  },
  time: {
    type: String,
    required: true,
  },
  reserved: {
    type: Boolean,
    default: false,
  },
  candidateName: {
    type: String,
    default: null,
  },
  checkedIn: {
    type: Boolean,
    default: false,
  },
  blockId: {
    type: Number,
    required: true
  }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;