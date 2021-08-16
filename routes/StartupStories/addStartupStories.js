const express = require('express');
const StartupStory = require('../../models/StartupStory');
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
        let startup = await StartupStory.findOne({ name });
        if (startup == null){
            startup = await new StartupStory({name, category, description, link, thumbnail});
            startup.save();
            res.send("Bingo!, new Startup Story added");
        }
        else {
            res.send("Sorry, Story already exist");
        }

    }
    catch (err) {
		console.log(err);
		return res.send(500);
	}
})

module.exports = router;