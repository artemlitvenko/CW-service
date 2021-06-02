const app = require('../app');
const config = require('../config');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

describe('testing post endpoint of orders', () => {
    beforeAll(() => {
        mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    test('Create new order with correct date', async () => {
        const response = await request.post('/api/order').send({
            city: '6081358e2dd14410205faf0e',
            client_email: 'admin233333333d@example.com',
            client_name: 'Alena',
            end_time: '2021-06-15T06:00:00.000Z',
            master: '60b6e894f81ea34d48d47022',
            size: 7200000,
            start_time: '2021-06-15T04:00:00.000Z',
        });
        expect(response.status).toBe(200);
    }, 50000);
    test('Validation - incorrect email', async () => {
        const response = await request.post('/api/order').send({
            city: '6081358e2dd14410205faf0e',
            client_email: 'admin233333333dexample.com',
            client_name: 'Denis',
            end_time: '2021-06-15T06:00:00.000Z',
            master: '60b6e894f81ea34d48d47022',
            size: 7200000,
            start_time: '2021-06-15T04:00:00.000Z',
        });
        expect(response.status).toBe(400);
    }, 50000);
    test('Validation - incorrect City Id', async () => {
        const response = await request.post('/api/order').send({
            city: '5465',
            client_email: 'admin233333333d@example.com',
            client_name: 'Denis',
            end_time: '2021-06-16T06:00:00.000Z',
            master: '60b6e894f81ea34d48d47022',
            size: 7200000,
            start_time: '2021-06-16T04:00:00.000Z',
        });
        expect(response.status).toBe(400);
    }, 50000);
    test('Validation - long name', async () => {
        const response = await request.post('/api/order').send({
            city: '6081358e2dd14410205faf0e',
            client_email: 'admin233333333@dexample.com',
            client_name: 'Mashaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            end_time: '2021-06-15T06:00:00.000Z',
            master: '60b6e894f81ea34d48d47022',
            size: 7200000,
            start_time: '2021-06-15T04:00:00.000Z',
        });
        expect(response.status).toBe(400);
    }, 50000);
    test('Validation - incorrect end_time', async () => {
        const response = await request.post('/api/order').send({
            city: '6081358e2dd14410205faf0e',
            client_email: 'admin233333333@dexample.com',
            client_name: 'Denis',
            end_time: '56465464646564646',
            master: '60b6e894f81ea34d48d47022',
            size: 7200000,
            start_time: '2021-06-15T04:00:00.000Z',
        });
        expect(response.status).toBe(400);
    }, 50000);
});
