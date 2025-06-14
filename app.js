const express = require('express');
const dotenv = require('dotenv');

const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes');
dotenv.config();


const app = express();
app.use(express.json());

app.use('/BlogApi/v1/auth', authRouter);

app.use('/BlogApi/v1/blogs', blogRouter);


module.exports = app;