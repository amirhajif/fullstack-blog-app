import { Router } from "express"
import commentController from "./comment.controller.js"
const router = Router()
router.post('/create', commentController.create)
export default router