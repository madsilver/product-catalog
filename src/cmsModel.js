var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CmsSchema = new Schema({
    sku: { type: String, required: true },
    size: { type: Schema.Types.Mixed, required: true },
    content: { type: String, required: true },
    region: { type: String, required: true }
},{
    versionKey: false
});

module.exports = mongoose.model("Cms", CmsSchema);