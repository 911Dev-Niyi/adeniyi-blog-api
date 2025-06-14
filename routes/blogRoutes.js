const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');


// Get all blogs by the authenticated user
blogRouter.get('/myblogs', protect, blogController.getMyBlogs);

//Pulic Routes
// Get all published blogs
blogRouter.get('/', blogController.getPublishedBlogs);
// Get a single published blog by ID
blogRouter.get('/:id', blogController.getSingleBlog);

// Protected Routes

// Create a new blog
blogRouter.post('/', protect, blogController.createBlog);
// Update an existing blog
blogRouter.put('/:id', protect, blogController.updateBlog);
// Delete a blog
blogRouter.delete('/:id', protect, blogController.deleteBlog);
// Publish a blog (only if owner)
blogRouter.patch('/:id/publish', protect, blogController.publishBlog);

module.exports = blogRouter;