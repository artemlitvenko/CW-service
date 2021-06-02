const app = require('../app');
const config = require('../config');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

describe('testing endpoint of masters', () => {
    beforeAll(() => {
        mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    describe('Post', function () {
        test('Create new master with correct date', async () => {
            const response = await request.post('/api/master').send({ name: 'Artem', rating: 5, city: '6081470183fde44a4010eb19' });
            expect(response.status).toBe(200);
        }, 50000);
        test('Validation - empty name', async () => {
            const response = await request.post('/api/master').send({ name: '', rating: 5, city: '6081470183fde44a4010eb19' });
            expect(response.status).toBe(400);
        }, 50000);
        test('Validation - long name', async () => {
            const response = await request
                .post('/api/master')
                .send({ name: 'ddddddddddddddddddddddddddddddddddddddddddddddddddd', rating: 5, city: '6081470183fde44a4010eb19' });
            expect(response.status).toBe(400);
        }, 50000);
        test('Validation - short name', async () => {
            const response = await request.post('/api/master').send({ name: 'dd', rating: 5, city: '6081470183fde44a4010eb19' });
            expect(response.status).toBe(400);
        }, 50000);
        test('Validation - empty rating', async () => {
            const response = await request.post('/api/master').send({ name: 'Artem', rating: '', city: '6081470183fde44a4010eb19' });
            expect(response.status).toBe(400);
        }, 50000);
        test('Validation - rating too big', async () => {
            const response = await request.post('/api/master').send({ name: 'Artem', rating: 10, city: '6081470183fde44a4010eb19' });
            expect(response.status).toBe(400);
        }, 50000);
        test('Validation - empty city', async () => {
            const response = await request.post('/api/master').send({ name: 'Artem', rating: 4, city: '' });
            expect(response.status).toBe(400);
        }, 50000);
        test('Validation - id of city is incorrect', async () => {
            const response = await request.post('/api/master').send({ name: 'Artem', rating: 4, city: 'asadsadsd' });
            expect(response.status).toBe(400);
        }, 50000);
    });

    describe('Get', function () {
        test('get masters', async () => {
            const response = await request.get('/api/master');
            expect(response.status).toBe(200);
        }, 20000);
    });

    describe('Put', function () {
        test('Update master with correct date', async () => {
            const req = { body: { name: 'Artem', city: '608146fb83fde44a4010eb18', rating: '3' } };
            const id = '60b65a2f6b4b013b0cf92d83';
            const response = await request.put(`/api/master/${id}`, req);
            expect(response.status).toBe(200);
        }, 20000);
        test('Validation - incorrect User Id', async () => {
            const req = { body: { name: 'Artem', city: '608146fb83fde44a4010eb18', rating: 3 } };
            const id = 'sadssds';
            const response = await request.put(`/api/master/${id}`, req);
            expect(response.status).toBe(400);
        }, 20000);
        test('Validation - short name', async () => {
            const req = { body: { name: 'Ar', city: '608146fb83fde44a4010eb18', rating: 3 } };
            const id = '60b65a2f6b4b013b0cf92d83';
            const response = await request.put(`/api/master/${id}`, req);
            expect(response.status).toBe(400);
        }, 20000);
        test('Validation - id of city is incorrect', async () => {
            const req = { body: { name: 'Artem', city: '54', rating: 3 } };
            const id = '60b65a2f6b4b013b0cf92d83';
            const response = await request.put(`/api/master/${id}`, req);
            expect(response.status).toBe(400);
        }, 20000);
    });

    describe('Delete', function () {
        test('do not delete master with incorrect ID', async () => {
            const id = 'ghdhjdjdhg';
            const response = await request.delete(`/api/master/${id}`);
            expect(response.status).toBe(500);
        }, 20000);
        test('delete master with correct ID', async () => {
            const id = '60b65a2f6b4b013b0cf92d83';
            const response = await request.delete(`/api/master/${id}`);
            expect(response.status).toBe(200);
        }, 20000);
    });
});
