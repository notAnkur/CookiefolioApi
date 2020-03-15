process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');
const conn = require('../../web/db/index');

describe('POST /delivery', function() {
  this.timeout(20000);
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('OK, creating new order', (done) => {
    request(app).post('/delivery')
      .send({"deliveryPersonId": "5e6c38d9d9c7912d0c2d7c49"})
      .then((res) => {
        expect(res.body).to.contain.property('_id');
        expect(res.body).to.contain.property('assignedOrderId');
        expect(res.body).to.contain.property('username');
        expect(res.body).to.contain.property('isAvailable');
        done();
      })
        .catch((err) => done(err));
  })
});