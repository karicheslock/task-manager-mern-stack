const express = require('express');
const router = express.Router();
const { getTasks, createTask, getSingleTask, updateTask, deleteTask } = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTasks);

router.post('/create-task', protect, createTask);

router.get('/edit-task/:id', protect, getSingleTask);

router.put('/edit-task/:id', protect, updateTask);

router.delete('/:id', protect, deleteTask);

module.exports = router;