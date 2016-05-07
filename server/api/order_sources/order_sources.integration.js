'use strict';

var app = require('../..');
import request from 'supertest';

var newOrderSources;

describe('OrderSources API:', function() {

  describe('GET /api/order_sources', function() {
    var orderSourcess;

    beforeEach(function(done) {
      request(app)
        .get('/api/order_sources')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          orderSourcess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      orderSourcess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/order_sources', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/order_sources')
        .send({
          name: 'New OrderSources',
          info: 'This is the brand new orderSources!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOrderSources = res.body;
          done();
        });
    });

    it('should respond with the newly created orderSources', function() {
      newOrderSources.name.should.equal('New OrderSources');
      newOrderSources.info.should.equal('This is the brand new orderSources!!!');
    });

  });

  describe('GET /api/order_sources/:id', function() {
    var orderSources;

    beforeEach(function(done) {
      request(app)
        .get('/api/order_sources/' + newOrderSources._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          orderSources = res.body;
          done();
        });
    });

    afterEach(function() {
      orderSources = {};
    });

    it('should respond with the requested orderSources', function() {
      orderSources.name.should.equal('New OrderSources');
      orderSources.info.should.equal('This is the brand new orderSources!!!');
    });

  });

  describe('PUT /api/order_sources/:id', function() {
    var updatedOrderSources;

    beforeEach(function(done) {
      request(app)
        .put('/api/order_sources/' + newOrderSources._id)
        .send({
          name: 'Updated OrderSources',
          info: 'This is the updated orderSources!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOrderSources = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrderSources = {};
    });

    it('should respond with the updated orderSources', function() {
      updatedOrderSources.name.should.equal('Updated OrderSources');
      updatedOrderSources.info.should.equal('This is the updated orderSources!!!');
    });

  });

  describe('DELETE /api/order_sources/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/order_sources/' + newOrderSources._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when orderSources does not exist', function(done) {
      request(app)
        .delete('/api/order_sources/' + newOrderSources._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
