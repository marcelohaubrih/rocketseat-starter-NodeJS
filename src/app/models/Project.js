const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }] , 
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

mongoose.model('Project', ProjectSchema);