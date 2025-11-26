const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    blockId:{
        type: Number,
        required: true,
        unique: true,     
    },
    interviewerName: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    slotLength: {
        type: Number, 
        required: true,
    }
})

const Block = mongoose.model('Block',blockSchema);
module.exports = Block;