require("../src/db");
var Product = require("../src/productModel");
var Wharehouse = require("../src/warehouseModel");
var chai = require("chai");
var chaiHttp = require("chai-http");
var fs = require("fs");
var server = require("../server");
var should = chai.should();
chai.use(chaiHttp);

describe("WMS webservice", function() {

    beforeEach(function(done) {
        // limpa a base de dados product
        Product.remove({}, function() {});

        // atualiza a base de dados warehouse
        var query = { name: "Main" },
            options = { upsert: true },
            data = {
                name: "Main",
                address: "Av. Francisco Matarazzo, 1350 - Barra Funda, São Paulo",
                location: {
                    lat: "-23.526287",
                    lng: "-46.675941"
                }
            };
        Wharehouse.update(query, data, options, function() {
            done();
        });
    });

    describe("/GET /product", function() {
        it("it should GET all the products", function(done) {
            chai.request(server)
                .get("/product")
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
    });

    describe("/POST /product", function() {
        it("it should POST a batch between 0..N products", function(done) {
            var product = JSON.parse(fs.readFileSync("test/data.json"));

            chai.request(server)
                .post("/product")
                .send(product)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message").eql("Product(s) successfully added!");
                    done();
                });
        });
    });

}); 