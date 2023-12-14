import { Router } from "express";
import authRoutes from './auth.routes'
import taskRoutes from './task.routes'

const router = Router()

router.use('/api', authRoutes)
router.use('/api', taskRoutes)

export default router