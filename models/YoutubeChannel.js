const mongoose = require('mongoose');

const youtubeSchema = mongoose.Schema({
    name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	link: { type: String, required: true },
	thumbnail: { type: String, required: true},
}, {collection: 'youtubeChannels'}
)
const YoutubeChannel = mongoose.model('YoutubeChannel', youtubeSchema);
module.exports = YoutubeChannel;