var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: Schema.Types.Mixed, required: true },
    brand: { type: String, required: true },
    categories: { type: [String], required: true },
    product_image_url: { type: String, required: true },
    special_price: Number
},{ 
    strict: false,
    versionKey: false
});

module.exports = mongoose.model("Product", ProductSchema);