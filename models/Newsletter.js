const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
    name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	link: { type: String, required: true },
	thumbnail: { type: String, required: true},
}, {collection: 'Newsletters'}
)
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
module.exports = Newsletter;