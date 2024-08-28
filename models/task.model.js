import mongoose from 'mongoose';
import validator from 'validator';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 500,
    },
    assigned: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email address'],
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'In-Progress', 'Under-review', 'Done'],
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
    },
    startDate: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return  v === /^\d{2}[A-Za-z]{3}\d{4}$/.test(v) || /^\d{1}[A-Za-z]{3}\d{4}$/.test(v); // Matches DDMMMYYYY format
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },
    endDate: {
        type: String,
        validate: {
            validator: function(v) {
                // End date can be empty or must match the DDMMMYYYY format
                return v === '' || /^\d{2}[A-Za-z]{3}\d{4}$/.test(v) || /^\d{1}[A-Za-z]{3}\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
