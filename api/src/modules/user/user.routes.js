import { Router } from "express"

import userController from "./user.controller.js"
import { verifyToken } from "../../common/utils/verifyUser.js"

const router = Router()

router.put('/update/:userId', verifyToken, userController.update)
router.delete('/delete/:userId', verifyToken, userController.delete)
router.post('/signout', userController.signout)
router.get('/getusers', verifyToken, userController.getUsers)
router.get('/:userId', userController.getUser)

export default router