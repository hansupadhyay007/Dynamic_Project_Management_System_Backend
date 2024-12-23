import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const Member = mongoose.model('Member', memberSchema);
export default Member;

