import { Router } from "express"
const router = Router()
router.post("/signup", (req, res) => {
    console.log(req.body)
    res.json({
        message: "yes"
    })
})

export default router