import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Member from '../models/Member.js';

const resolvers = {
  Query: {
    getProjects: async () => await Project.find().populate('team'),
    getTasksByProject: async (_, { projectId }) => {
      const project = await Project.findById(projectId)
        .populate({
          path: 'tasks',
          populate: {
            path: 'assignee',
            model: 'Member',
          },
        });

      // Ensure tasks always have a valid assignee name
      project.tasks.forEach((task) => {
        if (task.assignee && !task.assignee.name) {
          task.assignee.name = "Unknown"; // Provide a default value
        }
      });

      return project.tasks;
    },
  },
  Mutation: {
    addProject: async (_, { name, description }) => {
      const project = new Project({ name, description });
      return await project.save();
    },
    // addTask: async (_, { projectId, title, status }) => {
    //   const task = new Task({ description: title, status });
    //   const savedTask = await task.save();
    //   await Project.findByIdAndUpdate(projectId, { $push: { tasks: savedTask._id } });
    //   return savedTask;
    // },

    addTask: async (_, { projectId, title, description, status, priority, dueDate }) => {
      // Validate required fields
      if (!title || !status) {
        throw new Error('Title and Status are required fields');
      }
    
      // Create a new task with the provided details
      const task = new Task({
        title,
        description,
        status,
        priority,
        dueDate: new Date(dueDate),
      });
    
      // Save the task to the database
      const savedTask = await task.save();
    
      // Add the task to the project's tasks array
      await Project.findByIdAndUpdate(projectId, {
        $push: { tasks: savedTask._id },
      });
    
      return savedTask;
    },

    updateTaskStatus: async (_, { taskId, status }) => {
      return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    },
  },
};

export default resolvers;