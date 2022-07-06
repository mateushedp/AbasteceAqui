const mongoose = require('mongoose');
const Station = require('../models/Station');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Station test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONN_TEST);
  });

  it('should save a station', async () => {
    const res = await request.post('/saveStation').send({
      name: 'Posto Ipiranga',
      cnpj: '1111111111',
    });

    const station = await Station.findOne({ name: 'Posto Ipiranga' });

    expect(res.statusCode).toBe(200);
    expect(station.cnpj).toBe('1111111111');
  });

  it('should get all stations', async () => {
    const res = await request.get('/getStations');
    const stations = res.body;

    expect(res.statusCode).toBe(200);
    expect(stations.length).toBe(1);
  });

  afterAll(async () => {
    await Station.deleteMany();
    mongoose.connection.close();
  });
});
