const mongoose = require('mongoose');

const connect = async() => {
    try {
        await mongoose.connect(
            'mongodb+srv://HenitChobisa:111.SharedARU@cluster0.2hki4.mongodb.net/StartupGuide?retryWrites=true&w=majority',
            {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			}
        );
        console.log('Database connected');
    }
    catch (e) {
		console.log(e);
	}
};

module.exports = connect;