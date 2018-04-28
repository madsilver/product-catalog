var mongoose = require("mongoose");
var dbUri = "mongodb://localhost:27018/dafiti";
mongoose.Promise = global.Promise;
mongoose.connect(dbUri, { useMongoClient: true });


process.on("SIGNIT", function() {
    mongoose.connection.close(function() {
        process.exit();
    });
});