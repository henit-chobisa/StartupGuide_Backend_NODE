const mongoose = require('mongoose');

const podcastSchema = mongoose.Schema({
    name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	link: { type: String, required: true },
	thumbnail: { type: String, required: true},
}, {collection: 'Podcasts'}
)
const Podcast = mongoose.model('Podcast', podcastSchema);
module.exports = Podcast;