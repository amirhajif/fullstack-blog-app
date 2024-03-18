import { Router } from "express"
import authController from "./auth.controller.js"
const router = Router()
router.post("/signup", authController.signup)
router.post("/signin", authController.signin)
router.post("/google", authController.google)

export default router