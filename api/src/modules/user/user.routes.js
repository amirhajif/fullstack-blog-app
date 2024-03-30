import { Router } from "express"

import userController from "./user.controller.js"
import { verifyToken } from "../../common/utils/verifyUser.js"

const router = Router()

router.get("/test", (req, res) => {
    res.json({
        message: "connected"
    })
})
router.put('/update/:userId', verifyToken, userController.update)
router.delete('/delete/:userId', verifyToken, userController.delete)
router.post('/signout', userController.signout)
router.get('/getusers', verifyToken, userController.getUsers)

export default router