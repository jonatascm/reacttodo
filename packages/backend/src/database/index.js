import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`mongodb://${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE_NAME}`, {
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

export default mongoose;