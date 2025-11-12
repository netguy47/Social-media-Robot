import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import authRouter from '../routes/v1/auth.js';
import User from '../models/User.js';

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter);

describe('Auth API', () => {
  beforeEach(() => {
    User.findOne.mockReset();
    User.prototype.save.mockReset();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue(true);

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});
