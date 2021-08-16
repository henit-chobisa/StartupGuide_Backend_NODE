const express = require('express');
const Newsletter = require('../../models/Newsletter');
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
        let newsletter = await Newsletter.findOne({ name });
        if (newsletter == null){
            newsletter = await new Newsletter({name, category, description, link, thumbnail});
            newsletter.save();
            res.send("Bingo!, new Newsletter added");
        }
        else {
            res.send("Sorry, Newsletter already exist");
        }

    }
    catch (err) {
		console.log(err);
		return res.send(500);
	}
})

module.exports = router;