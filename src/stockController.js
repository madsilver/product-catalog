var Stock = require("./stockModel");
require("./warehouseModel");

module.exports = {

    getStocks: function(req, res) {
        Stock.find({})
            .populate({
                path: "warehouse",
                model: "Warehouse"
            })
            .exec(function(err, doc) {
                if(err) res.send(err);
                else res.json(doc);
            });
    },

    getStock: function(req, res) {
        var params = {
            sku: req.params.sku,
            size: Number(req.params.size) || req.params.size
        };
        var projection = "quantity wharehouse";
        Stock.findOne(params, function(err, doc) {
            if(err) res.send(err);
            else res.json(doc);
        }, projection);
    },

    putStock: function(req, res) {
        var query = { _id: req.params.id };
        var options = { upsert: true };
        var stock = {
            sku: req.body.sku,
            size: req.body.size,
            $inc: { quantity: req.body.quantity },
            warehouse: req.body.warehouse
        };

        Stock.update(query, stock, options, function(err, doc) {
            if(err) res.send(err);
            else res.json({message: "Stock successfully updated!", res: doc});
        });
    }

};