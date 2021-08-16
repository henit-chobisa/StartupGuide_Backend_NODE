const express = require('express');
const db = require('./config/db');
const app = express();
const port = 5000;
const middleWareAuth = require('./middleware/authenticateJWT');

db();
app.use(express.json());

app.use('/getBooks', require('./routes/Books/getBooks'));
app.use('/addBooks', middleWareAuth ,require('./routes/Books/addBooks'));

app.use('/getBlogs',require('./routes/Blogs/getBlogs'));
app.use('/addBlogs', middleWareAuth , require('./routes/Blogs/addBlogs'));

app.use('/getNewsletters', require('./routes/Newsletters/getNewsletters'));
app.use('/addNewsletters', middleWareAuth ,require('./routes/Newsletters/addNewsletters'));

app.use('/addStartupStories', middleWareAuth ,require('./routes/StartupStories/addStartupStories'));
app.use('/getStartupStories', require('./routes/StartupStories/getStartupStories'));

app.use('/getYoutubeChannels', require('./routes/YoutubeChannels/getYoutubeChannels'));
app.use('addYouTubeChannels',middleWareAuth ,require('./routes/YouTubeChannels/addYoutubeChannel'));

app.use('/getPodcasts', require('./routes/Podcasts/getPodcasts'));
app.use('/addPodcasts',middleWareAuth , require('./routes/Podcasts/addPodcast'));

app.use('/getTweets', require('./routes/Tweets/getTweets'));
app.use('/addTweets', middleWareAuth , require('./routes/Tweets/addTweets'));

app.use('/signUp',require('./config/register'));
app.use('/login', require('./config/login'));
app.use('/getJWT', require('./middleWare/getAToken'));


app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});