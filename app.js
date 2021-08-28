const express = require('express');
const db = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;
const accessTokenSecret = 'bfwbfwefewjfewhfkweroitj4witji42jtniwitvjwutw094eut0w4u';

db();
app.use(express.json());

const authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.send(err);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(404);
    }
};

app.use('/api/getBooks' , require('./routes/Books/getBooks'));
app.use('/api/addBooks', authenticate ,require('./routes/Books/addBooks'));

app.use('/api/getBlogs',require('./routes/Blogs/getBlogs'));
app.use('/api/addBlogs', authenticate , require('./routes/Blogs/addBlogs'));

app.use('/api/getNewsletters', require('./routes/Newsletters/getNewsletters'));
app.use('/api/addNewsletters', authenticate ,require('./routes/Newsletters/addNewsletters'));

app.use('/api/addStartupStories', authenticate ,require('./routes/StartupStories/addStartupStories'));
app.use('/api/getStartupStories', require('./routes/StartupStories/getStartupStories'));

app.use('/api/getYoutubeChannels', require('./routes/YoutubeChannels/getYoutubeChannels'));
app.use('/api/addYouTubeChannels',authenticate ,require('./routes/YouTubeChannels/addYoutubeChannel'));

app.use('/api/getPodcasts', require('./routes/Podcasts/getPodcasts'));
app.use('/api/addPodcasts',authenticate , require('./routes/Podcasts/addPodcast'));

app.use('/api/getTweets', require('./routes/Tweets/getTweets'));
app.use('/api/addTweets', authenticate , require('./routes/Tweets/addTweets'));

app.use('/api/auth',require('./config/authentication'));

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});