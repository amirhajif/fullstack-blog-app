import express from "express"
import DBconnect from "./src/config/mongoose.config.js"
import userRoutes from "./src/modules/user/user.routes.js"
import authRoutes from "./src/modules/auth/auth.routes.js"
import NotFoundHandler from "./src/common/exception/notfound.handler.js"
import AllExceptionHandler from "./src/common/exception/all-exception.handler.js"
const app = express()
app.use(express.json())
DBconnect()

NotFoundHandler(app)
AllExceptionHandler(app)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
