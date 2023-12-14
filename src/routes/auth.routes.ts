import { Router } from "express";
import { signIn, signUp, logout, verify } from '../controllers/auth.controller';
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { signinSchema, signupSchema } from "../schemas/auth.schemas";
import { verifyToken } from "../middlewares/veryfiToken";

const router = Router()

router.post('/signin', schemaValidation(signinSchema), signIn)
router.post('/signup', schemaValidation(signupSchema), signUp)
router.post('/logout', logout)
router.get('/verify',verifyToken, verify)

export default router