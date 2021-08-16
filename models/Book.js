const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	link: { type: String, required: true },
	thumbnail: { type: String, required: true},
}, {collection: 'Books'}
)
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;