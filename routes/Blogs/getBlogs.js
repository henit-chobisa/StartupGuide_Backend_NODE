const express = require('express');
const Blog = require('../../models/Blog');
const router = express.Router();
var url = require('url');

router.get('/', async (req, res) => {
	try {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
		const blogs = await Blog.find().limit(6).skip((parseInt(query.page) - 1) *6);
		console.log(blogs);
		return res.json(blogs);
	} catch (err) {
		console.log(err);
		return res.send(500);
	}
});

module.exports = router;