const request = require('supertest');
const express = require('express');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
app.use(express.json());

// Mock route to throw an error
app.get('/error', (req, res, next) => {
  const err = new Error('Test error');
  next(err);
});

app.use(errorHandler);

describe('Error Handler Middleware', () => {
  it('should handle errors', async () => {
    const response = await request(app).get('/error');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Test error');
  });
});
