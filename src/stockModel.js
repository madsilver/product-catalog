var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StockSchema = new Schema({
    sku: { type: String, required: true },
    size: { type: Schema.Types.Mixed, required: true },
    quantity: { type: Number, required: true, default: 0 },
    warehouse: { type: Schema.ObjectId, required: true, ref: "Warehouse" }
},{
    versionKey: false
});

module.exports = mongoose.model("Stock", StockSchema);