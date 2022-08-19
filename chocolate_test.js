const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const { expect } = chai;

const Chocolate = require('../db');

const server = require('../index');

describe('CRUD Testing', () => {
  let id;

  beforeEach(async () => {
    try {
      await Chocolate.deleteMany({});
      const testChoclate = await Chocolate.create({
        name: 'Snickers',
        amount: 5,
        cost: 3.20,
      });
      id = testChocolate._id;
    } catch (err) {
      console.error(err);
    }
  });

  it('should create a chocolate', (done) => {
    const newChocolate = {
      name: 'Galaxy',
      amount: 8,
      cost: 4.50,
    };
    chai.request(server).post('/createChocolate').send(newChocolate).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(201);
      expect(res.body).to.include(newChocolate);
      expect(res.body._id).to.not.be.null;

      return done();
    });
  });

  it('should update the chocolate', (done) => {
    chai.request(server).patch(`/updateChocolate/${id}`).query({ name: 'Twix' }).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        _id: id.toString(),
        name: 'Snickers',
        amount: 5,
        cost: 3.20,
      });

      return done();
    });
  });

  it('should get all the choclates', (done) => {
    chai.request(server).get('/getAllChocolates').end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body._id).to.not.be.null;
      return done();
    });
  });
  it('should delete a Chocolate', (done) => {
    chai.request(server).delete(`/removeChocolate/${id}`).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(204);
      expect(res.body._id).to.not.be.null;
      return done();
    });
  });
});
