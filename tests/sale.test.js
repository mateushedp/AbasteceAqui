const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Client = require('../models/Client');
const Station = require('../models/Station');
const controller = require('../controllers/saleController');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
let saleId, stationId, clientId;

describe('Client test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONN_TEST2);
    const client = new Client({
      name: 'test name 1',
      email: 'testing1@gmail.com',
      credit: 1000,
    });
    const clientResult = await client.save();

    const station = new Station({
      name: 'Posto Ipiranga',
      cnpj: '1111111111',
    });
    const stationResult = await station.save();
    clientId = clientResult._id;
    stationId = stationResult._id;

    const sale = new Sale({
      client: clientId,
      station: stationId,
      value: 100,
    });

    const saleResult = await sale.save();
    saleId = saleResult._id;
  });

  it('should save a sale', async () => {
    const res = await request.post('/saveSale').send({
      clientId: clientId,
      stationId: stationId,
      value: 150,
    });

    const sale = await Sale.findOne({ _id: res.body._id });
    expect(res.statusCode).toBe(200);
    expect(sale.client).toStrictEqual(clientId);
    expect(sale.value).toBe(150);
  });

  it('should get a sale', async () => {
    const res = await request.get(`/getSale/${saleId}`);
    const sale = res.body;

    expect(res.statusCode).toBe(200);
    expect(sale.value).toBe(100);
  });

  it('should get all sales from a client', async () => {
    const res = await request.get(`/getAllSalesFromClient/${clientId}`);
    const sales = res.body;

    expect(res.statusCode).toBe(200);
    expect(sales.length).toBe(2);
  });

  // it('should subtract credit from a client', async () => {
  //     console.log(controller);

  // });

  afterAll(async () => {
    await Client.deleteMany();
    await Station.deleteMany();
    await Sale.deleteMany();
    mongoose.connection.close();
  });
});
