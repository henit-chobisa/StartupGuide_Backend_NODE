const express = require('express');
const Book = require('../../models/Book');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const {
            name,
            category,
            description,
            link,
            thumbnail,
        } = req.body;
        let book = await Book.findOne({ name });
        if (book == null){
            book = await new Book({name, category, description, link, thumbnail});
            book.save();
            res.send("Bingo!, new book added");
        }
        else {
            res.send("Sorry, book already exist");
        }

    }
    catch (err) {
		console.log(err);
		return res.send(500);
	}
})

module.exports = router;