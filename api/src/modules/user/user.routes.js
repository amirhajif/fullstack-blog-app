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

export default router