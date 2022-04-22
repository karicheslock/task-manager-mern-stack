const asyncHandler = require('express-async-handler');

const Task = require('../models/taskModel');
const User = require('../models/userModel');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id })

    res.status(200).json(tasks);
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getSingleTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    res.status(200).json(task);
})

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
    const { taskText, date, comments, isCompleted } = req.body;

    if (!taskText) {
        res.status(400)
        throw new Error('Please add a task')
    };

    const task = await Task.create({
        taskText,
        date,
        comments,
        isCompleted,
        user: req.user.id,
    })

    res.status(200).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(!task) {
        res.status(400)
        throw new Error('Task not found')
    };

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    };

    // check if logged in user matches task user
    if(task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    };

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedTask);
});

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(!task) {
        res.status(400)
        throw new Error('Task not found')
    };

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    };

    // check if logged in user matches task user
    if(task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    };

    await task.remove();

    res.status(200).json({id: req.params.id });
});

module.exports = {
    getTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
};