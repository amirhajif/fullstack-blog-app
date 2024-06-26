import express from "express"
import DBconnect from "./src/config/mongoose.config.js"
import userRoutes from "./src/modules/user/user.routes.js"
import authRoutes from "./src/modules/auth/auth.routes.js"
import postRotes from "./src/modules/post/post.routes.js"
import commentRoutes from "./src/modules/comment/comment.routes.js"
import NotFoundHandler from "./src/common/exception/notfound.handler.js"
import AllExceptionHandler from "./src/common/exception/all-exception.handler.js"
import cookieParser from "cookie-parser"

const main = async () => {
    const app = express()
    app.use(express.json())
    app.use(cookieParser())
    DBconnect()
    app.use("/api/user", userRoutes)
    app.use("/api/auth", authRoutes)
    app.use("/api/post", postRotes)
    app.use("/api/comment", commentRoutes)
    NotFoundHandler(app)
    AllExceptionHandler(app)
    app.listen(3000, () => {
        console.log("server is running on port 3000")
    })
}

main()