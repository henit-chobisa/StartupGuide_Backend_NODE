const express = require('express');
const Tweet = require('../../models/Tweet');
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
        let tweet = await Tweet.findOne({ name });
        if (tweet == null){
            tweet = await new Newsletter({name, category, description, link, thumbnail});
            tweet.save();
            res.send("Bingo!, new tweet added");
        }
        else {
            res.send("Sorry, tweet already exist");
        }

    }
    catch (err) {
		console.log(err);
		return res.send(500);
	}
})

module.exports = router;