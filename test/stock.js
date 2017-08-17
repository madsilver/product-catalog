require("../src/db");
var chai = require("chai");
var chaiHttp = require("chai-http");
var fs = require("fs");
var server = require("../server");
var should = chai.should();
chai.use(chaiHttp);

describe("Stock webservice", function() {
    
    describe("/GET /stock/SPD-99/34", function() {
        it("it should get 0..1 stock", function(done) {
            chai.request(server)
                .get("/stock/SPD-99/34")
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});    