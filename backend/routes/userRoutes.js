const express = require('express');
const router = express.Router();
const { createUser, loginUser, getSingleUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/singleuser', protect, getSingleUser);

module.exports = router;