const mongoose = require('mongoose');
const Client = require('../models/Client');
const supertest = require('supertest');
const app = require("../app");
const request = supertest(app);

describe('Client test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_CONN_TEST);
    });

    it('should save a client', async () => {
        const res = await request.post("/saveClient").send({
            name: "test",
            email: "testing@gmail.com"
          });

          const client = await Client.findOne({email: "testing@gmail.com"});
          expect(client.name).toBe("test");
          expect(client.email).toBe("testing@gmail.com")
          expect(client.credit).toBe(0);
    })

    it('should get a client', async () => {
        const clientId = '62bc5dcac9b0f0d7149ef4ff';
        const res = await request
        .get(`/getClient/${clientId}`);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
    });
    // it('should test', async () => {
    //     const res = await request(app)
    //     .get('/test');
    //     expect(res.statusCode).toBe(200);
    // })
})