process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const conn = require('../../../web/db/index');

describe('POST /order', function() {
  this.timeout(10000);
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
    request(app).post('/order')
      .send({"username": "Ankur", "address": "test", "cookieQuantity": 4})
      .then((res) => {
        const body = res.body;
        expect(body.order).to.contain.property('_id');
        done();
      })
        .catch((err) => done(err));
  })
});