const mongoose = require('mongoose');
const Attendant = require('../models/Attendant');
const Station = require('../models/Station');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
let stationId;
let attendantId;

describe('Attendant test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONN_TEST3);
    const station = new Station({
      name: 'Posto 1',
    });
    const result = await station.save();
    stationId = result._id;
  });

  it('should save an attendant', async () => {
    const res = await request.post('/saveAttendant').send({
      name: 'Frentista 1',
      station: stationId,
    });

    attendantId = res._body._id;

    const attendant = await Attendant.findById({ _id: attendantId });
    expect(res.statusCode).toBe(200);
    expect(attendant.name).toBe('Frentista 1');
  });

  it('should get an attendant', async () => {
    const res = await request.get(`/getAttendant/${attendantId}`);
    const attendant = res._body;

    expect(res.statusCode).toBe(200);
    expect(attendant.name).toBe('Frentista 1');
  });

  afterAll(async () => {
    await Attendant.deleteMany();
    await Station.deleteMany();
    mongoose.connection.close();
  });
});
