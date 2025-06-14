const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
if (existingUser) {
  return res.status(400).json({ error: 'Email already exists' });
}


        const  user = await User.create(req.body);
        const token = signToken(user._id);
        res.status(201).json({
            status: 'success',
            token,
            user
        });
    }catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))){
            return res.status(401).json({
                message: 'Incorrect email or password',
            });
        }
        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

