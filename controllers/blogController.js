const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const User = require('../models/userModel')

const calculateReadingTime = require('../utils/readingTime')
exports.createBlog = async (req, res) => {
    try {
        const reading_time = calculateReadingTime(req.body.body)

        const blog = await Blog.create({ ...req.body, author: req.user._id, reading_time });
        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully',
            blog
        });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: 'error',
            message: 'Error creating blog: ' + error.message
        });
    }
};

exports.getPublishedBlogs= async (req, res) => {
    try {
        const { search, author, sortBy} = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = { state: 'published' };
        //Search by title or tags
        if (search) {
            filter.$or = [
                { title: {$regex: search, $options: 'i'}},
                {tags: {$regex: search, $options: 'i'}}
            ];
        }
        //Filter by author name 
        let matchingAuthors = []
        if (author) { 
            matchingAuthors = await User.find({
                $or: [
                    {first_name: {$regex: author, $options: 'i'}},
                    {last_name: {$regex: author, $options: 'i'}}
                ]
            }).select('_id');
        }
        if (author){
             const authorIds = matchingAuthors.map(user => user._id);
        filter.author = { $in: authorIds};

        }
       
        //Determine sorting
        let sortOption = {};
        if (sortBy === 'read_count') {
            sortOption.read_count = -1;
        } else {
            sortOption.createdAt = -1; //default
        }
        
        const blogs = await Blog.find( filter) .populate('author', 'first_name last_name ').skip(skip).limit(limit).sort( sortOption);

        const totalBlogs = await Blog.countDocuments(filter);
        const totalPages = Math.ceil(totalBlogs / limit);
        res.status(200).json({
            status: 'success',
            count: blogs.length, 
            currentPage: page,
            totalPages,
            totalBlogs,
            blogs
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching blogs: ' + error.message
        });
    }
};
exports.getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        //validate mongoDB objectId
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: 'error',
                message:'Invalid Blog Id format'
            })
        }
        let user = null;

        // Decode token if present 
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith ('Bearer ')){
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await User.findById(decoded.id);
        }
        const blog = await Blog.findById(req.params.id).populate('author', 'first_name last_name');

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found or not published'
            });
        }
        // Access control: allow if published or if the requester is the author
        const isAuthor = user && blog.author && blog.author._id.toString() === user._id.toString();
        if (blog.state !== 'published' && !isAuthor) {
            return res.status(403).json({
                status: 'error',
                message: 'Unauthorized to view this blog'
            })
        }
        // Increment read count if blog state = 'published'
        if (blog.state === 'published') {
            blog.read_count += 1;
            await blog.save();
        }
        res.status(200).json({
            status: 'success',
            blog
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching blog: ' + error.message
        });
    }
};
exports.updateBlog = async (req, res) => {
    try {

          const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid blog ID format'
        })
    }
        const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found'});
            }
            if (!blog.author.equals(req.user._id)){
                return res.status(403).json({message: 'Forbidden'});
            }
            //Merge incoming changes
            Object.assign(blog, req.body);
            //Recalculate reading_time if body was updated
            if (req.body.body){
                blog.reading_time = calculateReadingTime(req.body.body);
            }

            await blog.save();
            res.status(200).json({ message: 'Blog updated', blog});
    } catch (error) {
        res.status(400).json ({
            message: 'Error updating blog: ' + error.message
        });
    }
};
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid blog ID format'
        })
    }
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  if (!blog.author.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

  await blog.deleteOne();
  res.status(204).send();
};
exports.publishBlog = async (req, res) => {
      const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid blog ID format'
        })
    }
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  if (!blog.author.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

  blog.state = 'published';
  await blog.save();
  res.status(200).json({ message: 'Blog published', blog });
};
exports.getMyBlogs = async (req, res) => {
    try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const { state } = req.query;
    const query = { author: req.user._id };
    if (state) query.state = state;
    
    const blogs = await Blog.find(query).skip(skip).limit(limit).sort({ createdAt: -1 })

    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);
    res.status(200).json({
        status: 'success',
        count: blogs.length,
        currentPage: page,
        totalPages,
        totalBlogs,
        blogs
    });
    
  }catch (error) {
    res.status(500).json({
        status: 'error',
        message: 'Error fetching blogs: ' + error.message
    });
  }
};