import { Router } from "express";
import { allTasks, oneTaskById, createdTask, deleteTask, updateTask, taskStatus } from '../controllers/task.controller';
import { verifyToken } from "../middlewares/veryfiToken";
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { taskCreateSchema, taskDeleteSchema, taskUpdateSchema, taskStatusSchema } from "../schemas/task.schemas";

const router = Router()

router.get('/task', verifyToken, allTasks)
router.get('/task/:id', verifyToken, oneTaskById)
router.post('/task', verifyToken, schemaValidation(taskCreateSchema), createdTask)
router.delete('/task/:id', verifyToken, schemaValidation(taskDeleteSchema), deleteTask)
router.put('/task/:id', verifyToken, schemaValidation(taskUpdateSchema), updateTask)
router.patch('/task/:id', verifyToken, schemaValidation(taskStatusSchema), taskStatus)

export default router