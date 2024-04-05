import { Router } from "express"
import commentController from "./comment.controller.js"
import { verifyToken } from "../../common/utils/verifyUser.js"

const router = Router()
router.post('/create', verifyToken, commentController.create)
router.get('/getpostcomments/:postId', commentController.getComment)
router.put('/likecomment/:commentId', verifyToken, commentController.likeComment)
router.put('/editcomment/:commentId', verifyToken, commentController.edit)
router.delete('/deletecomment/:commentId', verifyToken, commentController.delete)
export default router