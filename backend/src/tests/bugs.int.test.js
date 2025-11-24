const request = require('supertest');
const app = require('../app');

// Manual mock so Jest knows the function names
jest.mock('../models/bugModel', () => ({
  createBug: jest.fn(),
  findAll: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn()
}));

const bugModel = require('../models/bugModel');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Bugs API Integration Tests', () => {

  test('POST /api/bugs creates a bug', async () => {
    const payload = { title: 'Bug1', description: 'desc' };
    const createdBug = { id: '1', ...payload };

    bugModel.createBug.mockResolvedValue(createdBug);

    const res = await request(app).post('/api/bugs').send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(createdBug);
  });

  test('GET /api/bugs returns list', async () => {
    const bugs = [{ id: '1', title: 'Bug1', description: 'desc' }];

    bugModel.findAll.mockResolvedValue(bugs);

    const res = await request(app).get('/api/bugs');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(bugs);
  });

  test('PATCH /api/bugs/:id updates a bug', async () => {
    const updated = { id: '1', title: 'Updated', description: 'desc' };

    bugModel.updateById.mockResolvedValue(updated);

    const res = await request(app)
      .patch('/api/bugs/1')
      .send({ title: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(updated);
  });

  test('DELETE /api/bugs/:id deletes a bug', async () => {
    bugModel.deleteById.mockResolvedValue(true);

    const res = await request(app).delete('/api/bugs/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });
});


