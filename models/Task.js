import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  priority: String,
  dueDate: Date,
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
