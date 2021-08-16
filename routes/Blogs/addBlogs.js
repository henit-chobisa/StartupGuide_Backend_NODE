const express = require('express');
const Blog = require('../../models/Blog');
const router = express.Router();


router.post('/' ,async (req, res) => {
    try {
        console.log(req.body);
        const {
            name,
            category,
            description,
            link,
            thumbnail,
        } = req.body;
        let blog = await Blog.findOne({ name });
        if (blog == null){
            blog = await new Blog({name, category, description, link, thumbnail});
            blog.save();
            res.send("Bingo!, new blog added");
        }
        else {
            res.send("Sorry, blog already exist");
        }

    }
    catch (err) {
		console.log(err);
		return res.send(500);
	}
})

module.exports = router;