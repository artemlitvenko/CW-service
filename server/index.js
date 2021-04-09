const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authRouter = require('./routes/auth.routes');
const cityRouter = require('./routes/city.routes.js');
const masterRouter = require('./routes/master.routes.js');
const orderRouter = require('./routes/order.routes.js');
const clientRouter = require('./routes/client.routes.js');
const app = express();
const corsMiddleware = require('./middleware/cors.middleware');
const cors = require('cors');

app.use(cors());
app.use(corsMiddleware);
app.use(express.json());
app.use('/api/auth', authRouter); // регистрация роутеров
app.use('/api/city', cityRouter);
app.use('/api/master', masterRouter);
app.use('/api/order', orderRouter);
app.use('/api/client', clientRouter);

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
