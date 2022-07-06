const mongoose = require('mongoose');
const Client = require('../models/Client');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
let clientId;

describe('Client test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONN_TEST);
    const client = new Client({
      name: 'test name 1',
      email: 'testing1@gmail.com',
      credit: 0,
    });
    const result = await client.save();
    clientId = result._id;
  });

  it('should get a client', async () => {
    const res = await request.get(`/getClient/${clientId}`);

    const client = res.body;
    expect(res.statusCode).toBe(200);
    expect(client.name).toBe('test name 1');
  });

  it('should save a client', async () => {
    const res = await request.post('/saveClient').send({
      name: 'test name 2',
      email: 'testing2@gmail.com',
    });

    const client = await Client.findOne({ email: 'testing2@gmail.com' });
    expect(res.statusCode).toBe(200);
    expect(client.name).toBe('test name 2');
    expect(client.email).toBe('testing2@gmail.com');
    expect(client.credit).toBe(0);
  });

  it('should get all clients', async () => {
    const res = await request.get('/getClients');
    const clients = res.body;
    expect(res.statusCode).toBe(200);
    expect(clients.length).toBe(2);
  });

  it('should update a client', async () => {
    const res = await request.put(`/updateClient/${clientId}`).send({
      name: 'test name 1 updated',
    });

    const client = await Client.findOne({ _id: clientId });

    expect(res.statusCode).toBe(200);
    expect(client.name).toBe('test name 1 updated');
    expect(client.email).toBe('testing1@gmail.com');
  });

  it('should add credit to a client', async () => {
    const res = await request.put(`/addCredit/${clientId}`).send({
      credit: 1000,
    });

    const client = await Client.findOne({ _id: clientId });

    expect(res.statusCode).toBe(200);
    expect(client.credit).toBe(1000);
  });

  it('should delete a client', async () => {
    const res = await request.del(`/deleteClient/${clientId}`);

    const client = await Client.findOne({ _id: clientId });

    expect(res.statusCode).toBe(200);
    expect(client).toBe(null);
  });

  afterAll(async () => {
    await Client.deleteMany();
    mongoose.connection.close();
  });
});
