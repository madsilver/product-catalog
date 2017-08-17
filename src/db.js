var mongoose = require("mongoose");
var dbUri = "mongodb://localhost/dafiti";
mongoose.Promise = global.Promise;
mongoose.connect(dbUri);


process.on("SIGNIT", function() {
    mongoose.connection.close(function() {
        process.exit();
    });
});