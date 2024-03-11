import express from "express"
import DBconnect from "./src/config/mongoose.config.js"
const app = express()

DBconnect()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})