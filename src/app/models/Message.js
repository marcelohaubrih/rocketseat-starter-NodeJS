const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },    
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

mongoose.model('Message', MessageSchema);