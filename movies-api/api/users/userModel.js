import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});

UserSchema.methods.comparePassword = async function (passw) { 
    return await bcrypt.compare(passw, this.password); 
};

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});


export default mongoose.model('User', UserSchema);
