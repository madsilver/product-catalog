var Product = require("./productModel");
var async = require("async");

module.exports = {

    getProducts: function(req, res) {
        Product.find({}, function(err, doc) {
            if(err) res.send(err);
            else res.json(doc);
        });
    },

    postProducts: function(req, res) {
        var products = [];
        req.body.forEach(function(product) {
            products.push(new Product(product));
        });

        Product.create(products, function(err, doc) {
            if(err) res.send(err);
            else res.json({message: "Product(s) successfully added!", product: doc});
        });

    },

    putProducts: function(req, res) {
        async.eachSeries(req.body, function updateObject (product, done) {
            var query = {sku: product.sku};
            var options = { upsert: true };
            Product.update(query, product, options, done);
        }, function allDone (err) {
            if(err) res.send(err);
            else res.json({message: "Product(s) successfully updated!"});
        });
    }

};