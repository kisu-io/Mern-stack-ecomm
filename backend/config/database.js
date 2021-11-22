const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const DB_URI = process.env.DB_URI;
// Connect MongoDB at default port 27017.
const connectDatabase = () => {
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (!err) {
        console.log(`Mongodb connected with server: ${DB_URI}`);
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
};

module.exports = connectDatabase;
