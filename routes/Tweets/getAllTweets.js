const express = require('express');
const Tweet  = require('../../models/Tweet');
const router = express.Router();
var url = require('url');

router.get('/', async (req, res) => {
	try {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
		const tweets = await Tweet.find();
		return res.json(tweets);
	} catch (err) {
		console.log(err);
		return res.send(500);
	}
});

module.exports = router;