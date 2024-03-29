import { Router } from "express";
import postController from './post.controller.js'
import { verifyToken } from "../../common/utils/verifyUser.js"
const router = Router()

router.get('/posts', (req, res) => {
    res.status(200).json({
        message: "success"
    })
})

router.post('/create', verifyToken, postController.createPost)
router.get('/getposts', postController.getPosts)

export default router 