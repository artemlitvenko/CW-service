const express = require('express');
const app = express();
const authRouter = require('./routes/auth.routes');
const cityRouter = require('./routes/city.routes.js');
const masterRouter = require('./routes/master.routes.js');
const orderRouter = require('./routes/order.routes.js');
const clientRouter = require('./routes/client.routes.js');
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

module.exports = app;
