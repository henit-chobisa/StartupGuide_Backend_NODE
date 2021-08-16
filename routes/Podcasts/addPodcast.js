const express = require('express');
const Podcast = require('../../models/Podcast');
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
        let podcast = await Podcast.findOne({ name });
        if (podcast == null){
            podcast = await new Podcast({name, category, description, link, thumbnail});
            podcast.save();
            res.send("Bingo!, new podcast added");
        }
        else {
            res.send("Sorry, podcast already exist");
        }

    }
    catch (err) {
		console.log(err);
		return res.send(500);
	}
})

module.exports = router;