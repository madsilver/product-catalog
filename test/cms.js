var chai = require("chai");
var chaiHttp = require("chai-http");
var fs = require("fs");
var server = require("../server");
var should = chai.should();
chai.use(chaiHttp);

describe("CMS webservice", function() {
    
    describe("/POST /cms", function() {
        it("it should POST cms", function(done) {
            var cms = {
                "sku": "SPD-99",
                "size": 5,
                "content": "Content sample",
                "region": "footer"
            };

            chai.request(server)
                .post("/cms")
                .send(cms)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message").eql("CMS successfully added!");
                    done();
                });
        });
    });

    describe("/GET /cms/SPD-99", function() {
        it("it should get 0..n cms", function(done) {
            chai.request(server)
                .get("/stock/SPD-99/34")
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});   