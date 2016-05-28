const test_server = require("supertest").agent("http://app:8080");
const assert = require('assert');

describe("this awesome app",function(){
  it("should return json response",function(done){
  	test_server
      .get("/")
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should have correct key values in response",function(done){
  	test_server
      .get("/")
      .expect(function(res) {
        assert.ok(res.body.servedBy.startsWith('This request is served by '));
        assert.ok(res.body.pageVisits.startsWith('You have viewed this page '));
        assert.ok(res.body.serverTime.match(/^[\d-]+T[\d:\.]+Z$/));
        assert.equal(res.body.message, 'Random message!');
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

