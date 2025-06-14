const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  tags: [ String ],
  body: { type: String, required: true },
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state: { type: String, enum: ['draft', 'published'], default: 'draft' },
  read_count: { type: Number, default: 0 },
  reading_time: String,
}, {
    timestamps: true
 }
);

// Middleware to calculate reading time before saving
blogSchema.pre('save', function(next) {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = this.body.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    this.reading_time = `${minutes} min read`;
    next();
}
);

module.exports = mongoose.model('blog', blogSchema);  