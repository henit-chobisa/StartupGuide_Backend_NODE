const express = require('express');
const YoutubeChannel = require('../../models/YoutubeChannel');
const router = express.Router();
var url = require('url');

router.get('/', async (req, res) => {
	try {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
		const YoutubeChannels = await YoutubeChannel.find().limit(6).skip((parseInt(query.page) - 1) *6);
		return res.json(YoutubeChannels);
	} catch (err) {
		console.log(err);
		return res.send(500);
	}
});

module.exports = router;