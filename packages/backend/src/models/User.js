import mongoose from '../database';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true,},
  password: {type: String, required: true, select: false},
  createdAt: {type: Date, default: Date.now},
});

UserSchema.pre('save',async function(next) {
  if(this.password){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
})

export default mongoose.model('User', UserSchema);