var filter = require("./src/productFilter");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
require("./src/db");

var productCtrl = require("./src/productController");
var stockCtrl = require("./src/stockController");
var cmsCtrl = require("./src/cmsController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json"}));

//wms
app.route("/product")
    .get(productCtrl.getProducts)
    .post(filter.wms, productCtrl.postProducts)
    .put(filter.wms, productCtrl.putProducts);

//stock
app.get("/stock", stockCtrl.getStocks);
app.get("/stock/:sku/:size", stockCtrl.getStock);
app.put("/stock/:sku", stockCtrl.putStock);

//cms
app.get("/cms/:sku_category", cmsCtrl.getCms);
app.post("/cms", cmsCtrl.postCms);
app.put("/cms/:id", cmsCtrl.putCms);

var port = 3000;
app.listen(port);
console.log("server running at port " + port);

module.exports = app;