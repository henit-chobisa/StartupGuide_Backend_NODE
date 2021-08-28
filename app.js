const express = require('express');
const db = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;
const middleWareAuth = require('./middleware/verifyWebToken');

db();
app.use(express.json());

app.use('/api/getBooks' , require('./routes/Books/getBooks'));
app.use('/api/addBooks', middleWareAuth ,require('./routes/Books/addBooks'));

app.use('/api/getBlogs',require('./routes/Blogs/getBlogs'));
app.use('/api/addBlogs', middleWareAuth , require('./routes/Blogs/addBlogs'));

app.use('/api/getNewsletters', require('./routes/Newsletters/getNewsletters'));
app.use('/api/addNewsletters', middleWareAuth ,require('./routes/Newsletters/addNewsletters'));

app.use('/api/addStartupStories', middleWareAuth ,require('./routes/StartupStories/addStartupStories'));
app.use('/api/getStartupStories', require('./routes/StartupStories/getStartupStories'));

app.use('/api/getYoutubeChannels', require('./routes/YoutubeChannels/getYoutubeChannels'));
app.use('/api/addYouTubeChannels',middleWareAuth ,require('./routes/YouTubeChannels/addYoutubeChannel'));

app.use('/api/getPodcasts', require('./routes/Podcasts/getPodcasts'));
app.use('/api/addPodcasts',middleWareAuth , require('./routes/Podcasts/addPodcast'));

app.use('/api/getTweets', require('./routes/Tweets/getTweets'));
app.use('/api/addTweets', middleWareAuth , require('./routes/Tweets/addTweets'));

app.use('/api/auth',require('./config/authentication'));

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});