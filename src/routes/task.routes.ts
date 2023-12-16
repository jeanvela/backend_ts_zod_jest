import { Router } from "express";
import { allTasks, oneTaskById, createdTask, deleteTask, updateTask, taskStatus } from '../controllers/task.controller';
import { verifyToken } from "../middlewares/veryfiToken";
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { taskCreateSchema, taskDeleteSchema, taskUpdateSchema, taskStatusSchema } from "../schemas/task.schemas";

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: the auto-generated id of task
 *         name:
 *           type: string
 *           description: the name of the task
 *         description:
 *           type: string
 *           description: the description of the task
 *       required:
 *         - name
 *         - description
 *       example:
 *         id: 66680ssd0cuc8ssc
 *         name: My first task
 *         description: I have to do something
 *     TaskNotFound:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: a message for the not found task
 *       example:
 *         message: Task was not found
 *   parameters:
 *     taskId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: the task id
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks endpoint
 */

/**
 * @swagger
 * /task:
 *  get:
 *    summary: Return a Task list of user
 *    tags: [Tasks]
 *    responses:
 *      200:
 *        description: the list of tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 */

router.get('/task', verifyToken, allTasks)

/**
 * @swagger
 * /task/{id}:
 *  get:
 *    summary: return a one Task
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the task was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      400:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.get('/task/:id', verifyToken, oneTaskById)

/**
 * @swagger
 * /task:
 *  post:
 *    summary: create a new task
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        appilcation/json:
 *          schema:
 *          $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: the task successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      500:
 *        description: some server error
 *        
 */
router.post('/task', verifyToken, schemaValidation(taskCreateSchema), createdTask)

/**
 * @swagger
 * /task/{id}:
 *  delete:
 *    summary: return status code 200 and delete task
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the delete task
 *        content:
 *          application/json:
 *            example:
 *              message: "delete success"
 *      400:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.delete('/task/:id', verifyToken, schemaValidation(taskDeleteSchema), deleteTask)

/**
 * @swagger
 * /task/{id}:
 *  put:
 *    summary: return status code 200 and update task
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: the title of the task
 *              description:
 *                type: string
 *                description: the description of the task
 *              status:
 *                type: boolean
 *                description: the status of the task
 *    responses:
 *      200:
 *        description: the update task
 *        content:
 *          application/json:
 *            example:
 *              message: "update success"
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.put('/task/:id', verifyToken, schemaValidation(taskUpdateSchema), updateTask)

/**
 * @swagger
 * /task/{id}:
 *  patch:
 *    summary: return status code 200 and update status task
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: boolean
 *                description: the status of the task
 *    responses:
 *      200:
 *        description: the update status task
 *        content:
 *          application/json:
 *            example:
 *              message: "update success"
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.patch('/task/:id', verifyToken, schemaValidation(taskStatusSchema), taskStatus)

export default router