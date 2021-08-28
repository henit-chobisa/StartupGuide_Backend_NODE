const express = require('express');
const YoutubeChannel = require('../../models/YoutubeChannel');
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
        let youtubeChannel = await YoutubeChannel.findOne({ name });
        if (youtubeChannel == null){
            youtubeChannel = await new YoutubeChannel({name, category, description, link, thumbnail});
            youtubeChannel.save();
            res.send("Bingo!, new YoutubeChannel added");
        }
        else {
            res.send("Sorry, YoutubeChannel already exist");
        }

    }
    catch (err) {
		console.log(err);
		return res.send(500);
	}
})

module.exports = router;