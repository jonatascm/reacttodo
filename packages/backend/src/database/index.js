const mongoose = require('mongoose');
const dbConfig = require('../config/database');


mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(
  () => {
    console.log("Mongoose connection established!");
  },
  err => {
    console.log("Error: Mongoose connecting Database instance due to: ", err);
  } 
);

mongoose.Promise = global.Promise;

module.exports = mongoose;