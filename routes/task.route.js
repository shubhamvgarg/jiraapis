import { Router } from 'express';
import { createTask, allTasks, getTask, deleteTask, updateTask } from '../controllers/task.controller.js';

const router = express.Router();

router.get("/", allTasks).get('/task/:id',getTask);
router.post('/create',createTask);
router.delete('/delete/:id',deleteTask);
router.put('/update/:id',updateTask);


export default router;
