import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const allTasks = async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

export const createTask = async (req, res,next) => {

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    return next(errorHandler(404, error));
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(errorHandler(404, "Task Not Found"));
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(200).json(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(errorHandler(404, "Task Not Found"));
  }
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json("Task Delete Successfully");
  } catch (error) {
    res.status(200).json({
      errorMessage: error.message,
    });
  }
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(errorHandler(404, "Task not found!"));
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};
