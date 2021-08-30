const express = require('express');
const db = require('./config/db');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5500;
const accessTokenSecret = 'bfwbfwefewjfewhfkweroitj4witji42jtniwitvjwutw094eut0w4u';
const authenticate = require('./middleWare/authenticate');
db();
app.use(cors());
app.use(express.json());

app.use('/api/getBooks' , require('./routes/Books/getBooks'));
app.use('/api/addBooks', authenticate ,require('./routes/Books/addBooks'));
app.use('/api/getAllBooks', require('./routes/Books/getAllBooks'));

app.use('/api/getBlogs',require('./routes/Blogs/getBlogs'));
app.use('/api/addBlogs', authenticate , require('./routes/Blogs/addBlogs'));
app.use('/api/getAllBlogs', require('./routes/Blogs/getAllBlogs'));

app.use('/api/getNewsletters', require('./routes/Newsletters/getNewsletters'));
app.use('/api/addNewsletters', authenticate ,require('./routes/Newsletters/addNewsletters'));
app.use('/api/getAllNewsletters', require('./routes/Newsletters/getAllNewsletters'));

app.use('/api/addStartupStories', authenticate ,require('./routes/StartupStories/addStartupStories'));
app.use('/api/getStartupStories', require('./routes/StartupStories/getStartupStories'));
app.use('/api/getAllStartupStories', require('./routes/StartupStories/getAllStartupStories'));

app.use('/api/getYoutubeChannels', require('./routes/YoutubeChannels/getYoutubeChannels'));
app.use('/api/addYouTubeChannels',authenticate ,require('./routes/YoutubeChannels/addYoutubeChannels'));
app.use('/api/getAllYoutubeChannels', require('./routes/YoutubeChannels/getAllYoutubeChannels'));

app.use('/api/getPodcasts', require('./routes/Podcasts/getPodcasts'));
app.use('/api/addPodcasts',authenticate , require('./routes/Podcasts/addPodcast'));
app.use('/api/getAllPodcasts', require('./routes/Podcasts/getAllPodcasts'));

app.use('/api/getTweets', require('./routes/Tweets/getTweets'));
app.use('/api/addTweets', authenticate , require('./routes/Tweets/addTweets'));
app.use('/api/getAllTweets', require('./routes/Tweets/getAllTweets'));

app.use('/api/auth',require('./config/authentication'));

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});