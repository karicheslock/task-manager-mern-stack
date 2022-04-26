const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        taskText: {
            type: String,
            required: [true, 'Please enter a task']
        },
        date: {
            type: Date,
            default: Date.now
        },
        comments: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);