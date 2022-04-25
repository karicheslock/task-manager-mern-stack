const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Create user
// @route POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, username, password} = req.body;

    // make sure user enters all fields
    if(!firstName || !lastName || !email || !username || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    };

    // check if user exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400)
        throw new Error('An account associated with that email address already exists')
    };

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    // Check for username
    const user = await User.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
});

// @desc Get single user data
// @route GET /api/users/singleuser
// @access Private
const getSingleUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    }, function(err,token) {
        if (err) {
            console.log(err);
        } else {
            console.log(token);
        }
    }
    )
};

module.exports = {
    createUser,
    loginUser,
    getSingleUser,
};