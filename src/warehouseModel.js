var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WarehouseSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: String,
        lng: String
    }
},{
    versionKey: false
});

module.exports = mongoose.model("Warehouse", WarehouseSchema);