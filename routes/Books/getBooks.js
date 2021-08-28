const express = require('express');
const Book = require('../../models/Book');
const router = express.Router();
var url = require('url');

router.get('/', async (req, res) => {
	try {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
		const books = await Book.find().limit(6).skip((parseInt(query.page) - 1) *6);
		return res.json(books);
	} catch (err) {
		console.log(err);
		return res.send(500);
	}
});

module.exports = router;