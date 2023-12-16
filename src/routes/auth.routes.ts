import { Router } from "express";
import { signIn, signUp, logout, verify } from '../controllers/auth.controller';
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { signinSchema, signupSchema } from "../schemas/auth.schemas";
import { verifyToken } from "../middlewares/veryfiToken";

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth endpoint
 */

/**
 * @swagger
 * /signin:
 *  post:
 *    summary: return user info with username, email, token and _id
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: the email of the user
 *              password:
 *                type: string
 *                description: the password of the user
 *    responses:
 *      200:
 *        description: login user success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: the _id of the user
 *                username:
 *                  type: string
 *                  description: the usernema of the user
 *                email:
 *                  type: string
 *                  description: the email of the user
 *                token:
 *                  type: string
 *                  description: the token of the user
 *      401:
 *        description: Invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              message: "Invalid credentials"
 */
router.post('/signin', schemaValidation(signinSchema), signIn)

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: return new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: the username of the user
 *              email:
 *                type: string
 *                description: the email of the user
 *              password:
 *                type: string
 *                description: the password of the user
 *    responses:
 *      200:
 *        description: created user success
 *        content:
 *          application/json:
 *            example:
 *              message: "User created"
 *      401:
 *        description: user not create
 *        content:
 *          application/json:
 *            example:
 *              message: "user not created"
 *              
 */
router.post('/signup', schemaValidation(signupSchema), signUp)
router.post('/logout', logout)
router.get('/verify',verifyToken, verify)

export default router