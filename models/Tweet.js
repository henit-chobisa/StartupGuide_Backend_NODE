const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	link: { type: String, required: true },
	thumbnail: { type: String, required: true},
}, {collection: 'Tweets'}
)
const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;