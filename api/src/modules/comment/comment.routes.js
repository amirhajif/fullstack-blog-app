import { Router } from "express"
import commentController from "./comment.controller.js"
import { verifyToken } from "../../common/utils/verifyUser.js"

const router = Router()
router.post('/create', verifyToken, commentController.create)
export default router