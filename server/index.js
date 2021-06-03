const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

const start = async () => {
    try {
        await mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(config.PORT, () => {
            console.log('Server started on port ', config.PORT);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
