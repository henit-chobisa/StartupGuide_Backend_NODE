const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	link: { type: String, required: true },
	thumbnail: { type: String, required: true},
}, {collection: 'Blogs'}
)
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;