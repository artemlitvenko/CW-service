const mongoose = require('mongoose');
const express = require('express');
const config = require('./config');
const app = require('./app');

const start = async () => {
    try {
        await mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static('../client/build'));

            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
            });
        }

        app.listen(config.PORT, () => {
            console.log('Server started on port ', config.PORT);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
