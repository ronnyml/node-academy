import request from 'supertest';
import express from 'express';
import { register, login } from '../auth.controller';
import { registerUser, loginUser } from '../../services/auth.service';

jest.mock('../../services/auth.service');

const app = express();
app.use(express.json());
app.post('/register', register);
app.post('/login', login);

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a user and return 201 status with user data', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      (registerUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        success: true,
        data: mockUser,
      });
      expect(registerUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/register')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({}); 
      expect(registerUser).not.toHaveBeenCalled();
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({}); 
      expect(registerUser).not.toHaveBeenCalled();
    });

    it('should handle service errors and return 500 status', async () => {
      (registerUser as jest.Mock).mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({}); 
    });
  });

  describe('POST /login', () => {
    it('should login a user and return 200 status with token', async () => {
      const mockResponse = { success: true, token: 'fake-token' };
      (loginUser as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/login')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({}); 
      expect(loginUser).not.toHaveBeenCalled();
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({}); 
      expect(loginUser).not.toHaveBeenCalled();
    });

    it('should handle invalid credentials and return 401 status', async () => {
      (loginUser as jest.Mock).mockResolvedValue({
        success: false,
        message: 'Invalid credentials',
      });

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        success: false,
        message: 'Invalid credentials',
      });
    });

    it('should handle unexpected service errors and return 500 status', async () => {
      (loginUser as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({}); 
    });
  });
});