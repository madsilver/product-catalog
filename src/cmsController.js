var Cms = require("./cmsModel");

module.exports = {

    getCms: function(req, res) {
        var params = {
            $or: [
                { sku: req.params.sku_category },
                { category: req.params.sku_category }
            ]
        };
        var projection = "content region";
        Cms.find(params, function(err, doc) {
            if(err) res.send(err);
            else res.json(doc);
        }, projection);
    },

    postCms: function(req, res) {
        Cms.create(req.body, function(err, doc) {
            if(err) res.send(err);
            else res.json({message: "CMS successfully added!", product: doc});
        });

    },

    putCms: function(req, res) {
        var query = { _id: req.params.id };
        var options = { upsert: false };
        Cms.update(query, req.body, options, function(err) {
            if(err) res.send(err);
            else res.json({message: "CMS successfully updated!"});
        });
    }

};