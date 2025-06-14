const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as necessary


exports.protect = async (req, res, next) => {
let token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded.id);
        
       
        if (!user) throw new Error('User not found');

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: 'Unauthorized:' + error.message});
    }
};