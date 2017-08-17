require("../src/db");
var chai = require("chai");
var chaiHttp = require("chai-http");
var fs = require("fs");
var server = require("../server");
var should = chai.should();
chai.use(chaiHttp);

describe("FILTER", function() {
    it("it should invalidate image EXTENSION http://cdn.gfg.com.br/spider-suite.bmp", function(done) {
        var product = [{
            product_image_url: "http://cdn.gfg.com.br/spider-suite.bmp"
        }];
        chai.request(server)
            .post("/product")
            .send(product)
            .end(function(err, res) {
                res.body.should.have.property("message").eql("Invalid image extension");
                done();
            });
    });

    it("it should invalidate image URL batmobile.jpg", function(done) {
        var product = [{
            product_image_url: "batmobile.jpg"
        }];
        chai.request(server)
            .post("/product")
            .send(product)
            .end(function(err, res) {
                res.body.should.have.property("message").eql("Invalid image url");
                done();
            });
    });
});