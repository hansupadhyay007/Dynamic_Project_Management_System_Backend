import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  team: [{type: mongoose.Schema.Types.ObjectId, ref: 'Member'}]
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
