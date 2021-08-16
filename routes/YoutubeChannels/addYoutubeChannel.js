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
        let YoutubeChannel = await YoutubeChannel.findOne({ name });
        if (YoutubeChannel == null){
            YoutubeChannel = await new YoutubeChannel({name, category, description, link, thumbnail});
            YoutubeChannel.save();
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