const mongoose = require('mongoose');

const startupSchema = mongoose.Schema({
    name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	link: { type: String, required: true },
	thumbnail: { type: String, required: true},
}, {collection: 'StartupStories'}
)
const StartupStory = mongoose.model('StartupStory', startupSchema);
module.exports = StartupStory;