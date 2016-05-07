'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var orderSourcesCtrlStub = {
  index: 'orderSourcesCtrl.index',
  show: 'orderSourcesCtrl.show',
  create: 'orderSourcesCtrl.create',
  update: 'orderSourcesCtrl.update',
  destroy: 'orderSourcesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var orderSourcesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './order_sources.controller': orderSourcesCtrlStub
});

describe('OrderSources API Router:', function() {

  it('should return an express router instance', function() {
    orderSourcesIndex.should.equal(routerStub);
  });

  describe('GET /api/order_sources', function() {

    it('should route to orderSources.controller.index', function() {
      routerStub.get
        .withArgs('/', 'orderSourcesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/order_sources/:id', function() {

    it('should route to orderSources.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'orderSourcesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/order_sources', function() {

    it('should route to orderSources.controller.create', function() {
      routerStub.post
        .withArgs('/', 'orderSourcesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/order_sources/:id', function() {

    it('should route to orderSources.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'orderSourcesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/order_sources/:id', function() {

    it('should route to orderSources.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'orderSourcesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/order_sources/:id', function() {

    it('should route to orderSources.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'orderSourcesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
