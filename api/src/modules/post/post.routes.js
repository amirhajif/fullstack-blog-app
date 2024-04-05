import { Router } from "express";
import postController from './post.controller.js'
import { verifyToken } from "../../common/utils/verifyUser.js"
const router = Router()

router.post('/create', verifyToken, postController.createPost)
router.get('/getposts', postController.getPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, postController.delete)
router.put('/updatepost/:postId/:userId', verifyToken, postController.update)

export default router 