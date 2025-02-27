import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        priority: {
            type: String,
            enum: ['Low', 'High'],
            required: [true, 'Task priority is required'],
        },
        status: {
            type: String,
            enum: ['To Do', 'On Progress', 'Done'],
            default: 'To Do',
        },
        deadline: {
            type: Date,
            validate: {
                validator: (date) => date > new Date(),
                message: 'Deadline must be a future date',
            },
        },
    },
    { collection: 'taskManager', timestamps: true }
);

taskSchema.pre('save', function (next) {
    if (!this.title || !this.priority) {
        return next(new Error('Title and priority are required fields.'));
    }
    next();
});



export const Task = mongoose.model('Task', taskSchema);
